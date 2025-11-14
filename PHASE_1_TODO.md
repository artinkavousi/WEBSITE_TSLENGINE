# Phase 1: Foundation & Research — Detailed TODO

**Duration**: 2-3 weeks  
**Status**: Ready to Start  
**Goal**: Complete project setup, research, learning, and all preparatory work

---

## 📋 Overview

Phase 1 focuses on:
- Setting up the complete monorepo infrastructure
- Deep research into Three.js r181, WebGPU, and TSL
- Analyzing all source repositories
- Installing and configuring all dependencies
- Creating comprehensive documentation
- Setting up development environment and CI/CD foundation

**Exit Criteria**:
- ✅ Monorepo structure complete and building
- ✅ All dependencies installed and verified
- ✅ Research documentation complete (PORT_MAPPING.md, RESOURCE_INVENTORY.md)
- ✅ Development environment configured
- ✅ CI/CD foundation ready
- ✅ Team understands architecture and patterns

---

## 🏗️ Section 1: Project Structure Setup

### 1.1 Initialize Monorepo

- [ ] **Create root directory structure**
  ```bash
  mkdir -p packages/tsl-kit/src/{core,rendering,modules,utils}
  mkdir -p apps/web/{app,components,lib,public,content,templates,LABS}
  mkdir -p RESEARCH
  ```

- [ ] **Initialize pnpm workspace**
  - [ ] Create `pnpm-workspace.yaml`
    ```yaml
    packages:
      - 'packages/*'
      - 'apps/*'
    ```
  - [ ] Create root `package.json` with workspace config
  - [ ] Set up pnpm version (v9.15+)

- [ ] **Configure Turborepo**
  - [ ] Create `turbo.json` with pipeline config
  - [ ] Define build, dev, lint, test scripts
  - [ ] Set up caching strategy
  - [ ] Configure remote caching (optional)

### 1.2 Engine Package Setup (packages/tsl-kit)

- [ ] **Initialize package**
  ```bash
  cd packages/tsl-kit
  pnpm init
  ```

- [ ] **Create package.json**
  ```json
  {
    "name": "@tsl-kit/engine",
    "version": "0.1.0",
    "type": "module",
    "main": "./dist/index.js",
    "types": "./dist/index.d.ts",
    "exports": {
      ".": "./dist/index.js",
      "./core": "./dist/core/index.js",
      "./modules": "./dist/modules/index.js",
      "./utils": "./dist/utils/index.js"
    },
    "scripts": {
      "build": "tsc",
      "dev": "tsc --watch",
      "test": "vitest",
      "typecheck": "tsc --noEmit"
    }
  }
  ```

- [ ] **Configure TypeScript**
  - [ ] Create `tsconfig.json`
    ```json
    {
      "compilerOptions": {
        "target": "ES2022",
        "module": "ES2022",
        "lib": ["ES2022", "DOM"],
        "moduleResolution": "bundler",
        "strict": true,
        "declaration": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "skipLibCheck": true,
        "esModuleInterop": true,
        "resolveJsonModule": true
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "dist"]
    }
    ```
  - [ ] Verify strict mode settings
  - [ ] Add path aliases if needed

- [ ] **Create initial directory structure**
  ```
  src/
    core/
      types.ts          # Core interfaces
      registry.ts       # Module registry (stub)
      runner.ts         # Module runner (stub)
      context.ts        # Module context (stub)
      index.ts          # Exports
    rendering/
      factory.ts        # Renderer factory (stub)
      index.ts
    modules/
      index.ts          # Empty for now
    utils/
      index.ts          # Empty for now
    index.ts            # Main entry point
  ```

- [ ] **Create stub files with TODO comments**

### 1.3 Website Package Setup (apps/web)

- [ ] **Initialize Next.js 15 app**
  ```bash
  cd apps/web
  pnpm create next-app@latest . --typescript --tailwind --app --no-src-dir
  ```

- [ ] **Configure Next.js**
  - [ ] Edit `next.config.js`
    ```js
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
      webpack: (config) => {
        config.externals.push({
          'utf-8-validate': 'commonjs utf-8-validate',
          'bufferutil': 'commonjs bufferutil',
        })
        return config
      },
    }
    export default nextConfig
    ```
  - [ ] Set up environment variables template (`.env.local.example`)
  - [ ] Add `.env.local` to `.gitignore`

