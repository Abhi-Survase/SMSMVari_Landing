package com.smsvari.in.services.impl;

import com.smsvari.in.services.ImageProcessingService;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * Converts any supported image format to WebP on upload.
 *
 * <p>Encoding/decoding of WebP is delegated to the {@code cwebp} / {@code dwebp}
 * command-line tools from Google's libwebp, invoked via {@link ProcessBuilder}.
 * This avoids the native-binding (JNI) architecture problems of the old
 * {@code webp-imageio} library — {@code cwebp}/{@code dwebp} are plain OS binaries
 * available via package managers on macOS (incl. Apple Silicon), Linux, and Windows,
 * so this works unchanged across every platform the app runs on.
 *
 * <p>Requires libwebp tools to be installed and reachable:
 * <ul>
 *   <li>macOS:  {@code brew install webp}</li>
 *   <li>Debian/Ubuntu: {@code sudo apt-get install webp}</li>
 *   <li>Fedora/RHEL: {@code sudo dnf install libwebp-tools}</li>
 *   <li>Windows: download from https://developers.google.com/speed/webp/download
 *       and put cwebp.exe / dwebp.exe on PATH (or set the path properties below)</li>
 * </ul>
 *
 * <p>Constraints (all configurable via application.properties):
 * <ul>
 *   <li>Max upload file size   : 15 MB  (raw input)</li>
 *   <li>Min output dimensions  : 100 × 100 px</li>
 *   <li>Max output dimensions  : 3840 × 2160 px (4K)</li>
 *   <li>Thumbnail size         : 400 × 300 px (cover-crop)</li>
 *   <li>WebP quality           : 85 (main) / 70 (thumbnail)</li>
 * </ul>
 */
@Service
@Slf4j
public class ImageProcessingServiceImpl implements ImageProcessingService {

