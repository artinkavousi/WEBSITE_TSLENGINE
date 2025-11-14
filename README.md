# WEBSITE TSL Engine Workspace

This repository hosts the implementation workspace for the TSL Kit WebGPU engine-first website initiative. It now includes a pnpm-based monorepo skeleton with:

- `packages/tsl-kit` — the nascent engine package exposing a placeholder renderer lifecycle.
- `apps/web` — a Next.js application that keeps a persistent canvas shell wired to the engine stub.

## Getting Started

1. Install dependencies with `pnpm install`.
2. Run the development servers with `pnpm dev` to start all apps via Turborepo.
3. Build artefacts using `pnpm build`.

The initial scene renders a placeholder Three.js loop with a glassmorphic overlay so that module work can begin in subsequent phases.