- [ ] **Create directory structure**
  ```bash
  mkdir -p app/{admin,blog,labs,portfolio}
  mkdir -p components/{webgpu,ui,admin}
  mkdir -p lib/{ai,agents,admin,store}
  mkdir -p content/{posts,projects}
  mkdir -p templates
  mkdir -p LABS/{materials,lighting,postfx,particles,fields,physics}
  mkdir -p public/{models,textures,og}
  ```

- [ ] **Configure TypeScript**
  - [ ] Edit `tsconfig.json`
    ```json
    {
      "compilerOptions": {
        "target": "ES2022",
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "plugins": [{ "name": "next" }],
        "paths": {
          "@/*": ["./*"],
          "@tsl-kit/*": ["../../packages/tsl-kit/src/*"]
        }
      },
      "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      "exclude": ["node_modules"]
    }
    ```

### 1.4 Git & Version Control

- [ ] **Initialize Git (if not already)**
  ```bash
  git init
  git branch -M main
  ```

- [ ] **Create comprehensive .gitignore**
  ```
  # Dependencies
  node_modules/
  .pnp/
  
  # Build outputs
  dist/
  .next/
  out/
  build/
  
  # Environment
  .env.local
  .env.*.local
  
  # IDE
  .vscode/
  .idea/
  *.swp
  *.swo
  
  # OS
  .DS_Store
  Thumbs.db
  
  # Testing
  coverage/
  .nyc_output/
  
  # Logs
  *.log
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*
  pnpm-debug.log*
  
  # Misc
  .turbo/
  .contentlayer/
  ```

- [ ] **Set up Git LFS for large assets**
  ```bash
  git lfs install
  ```
  - [ ] Create `.gitattributes`
    ```
    *.glb filter=lfs diff=lfs merge=lfs -text
    *.gltf filter=lfs diff=lfs merge=lfs -text
    *.hdr filter=lfs diff=lfs merge=lfs -text
    *.exr filter=lfs diff=lfs merge=lfs -text
    *.ktx2 filter=lfs diff=lfs merge=lfs -text
    *.png filter=lfs diff=lfs merge=lfs -text
    *.jpg filter=lfs diff=lfs merge=lfs -text
    *.mp4 filter=lfs diff=lfs merge=lfs -text
    ```

- [ ] **Create initial commit**
  ```bash
  git add .
  git commit -m "chore: initialize monorepo structure"
  ```

---

## 🔬 Section 2: Research & Learning

### 2.1 Three.js r181 Deep Dive

- [ ] **Study official Three.js r181 documentation**
  - [ ] Read WebGPU migration guide
  - [ ] Study TSL (Three Shading Language) basics
  - [ ] Review WebGPURenderer API
  - [ ] Understand async initialization pattern
  - [ ] Study compute shader examples

- [ ] **Analyze Three.js r181 examples**
  - [ ] Navigate to `RESOURCES/three.js-r181/examples/`
  - [ ] Catalog WebGPU examples (`webgpu_*`)
  - [ ] Study TSL node examples (`webgpu_tsl_*`)
  - [ ] Document compute examples (`webgpu_compute_*`)
  - [ ] Review post-processing examples

- [ ] **WebGPU vs WebGL differences**
  - [ ] Document async renderer.init() requirement
  - [ ] Study pipeline state management
  - [ ] Understand compute shader capabilities
  - [ ] Review storage buffer usage
  - [ ] Document fallback patterns

- [ ] **TSL Node System**
  - [ ] Study node types (uniform, varying, const, fn)
  - [ ] Learn BRDF functions (BSDF nodes)
  - [ ] Understand material node composition
  - [ ] Review compute node patterns
  - [ ] Document shader graph caching

- [ ] **Create RESEARCH/threejs-r181-notes.md**
  - Document key findings
  - Add code examples
  - List gotchas and best practices
  - Create reference for team

### 2.2 Source Repository Analysis

#### Portfolio Examples (Maxime Heckel)

- [ ] **Navigate to repository**
  ```bash
  cd RESOURCES/REPOSITORIES/portfolio\ examples/portfolio-main/
  ```

- [ ] **Catalog materials**
  - [ ] `src/utils/webgpu/materials/` — List all materials
  - [ ] Document clearcoat implementation
  - [ ] Document sheen implementation
  - [ ] Document anisotropy implementation
  - [ ] Document iridescence implementation
  - [ ] Document transmission implementation

