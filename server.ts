import { join } from "path";

const distDir = join(import.meta.dir, "dist", "client");

const server = await import("./dist/server/server.js");
const handler = server.default;

Bun.serve({
  port: Number(process.env.PORT) || 3000,
  async fetch(request: Request) {
    const url = new URL(request.url);

    // Serve static files from dist/client/
    const filePath = join(distDir, url.pathname);
    const file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }

    // Fall through to SSR handler
    return handler.fetch(request);
  },
});

console.log(
  `Server running at http://localhost:${Number(process.env.PORT) || 3000}`
);
