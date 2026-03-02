# haydaramru.com

My personal corner of the internet, where I share what I'm building, breaking, and learning along the way.

**🔗 [haydaramru.com](https://haydaramru.com)**

## About

This is a server-rendered personal website built from scratch. It has a blog, a project showcase, and whatever else I feel like adding. Dark mode, smooth animations, and minimal by design.

## Tech Stack

- **[TanStack Start](https://tanstack.com/start)** — full-stack React framework with file-based routing
- **[Bun](https://bun.sh)** — runtime, bundler, and package manager
- **[Tailwind CSS v4](https://tailwindcss.com)** — styling
- **[Motion](https://motion.dev)** — animations
- **[Radix UI](https://www.radix-ui.com)** — accessible primitives

## Getting Started

```bash
bun install
bun run dev
```

## Deploy

Dockerized with Nginx inside the container. Push to `main` and GitHub Actions takes care of the rest.

```
push to main → build Docker image → push to Docker Hub → deploy to VPS
```

## License

This is my personal site. Feel free to look around the code for inspiration, but please don't copy it wholesale and claim it as your own✌️