- [ ] **Catalog noise functions**
  - [ ] `src/utils/webgpu/nodes/noise/` — List all noise types
  - [ ] Document Simplex noise (2D, 3D, 4D)
  - [ ] Document Curl noise
  - [ ] Document Voronoi/Worley
  - [ ] Document Classic Perlin
  - [ ] Document FBM compositor

- [ ] **Catalog lighting**
  - [ ] `src/utils/webgpu/lighting/` — List light implementations
  - [ ] Document diffuse lighting
  - [ ] Document ambient occlusion
  - [ ] Document Fresnel effects
  - [ ] Document hemisphere lighting

- [ ] **Catalog particles**
  - [ ] `src/components/MDX/Experiments/` — Find particle systems
  - [ ] Document GPGPU particle pattern
  - [ ] Document morphing particles
  - [ ] Document flow field integration
  - [ ] Document collision handling

- [ ] **Catalog post-FX**
  - [ ] Find TAA implementation
  - [ ] Find bloom implementation
  - [ ] Find vignette implementation
  - [ ] Find chromatic aberration
  - [ ] Document post-processing pipeline pattern

- [ ] **Create RESEARCH/portfolio-inventory.md**

#### Fragments Boilerplate

- [ ] **Navigate to repository**
  ```bash
  cd RESOURCES/REPOSITORIES/portfolio\ examples/fragments-boilerplate-main/
  ```

- [ ] **Study project structure**
  - [ ] Analyze directory layout
  - [ ] Study R3F + WebGPU integration
  - [ ] Review async initialization pattern
  - [ ] Study framegraph architecture
  - [ ] Document best practices

- [ ] **Extract bootstrap pattern**
  - [ ] Document Canvas setup
  - [ ] Document renderer factory
  - [ ] Document scene management
  - [ ] Document effect composer setup

- [ ] **Create RESEARCH/fragments-bootstrap-pattern.md**

#### TSL WebGPU Examples

- [ ] **Catalog all projects**
  - [ ] `breeze-main` — 2D fluid simulation
  - [ ] `flow-master` — Flow fields + particles
  - [ ] `Floaty-main` — WASM + WebGPU fluid
  - [ ] `fluidglass-main` — Glass refraction + distortion
  - [ ] `raymarching-tsl-main` — SDF raymarching
  - [ ] `softbodies-master` — Softbody physics
  - [ ] `Splash-main` — Water simulation
  - [ ] `tsl-compute-particles` — Pure compute particles
  - [ ] `three.js-tsl-particles-system-master` — Particle system
  - [ ] `WaterBall-main` — Metaball fluids

- [ ] **For each project**:
  - [ ] Identify main implementation files
  - [ ] Document key techniques
  - [ ] Extract reusable patterns
  - [ ] Note dependencies
  - [ ] Test locally (if possible)

- [ ] **Create RESEARCH/tsl-examples-inventory.md**

#### Three.js r181 Official Examples

- [ ] **Catalog WebGPU examples**
  - [ ] `examples/webgpu_*.html` — List all WebGPU examples
  - [ ] Focus on compute examples
  - [ ] Focus on TSL material examples
  - [ ] Focus on post-processing examples

- [ ] **Extract canonical patterns**
  - [ ] Renderer initialization
  - [ ] Material setup
  - [ ] Compute shader setup
  - [ ] Post-processing chain
  - [ ] Texture loading

- [ ] **Create RESEARCH/official-examples-patterns.md**

### 2.3 Port Mapping

- [ ] **Create PORT_MAPPING.md**
  - Structure: `Source File → Target Module → Priority`
  - [ ] Map all materials (30+)
  - [ ] Map all noise functions (10+)
  - [ ] Map all lighting (12+)
  - [ ] Map all post-FX (20+)
  - [ ] Map all particles (18+)
  - [ ] Map all fields/SDF (16+)
  - [ ] Map all physics (12+)
  - [ ] Map all geometry (10+)
  - [ ] Map all animation (8+)
  - [ ] Map all math utilities (20+)
  - [ ] Assign priorities (High/Medium/Low)