    // ── accepted MIME types ──────────────────────────────────────────────────
    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg", "image/jpg", "image/png",
            "image/gif", "image/bmp", "image/tiff",
            "image/webp", "image/svg+xml"
    );

    // ── size limits ──────────────────────────────────────────────────────────
    @Value("${gallery.upload.max-file-size-bytes:15728640}")   // 15 MB
    private long maxFileSizeBytes;

    @Value("${gallery.image.min-width:100}")
    private int minWidth;

    @Value("${gallery.image.min-height:100}")
    private int minHeight;

    @Value("${gallery.image.max-width:3840}")
    private int maxWidth;

    @Value("${gallery.image.max-height:2160}")
    private int maxHeight;

    @Value("${gallery.image.webp-quality:0.85}")
    private float webpQuality;

    @Value("${gallery.image.thumbnail-width:400}")
    private int thumbnailWidth;

    @Value("${gallery.image.thumbnail-height:300}")
    private int thumbnailHeight;

    @Value("${gallery.image.thumbnail-webp-quality:0.70}")
    private float thumbnailWebpQuality;

    @Value("${gallery.storage.base-path:/var/smsvari/gallery}")
    private String storagePath;

    @Value("${gallery.storage.base-url:http://localhost:8080/gallery}")
    private String baseUrl;

    // ── libwebp CLI tools ────────────────────────────────────────────────────
    @Value("${gallery.webp.cwebp-path:cwebp}")
    private String cwebpPath;

    @Value("${gallery.webp.dwebp-path:dwebp}")
    private String dwebpPath;

    @Value("${gallery.webp.timeout-seconds:30}")
    private int webpTimeoutSeconds;

    // ────────────────────────────────────────────────────────────────────────

    /**
     * Validate, resize, and convert the uploaded file to WebP.
     *
     * @param file the raw multipart upload
     * @return metadata for the saved images
     */
    @Override
    public ProcessedImage process(MultipartFile file) throws IOException {

        // 1. MIME validation
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException(
                    "Unsupported image type: " + contentType +
                            ". Allowed: JPEG, PNG, GIF, BMP, TIFF, WebP, SVG");
        }

        // 2. Raw size validation
        if (file.getSize() > maxFileSizeBytes) {
            throw new IllegalArgumentException(
                    "File size " + (file.getSize() / 1024 / 1024) + " MB exceeds the " +
                            (maxFileSizeBytes / 1024 / 1024) + " MB limit.");
        }

        // 3. Decode into BufferedImage.
        //    WebP input needs dwebp first (Java's ImageIO has no built-in WebP reader).
        //    Everything else (JPEG/PNG/GIF/BMP/TIFF) decodes natively via ImageIO.
        BufferedImage srcImage = "image/webp".equalsIgnoreCase(contentType)
                ? decodeWebp(file.getBytes())
                : ImageIO.read(new ByteArrayInputStream(file.getBytes()));

        if (srcImage == null) {
            throw new IllegalArgumentException("Cannot decode image. The file may be corrupt.");
        }

        int srcW = srcImage.getWidth();
        int srcH = srcImage.getHeight();

        // 4. Dimension validation
        if (srcW < minWidth || srcH < minHeight) {
            throw new IllegalArgumentException(
                    "Image too small: " + srcW + "×" + srcH +
                            ". Minimum is " + minWidth + "×" + minHeight + " px.");
        }

        // 5. Prepare storage directories
        Path imagesDir    = Paths.get(storagePath, "images");
        Path thumbsDir    = Paths.get(storagePath, "thumbnails");
        Files.createDirectories(imagesDir);
        Files.createDirectories(thumbsDir);

        // 6. Generate unique filenames
        String baseName          = UUID.randomUUID().toString();
        String mainFileName      = baseName + ".webp";
        String thumbFileName     = baseName + "_thumb.webp";
        Path   mainPath          = imagesDir.resolve(mainFileName);
        Path   thumbPath         = thumbsDir.resolve(thumbFileName);

        // 7. Resize main image (scale down only; never upscale)
        BufferedImage resized = scaleDown(srcImage, maxWidth, maxHeight);

        // 8. Write main WebP
        writeWebP(resized, mainPath.toFile(), webpQuality);
        long savedSize = Files.size(mainPath);

        // 9. Write thumbnail WebP (cover-crop)
        BufferedImage thumbnail = makeThumbnail(srcImage, thumbnailWidth, thumbnailHeight);
        writeWebP(thumbnail, thumbPath.toFile(), thumbnailWebpQuality);

        log.info("Processed image: {} ({}×{}, {} bytes)",
                mainFileName, resized.getWidth(), resized.getHeight(), savedSize);

        return new ProcessedImage(
                mainFileName,
                thumbFileName,
                baseUrl + "/images/" + mainFileName,
                baseUrl + "/thumbnails/" + thumbFileName,
                savedSize,
                resized.getWidth(),
                resized.getHeight(),
                contentType
        );
    }

    /**
     * Delete both the main image and its thumbnail from disk.
     */
    @Override
    public void delete(String storedFileName, String thumbnailFileName) {
        tryDelete(Paths.get(storagePath, "images", storedFileName));
        if (thumbnailFileName != null) {
            tryDelete(Paths.get(storagePath, "thumbnails", thumbnailFileName));
        }
    }

    // ── private helpers ──────────────────────────────────────────────────────

    /**
     * Scale an image DOWN to fit within maxW × maxH while preserving aspect ratio.
     * If the image is already within bounds, it is returned unchanged.
     */
    private BufferedImage scaleDown(BufferedImage src, int maxW, int maxH) throws IOException {
        int w = src.getWidth();
        int h = src.getHeight();
        if (w <= maxW && h <= maxH) return src;

        return Thumbnails.of(src)
                .size(maxW, maxH)
                .keepAspectRatio(true)
                .asBufferedImage();
    }

    /**
     * Create a fixed-size thumbnail by cover-cropping (centre-positioned).
     */
    private BufferedImage makeThumbnail(BufferedImage src, int w, int h) throws IOException {
        return Thumbnails.of(src)
                .size(w, h)
                .crop(Positions.CENTER)
                .asBufferedImage();
    }

    /**
     * Write a BufferedImage as WebP by first dumping it to a temp PNG (lossless,
     * pure-Java via ImageIO — no native deps), then invoking {@code cwebp} to
     * produce the final .webp file.
     */
    private void writeWebP(BufferedImage image, File output, float quality) throws IOException {
        Path tempPng = Files.createTempFile("gallery-src-", ".png");
        try {
            ImageIO.write(image, "png", tempPng.toFile());
            int qualityPercent = Math.round(quality * 100);
            runCwebp(tempPng.toFile(), output, qualityPercent);
        } finally {
            Files.deleteIfExists(tempPng);
        }
    }

    /**
     * Decode a WebP upload by invoking {@code dwebp} to convert it to a temp PNG,
     * then reading that PNG with standard ImageIO.
     */
    private BufferedImage decodeWebp(byte[] bytes) throws IOException {
        Path tempWebp = Files.createTempFile("gallery-in-", ".webp");
        Path tempPng  = Files.createTempFile("gallery-in-", ".png");
        try {
            Files.write(tempWebp, bytes);
            runDwebp(tempWebp.toFile(), tempPng.toFile());
            return ImageIO.read(tempPng.toFile());
        } finally {
            Files.deleteIfExists(tempWebp);
            Files.deleteIfExists(tempPng);
        }
    }

    private void runCwebp(File input, File output, int qualityPercent) throws IOException {
        runProcess(
                List.of(cwebpPath, "-quiet", "-q", String.valueOf(qualityPercent),
                        input.getAbsolutePath(), "-o", output.getAbsolutePath()),
                cwebpPath
        );
    }

    private void runDwebp(File input, File output) throws IOException {
        runProcess(
                List.of(dwebpPath, input.getAbsolutePath(), "-o", output.getAbsolutePath()),
                dwebpPath
        );
    }

    private void runProcess(List<String> command, String toolPath) throws IOException {
        Process process;
        try {
            process = new ProcessBuilder(command).redirectErrorStream(true).start();
        } catch (IOException e) {
            throw new IOException(
                    "Could not start '" + toolPath + "'. Make sure libwebp is installed and on PATH " +
                            "(macOS: brew install webp · Debian/Ubuntu: apt install webp · " +
                            "Fedora/RHEL: dnf install libwebp-tools · Windows: see " +
                            "https://developers.google.com/speed/webp/download). " +
                            "Configured path: '" + toolPath + "'.", e);
        }

        String log = readAll(process.getInputStream());
        int exitCode;
        try {
            if (!process.waitFor(webpTimeoutSeconds, TimeUnit.SECONDS)) {
                process.destroyForcibly();
                throw new IOException(toolPath + " timed out after " + webpTimeoutSeconds + "s.");
            }
            exitCode = process.exitValue();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("Interrupted while waiting for " + toolPath, e);
        }

        if (exitCode != 0) {
            throw new IOException(toolPath + " failed (exit " + exitCode + "): " + log);
        }
    }

    private String readAll(InputStream in) throws IOException {
        return new String(in.readAllBytes());
    }

    private void tryDelete(Path path) {
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            log.warn("Could not delete file {}: {}", path, e.getMessage());
        }
    }
}