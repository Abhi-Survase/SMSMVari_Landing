// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-muted/40 p-4">
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-4">
        Could not find the requested resource.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-accent transition"
      >
        Return Home
      </Link>
    </div>
  );
}