- [ ] **Example format**:
  ```markdown
  ## Materials
  
  | Source | Target | Priority | Status | Notes |
  |--------|--------|----------|--------|-------|
  | portfolio-main/src/utils/webgpu/materials/clearcoat.ts | packages/tsl-kit/src/modules/materials/pbr-clearcoat.ts | High | Pending | Standard PBR with clearcoat |
  | portfolio-main/src/utils/webgpu/materials/iridescent.ts | packages/tsl-kit/src/modules/materials/iridescent.ts | High | Pending | Thin-film interference |
  ```

### 2.4 Technology Stack Research

- [ ] **React 18+ & Server Components**
  - [ ] Study RSC patterns
  - [ ] Understand client/server boundaries
  - [ ] Review hydration patterns
  - [ ] Document use cases

- [ ] **Next.js 15 App Router**
  - [ ] Study routing patterns
  - [ ] Understand layouts vs templates
  - [ ] Review data fetching
  - [ ] Study metadata API
  - [ ] Review streaming

- [ ] **React Three Fiber v9**
  - [ ] Study WebGPU support
  - [ ] Review renderer factory pattern
  - [ ] Understand frameloop modes
  - [ ] Study hooks (useFrame, useThree)
  - [ ] Review Drei helpers

- [ ] **Zustand**
  - [ ] Study store patterns
  - [ ] Review slice pattern
  - [ ] Understand middleware
  - [ ] Review persistence
  - [ ] Study devtools integration

- [ ] **Tweakpane**
  - [ ] Study control types
  - [ ] Review binding patterns
  - [ ] Understand event handling
  - [ ] Study theming
  - [ ] Review plugins

- [ ] **Zod**
  - [ ] Study schema definition
  - [ ] Review validation patterns
  - [ ] Understand transformation
  - [ ] Study error handling
  - [ ] Review JSON Schema conversion

- [ ] **Contentlayer**
  - [ ] Study document types
  - [ ] Review MDX integration
  - [ ] Understand computed fields
  - [ ] Study frontmatter validation
  - [ ] Review build process

- [ ] **GSAP**
  - [ ] Study timeline API
  - [ ] Review easing functions
  - [ ] Understand scroll triggers
  - [ ] Study 3D integration
  - [ ] Review performance tips

- [ ] **Vercel AI SDK**
  - [ ] Study tool calling
  - [ ] Review streaming responses
  - [ ] Understand middleware
  - [ ] Study rate limiting
  - [ ] Review error handling

- [ ] **Create RESEARCH/tech-stack-notes.md**

---

## 📦 Section 3: Dependency Installation

### 3.1 Engine Package Dependencies

- [ ] **Install core dependencies**
  ```bash
  cd packages/tsl-kit
  pnpm add three@0.181.0
  ```

- [ ] **Install dev dependencies**
  ```bash
  pnpm add -D typescript@5.7.0 \
    @types/three@0.181.0 \
    vitest@2.1.0 \
    @vitest/ui@2.1.0
  ```

- [ ] **Verify installation**
  ```bash
  pnpm list
  ```

### 3.2 Website Package Dependencies

- [ ] **Install Three.js ecosystem**
  ```bash
  cd apps/web
  pnpm add three@0.181.0 \
    @react-three/fiber@9.0.0 \
    @react-three/drei@9.119.0 \
    @react-three/postprocessing@2.16.0
  ```

- [ ] **Install React & Next.js**
  ```bash
  pnpm add next@15.1.0 \
    react@18.3.0 \
    react-dom@18.3.0
  ```

- [ ] **Install state & UI**
  ```bash
  pnpm add zustand@5.0.0 \
    tweakpane@4.0.5 \
    framer-motion@11.15.0
  ```

- [ ] **Install schema & validation**
  ```bash
  pnpm add zod@3.24.0 \
    zod-to-json-schema@3.24.0
  ```

- [ ] **Install content layer**
  ```bash
  pnpm add contentlayer2@0.5.0 \
    next-contentlayer2@0.5.0 \
    rehype-pretty-code@0.14.0 \
    rehype-autolink-headings@7.1.0 \
    rehype-slug@6.0.0 \
    remark-gfm@4.0.0
  ```

- [ ] **Install animations**
  ```bash
  pnpm add gsap@3.12.0
  ```

- [ ] **Install AI SDK**
  ```bash
  pnpm add ai@4.0.0 \
    @ai-sdk/openai@1.0.0 \
    @ai-sdk/anthropic@1.0.0
  ```

