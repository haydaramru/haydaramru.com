# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install              # Install dependencies
bun --bun run dev        # Dev server on port 3000
bun --bun run build      # Production build
bun --bun run preview    # Preview production build
bun --bun run test       # Run tests (vitest)
```

## Architecture

This is a personal website built with **TanStack Start** (full-stack React framework) using **Bun** as the runtime.

- **Framework**: TanStack Start with TanStack Router (file-based routing)
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest with React Testing Library
- **Icons**: lucide-react

### Key Files

- `src/router.tsx` — Router configuration (scroll restoration, intent-based preloading)
- `src/routes/__root.tsx` — Root layout (HTML shell, head content, devtools)
- `src/routes/` — File-based routes; adding a file here auto-generates a route
- `src/styles.css` — Global styles (Tailwind entry point)
- `src/routeTree.gen.ts` — Auto-generated route tree (do not edit manually)

### Path Aliases

- `@/*` maps to `./src/*` (tsconfig paths)
- `#/*` maps to `./src/*` (package.json imports)

### TypeScript

Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, and `verbatimModuleSyntax`.
