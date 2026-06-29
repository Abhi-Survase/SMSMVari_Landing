package com.smsvari.in.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Value("${gallery.storage.base-path:/var/smsvari/gallery}")
    private String storagePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve everything under {storagePath}/images and {storagePath}/thumbnails
        // at the URL prefix /gallery/**, matching the URLs built in
        // ImageProcessingServiceImpl (baseUrl + "/images/..." etc.)
        String location = "file:" + storagePath.replaceAll("/$", "") + "/";

        registry.addResourceHandler("/gallery/**")
                .addResourceLocations(location)
                .setCachePeriod(3600); // 1hr browser cache; tune as you like
    }
}