- [ ] **Install utilities**
  ```bash
  pnpm add date-fns@4.1.0 \
    clsx@2.1.1 \
    tailwind-merge@2.5.5
  ```

- [ ] **Install dev dependencies**
  ```bash
  pnpm add -D typescript@5.7.0 \
    @types/react@18.3.0 \
    @types/react-dom@18.3.0 \
    @types/three@0.181.0 \
    @types/node@22.10.0 \
    tailwindcss@3.4.17 \
    postcss@8.4.49 \
    autoprefixer@10.4.20 \
    @biomejs/biome@1.9.0 \
    vitest@2.1.0 \
    @playwright/test@1.49.0
  ```

- [ ] **Verify all installations**
  ```bash
  pnpm list
  pnpm why three  # Check why multiple versions if needed
  ```

### 3.3 Root Dependencies

- [ ] **Install monorepo tools**
  ```bash
  cd ../..
  pnpm add -D turbo@2.3.0 \
    @changesets/cli@2.27.0
  ```

- [ ] **Verify workspace links**
  ```bash
  pnpm list --depth=0
  ```

---

## 🛠️ Section 4: Configuration & Tooling

### 4.1 Biome (Linting & Formatting)

- [ ] **Create biome.json**
  ```json
  {
    "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
    "organizeImports": {
      "enabled": true
    },
    "linter": {
      "enabled": true,
      "rules": {
        "recommended": true,
        "style": {
          "useImportType": "error",
          "noNonNullAssertion": "warn"
        },
        "suspicious": {
          "noExplicitAny": "warn"
        }
      }
    },
    "formatter": {
      "enabled": true,
      "indentStyle": "space",
      "indentWidth": 2,
      "lineWidth": 100
    }
  }
  ```

- [ ] **Add scripts to root package.json**
  ```json
  {
    "scripts": {
      "lint": "biome lint .",
      "format": "biome format --write .",
      "check": "biome check --write ."
    }
  }
  ```

- [ ] **Test linting**
  ```bash
  pnpm lint
  ```

### 4.2 Vitest (Unit Testing)

- [ ] **Create vitest.config.ts (packages/tsl-kit)**
  ```typescript
  import { defineConfig } from 'vitest/config'
  
  export default defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: ['node_modules/', 'dist/'],
      },
    },
  })
  ```

- [ ] **Create vitest.config.ts (apps/web)**
  ```typescript
  import { defineConfig } from 'vitest/config'
  import react from '@vitejs/plugin-react'
  
  export default defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
    },
  })
  ```

- [ ] **Create test setup file**
  ```typescript
  // apps/web/vitest.setup.ts
  import '@testing-library/jest-dom'
  ```

- [ ] **Add test scripts**
  ```json
  {
    "scripts": {
      "test": "vitest",
      "test:ui": "vitest --ui",
      "test:coverage": "vitest --coverage"
    }
  }
  ```

### 4.3 Playwright (E2E Testing)

- [ ] **Initialize Playwright (apps/web)**
  ```bash
  cd apps/web
  pnpm playwright install --with-deps
  ```

- [ ] **Create playwright.config.ts**
  ```typescript
  import { defineConfig, devices } from '@playwright/test'
  
  export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
      baseURL: 'http://localhost:3000',
      trace: 'on-first-retry',
    },
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
    ],
    webServer: {
      command: 'pnpm dev',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
    },
  })
  ```

- [ ] **Create e2e directory**
  ```bash
  mkdir e2e
  ```

- [ ] **Add test script**
  ```json
  {
    "scripts": {
      "test:e2e": "playwright test",
      "test:e2e:ui": "playwright test --ui"
    }
  }
  ```

### 4.4 VSCode Configuration

- [ ] **Create .vscode/settings.json**
  ```json
  {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "biomejs.biome",
    "editor.codeActionsOnSave": {
      "source.organizeImports": true,
      "source.fixAll": true
    },
    "typescript.tsdk": "node_modules/typescript/lib",
    "typescript.enablePromptUseWorkspaceTsdk": true,
    "files.associations": {
      "*.css": "tailwindcss"
    }
  }
  ```

- [ ] **Create .vscode/extensions.json**
  ```json
  {
    "recommendations": [
      "biomejs.biome",
      "bradlc.vscode-tailwindcss",
      "yoavbls.pretty-ts-errors",
      "usernamehw.errorlens",
      "eamodio.gitlens"
    ]
  }
  ```

- [ ] **Create .vscode/launch.json**
  ```json
  {
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Next.js: debug server-side",
        "type": "node-terminal",
        "request": "launch",
        "command": "pnpm dev"
      },
      {
        "name": "Next.js: debug client-side",
        "type": "chrome",
        "request": "launch",
        "url": "http://localhost:3000"
      }
    ]
  }
  ```

### 4.5 Environment Variables

- [ ] **Create .env.local.example**
  ```bash
  # AI Models
  OPENAI_API_KEY=sk-...
  ANTHROPIC_API_KEY=sk-ant-...
  
  # Database (optional for Phase 1)
  # SUPABASE_URL=https://...
  # SUPABASE_ANON_KEY=...
  # SUPABASE_SERVICE_ROLE_KEY=...
  
  # GitHub (optional for Phase 1)
  # GITHUB_APP_ID=...
  # GITHUB_APP_INSTALLATION_ID=...
  # GITHUB_APP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
  
  # Auth (optional for Phase 1)
  # NEXTAUTH_SECRET=...
  # NEXTAUTH_URL=http://localhost:3000
  
  # Comments (optional for Phase 1)
  # NEXT_PUBLIC_GISCUS_REPO=owner/repo
  # NEXT_PUBLIC_GISCUS_REPO_ID=...
  # NEXT_PUBLIC_GISCUS_CATEGORY_ID=...
  
  # Analytics (optional for Phase 1)
  # NEXT_PUBLIC_CF_ANALYTICS_TOKEN=...
  ```

- [ ] **Document in README**

---

## 🚀 Section 5: CI/CD Foundation

### 5.1 GitHub Actions Setup

- [ ] **Create .github/workflows/quality.yml**
  ```yaml
  name: Quality
  
  on:
    push:
      branches: [main, develop]
    pull_request:
      branches: [main, develop]
  
  jobs:
    typecheck:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: pnpm/action-setup@v2
          with:
            version: 9
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: 'pnpm'
        - run: pnpm install --frozen-lockfile
        - run: pnpm typecheck
    
    lint:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: pnpm/action-setup@v2
          with:
            version: 9
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: 'pnpm'
        - run: pnpm install --frozen-lockfile
        - run: pnpm lint
  ```

- [ ] **Create .github/workflows/test.yml**
  ```yaml
  name: Test
  
  on:
    push:
      branches: [main, develop]
    pull_request:
      branches: [main, develop]
  
  jobs:
    unit:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: pnpm/action-setup@v2
          with:
            version: 9
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: 'pnpm'
        - run: pnpm install --frozen-lockfile
        - run: pnpm test:unit
  ```

- [ ] **Test workflows locally (optional)**
  ```bash
  # Install act (GitHub Actions local runner)
  # brew install act
  act -j typecheck
  ```

### 5.2 Git Hooks

- [ ] **Install husky (optional)**
  ```bash
  pnpm add -D husky lint-staged
  pnpm husky install
  ```

- [ ] **Create pre-commit hook**
  ```bash
  pnpm husky add .husky/pre-commit "pnpm lint-staged"
  ```

- [ ] **Configure lint-staged**
  ```json
  {
    "lint-staged": {
      "*.{ts,tsx,js,jsx}": ["biome check --write"],
      "*.{json,md}": ["biome format --write"]
    }
  }
  ```

### 5.3 Branch Protection

- [ ] **Document branch protection rules** (to be set in GitHub)
  - Require PR reviews (1+)
  - Require status checks (quality, test)
  - No force push
  - No deletion
  - Require linear history

---

## 📚 Section 6: Documentation

### 6.1 Main README

- [ ] **Create comprehensive README.md**
  ```markdown
  # TSL-KIT WebGPU Engine & Website
  
  > Engine-first website powered by Three.js r181, WebGPU, and TSL
  
  ## Features
  - 150+ pre-built modules (materials, post-FX, particles, physics)
  - Persistent R3F/Three canvas across all pages
  - Schema-driven UI with auto-generated controls
  - Dual AI assistants (UX Copilot + Builder Agent)
  - RAG-powered knowledge base
  - WebGPU → WebGL fallback
  
  ## Quick Start
  
  ### Prerequisites
  - Node.js 20+
  - pnpm 9+
  
  ### Installation
  ```bash
  # Clone repo
  git clone ...
  cd tsl-engine
  
  # Install dependencies
  pnpm install
  
  # Build engine
  pnpm --filter @tsl-kit/engine build
  
  # Start dev server
  pnpm --filter web dev
  ```
  
  ### Development
  - `pnpm dev` — Start all packages in dev mode
  - `pnpm build` — Build all packages
  - `pnpm lint` — Lint all packages
  - `pnpm test` — Run all tests
  - `pnpm typecheck` — Type check all packages
  
  ## Project Structure
  - `packages/tsl-kit/` — Engine package
  - `apps/web/` — Website
  - `RESOURCES/` — Source repositories
  - `RESEARCH/` — Research documentation
  
  ## Documentation
  - [Implementation Plan](./IMPLEMENTATION_PLAN_4PHASES.md)
  - [Phase 1 TODO](./PHASE_1_TODO.md)
  - [Architecture Guide](./RESEARCH/architecture.md)
  - [Porting Guide](./RESEARCH/porting-guide.md)
  
  ## License
  MIT
  ```

### 6.2 Research Documentation

- [ ] **Create RESEARCH/README.md** (index)
- [ ] **Create RESEARCH/architecture.md** (overall architecture)
- [ ] **Create RESEARCH/porting-guide.md** (how to port modules)
- [ ] **Create RESEARCH/testing-guide.md** (testing strategies)
- [ ] **Create RESEARCH/development-workflow.md** (git flow, PR process)

### 6.3 Contributing Guide

- [ ] **Create CONTRIBUTING.md**
  - Code style
  - Commit conventions
  - PR process
  - Testing requirements
  - Module porting checklist

---

## ✅ Phase 1 Completion Checklist

### Infrastructure
- [ ] Monorepo structure complete
- [ ] All packages initialized with package.json
- [ ] TypeScript configured in all packages
- [ ] Turborepo configured and working
- [ ] Git initialized with proper .gitignore
- [ ] Git LFS configured for large assets

### Dependencies
- [ ] All engine dependencies installed
- [ ] All website dependencies installed
- [ ] Root monorepo dependencies installed
- [ ] No peer dependency warnings
- [ ] All packages build successfully

### Research
- [ ] Three.js r181 research complete (RESEARCH/threejs-r181-notes.md)
- [ ] Portfolio examples cataloged (RESEARCH/portfolio-inventory.md)
- [ ] Fragments boilerplate analyzed (RESEARCH/fragments-bootstrap-pattern.md)
- [ ] TSL examples cataloged (RESEARCH/tsl-examples-inventory.md)
- [ ] Official examples documented (RESEARCH/official-examples-patterns.md)
- [ ] PORT_MAPPING.md complete (all 150+ modules mapped)
- [ ] Technology stack research complete (RESEARCH/tech-stack-notes.md)

### Tooling
- [ ] Biome configured and working
- [ ] Vitest configured in both packages
- [ ] Playwright configured
- [ ] VSCode settings created
- [ ] Environment variables documented

### CI/CD
- [ ] GitHub Actions workflows created
- [ ] Quality workflow passing
- [ ] Test workflow created (will pass when tests exist)
- [ ] Git hooks configured (optional)
- [ ] Branch protection rules documented

### Documentation
- [ ] Main README.md complete
- [ ] RESEARCH/ documentation complete
- [ ] CONTRIBUTING.md created
- [ ] All architecture diagrams created

### Team Readiness
- [ ] All team members can clone and build
- [ ] All team members understand architecture
- [ ] All team members can run dev server
- [ ] Development workflow documented and understood

---

## 🚦 Phase 1 Sign-Off

**Criteria for moving to Phase 2:**
1. ✅ All infrastructure tasks complete
2. ✅ All dependencies installed and verified
3. ✅ All research documentation complete
4. ✅ PORT_MAPPING.md reviewed and approved
5. ✅ CI/CD foundation working
6. ✅ Team trained and ready

**Sign-off**: ________________  
**Date**: ________________

---

**Next Phase**: [Phase 2 TODO](./PHASE_2_TODO.md) — Core Engine & Essential Infrastructure

