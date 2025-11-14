# TSL-KIT WebGPU Engine & Website

> **A production-ready WebGPU engine with 150+ modules and an engine-first showcase website**

[![Status](https://img.shields.io/badge/status-ready%20for%20implementation-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![Three.js](https://img.shields.io/badge/three.js-r181+-orange)]()
[![WebGPU](https://img.shields.io/badge/WebGPU-first-purple)]()

---

## ✨ Features

### 🎨 Comprehensive Module Library (150+)
- **30+ Materials**: PBR variants, NPR shaders, procedural surfaces, emissive FX
- **20+ Post-FX**: Bloom, DOF, TAA, color grading, stylized effects
- **18 Particle Systems**: GPU particles, emitters, forces, trails
- **16 Fields & Volumes**: Noise functions, SDFs, raymarching, volumetrics
- **12 Physics Simulations**: Cloth, fluids, softbodies, boids
- **Plus**: Lighting, geometry, animation, math utilities, I/O, debug tools

### 🚀 Engine-First Architecture
- **Persistent R3F Canvas**: No re-initialization across route changes
- **Hot-Swappable Modules**: Load/unload modules with formal lifecycle
- **WebGPU → WebGL Fallback**: Automatic backend detection
- **Schema-Driven UI**: Auto-generated controls from Zod schemas
- **Resource Management**: Automatic disposal, leak detection

### 🤖 Dual AI Assistants
- **UX Copilot**: Public assistant for navigation and exploration
- **Builder Agent**: Admin-only content creation with PR workflow
- **RAG-Powered**: Vector embeddings for contextual answers

### 📝 Content Pipeline
- **MDX Posts**: Rich content with frontmatter
- **3D Templates**: GSAP-animated R3F components
- **Style Tokens**: Theme system for consistent styling
- **Search**: Pagefind static site search
- **Comments**: Giscus GitHub Discussions integration

### ⚡ Performance
- **60 FPS @ 1080p** on RTX 2070-class GPU
- **Post-FX Budget**: ≤5ms GPU time
- **Demand Frameloop**: Render only when needed
- **Code Splitting**: Lazy-loaded modules and templates

---

## 📋 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+
- Git with LFS

### Installation

```bash
# Clone repository
git clone <repo-url>
cd tsl-engine

# Install dependencies
pnpm install

# Build engine package
pnpm --filter @tsl-kit/engine build

# Start development server
pnpm --filter web dev
```

Visit http://localhost:3000

---

## 🏗️ Project Structure

```
tsl-engine/
├── packages/
│   └── tsl-kit/                    # 🎨 Portable engine package
│       ├── src/
│       │   ├── core/              # Lifecycle, registry, runner
│       │   ├── rendering/         # Renderer factory
│       │   ├── modules/           # 150+ engine modules
│       │   │   ├── materials/     # PBR, NPR, procedural
│       │   │   ├── lighting/      # Lights, shadows, HDRI
│       │   │   ├── postfx/        # Bloom, DOF, TAA, etc.
│       │   │   ├── particles/     # GPU particles
│       │   │   ├── fields/        # Noise, SDFs, volumes
│       │   │   ├── physics/       # Cloth, fluids, boids
│       │   │   ├── geometry/      # Primitives, modifiers
│       │   │   ├── animation/     # Time, motion, audio
│       │   │   └── math/          # Utilities, patterns
│       │   └── utils/             # Helpers, resources
│       └── package.json
│
├── apps/
│   └── web/                        # 🌐 Engine-first website
│       ├── app/                   # Next.js App Router
│       │   ├── layout.tsx         # Persistent canvas shell
│       │   ├── page.tsx           # Home
│       │   ├── admin/             # Admin dashboard
│       │   ├── blog/              # Blog pages
│       │   ├── labs/              # Module showcases
│       │   └── portfolio/         # Project gallery
│       ├── components/
│       │   ├── webgpu/            # Canvas, Scene, Engine
│       │   ├── ui/                # UI components
│       │   └── admin/             # Admin components
│       ├── lib/
│       │   ├── store.ts           # Zustand state
│       │   ├── ai/                # AI assistants
│       │   └── admin/             # Schema, Tweakpane
│       ├── content/               # MDX posts
│       ├── templates/             # 3D templates
│       ├── LABS/                  # Module demos
│       └── public/                # Assets
│
├── RESOURCES/                      # 📚 Source repositories
│   ├── REPOSITORIES/
│   │   ├── portfolio examples/    # Maxime Heckel examples
│   │   └── TSLwebgpuExamples/    # TSL/WebGPU projects
│   └── three.js-r181/            # Three.js r181
│
├── IMPLEMENTATION_PLAN_4PHASES.md  # 📝 Master plan
├── PHASE_1_TODO.md                # Foundation & Research
├── PHASE_2_TODO.md                # Core Engine
├── PHASE_3_TODO.md                # Module Library
├── PHASE_4_TODO.md                # Website & Polish
├── PROJECT_SUMMARY.md             # Executive summary
└── QUICK_REFERENCE.md             # Commands & workflows
```

---

## 🗺️ Implementation Roadmap

### Phase 1: Foundation & Research (2-3 weeks)
**Status**: Ready to Start

- ✅ Monorepo setup
- ✅ Dependency installation
- ✅ Research & analysis
- ✅ PORT_MAPPING.md
- ✅ CI/CD foundation

[→ Phase 1 TODO](./PHASE_1_TODO.md)

---

### Phase 2: Core Engine (3-4 weeks)
**Status**: Awaiting Phase 1

- Core architecture (lifecycle, registry, runner)
- Renderer factory (WebGPU/WebGL fallback)
- Resource management
- 15 essential modules
- Persistent canvas
- Testing infrastructure

[→ Phase 2 TODO](./PHASE_2_TODO.md)

---

### Phase 3: Module Library (4-6 weeks)
**Status**: Awaiting Phase 2

- Port all 150+ modules
- Create LAB showcase pages
- Build 50+ presets
- Visual regression testing
- Performance optimization

[→ Phase 3 TODO](./PHASE_3_TODO.md)

---

### Phase 4: Website & Polish (3-4 weeks)
**Status**: Awaiting Phase 3

- Content pipeline (MDX + templates)
- Admin dashboard
- AI assistants
- RAG knowledge base
- All website pages
- SEO & analytics
- Production deployment

[→ Phase 4 TODO](./PHASE_4_TODO.md)

---

## 🎯 Module Categories

| Category | Modules | Description |
|----------|---------|-------------|
| **Materials** | 30+ | PBR, NPR, procedural, emissive/FX |
| **Lighting** | 12 | Lights, shadows, HDRI, IBL |
| **Post-FX** | 20+ | Bloom, DOF, TAA, color grading |
| **Particles** | 18 | GPU particles, emitters, forces |
| **Fields** | 16 | Noise, SDFs, volumes, raymarching |
| **Physics** | 12 | Cloth, fluids, softbodies, boids |
| **Geometry** | 10 | Primitives, modifiers, deformation |
| **Animation** | 8 | Time, motion, camera, audio |
| **Math** | 20 | Vector ops, colors, patterns |
| **I/O** | 8 | Loaders, presets, assets |
| **Debug** | 6 | Visualizers, profilers |

**Total**: 150+ modules

---

## 🧩 Technology Stack

### Core
- **Three.js r181+** — Graphics engine
- **WebGPU** — Modern GPU API
- **TSL** — Three Shading Language
- **TypeScript** — Type safety
- **React 18** — UI framework
- **Next.js 15** — App Router

### Engine
- **React Three Fiber** — React renderer for Three.js
- **Drei** — R3F helpers
- **Zustand** — State management
- **Zod** — Schema validation

### Content & UI
- **Contentlayer** — MDX processing
- **Tweakpane** — Controls
- **GSAP** — Animations
- **Tailwind CSS** — Styling

### AI & Search
- **Vercel AI SDK** — AI framework
- **OpenAI/Anthropic** — LLM providers
- **Pagefind** — Search
- **pgvector/Vectorize** — Embeddings

### Testing & CI
- **Vitest** — Unit tests
- **Playwright** — E2E tests
- **Biome** — Linting/formatting
- **GitHub Actions** — CI/CD
- **Cloudflare Pages** — Hosting

---

## 📝 Development

### Common Commands

```bash
# Development
pnpm dev                           # Start all packages
pnpm --filter web dev             # Start website only
pnpm --filter @tsl-kit/engine dev # Watch engine

# Building
pnpm build                         # Build all
pnpm --filter @tsl-kit/engine build  # Build engine

# Testing
pnpm test                          # All tests
pnpm test:unit                     # Unit tests
pnpm test:e2e                      # E2E tests
pnpm test:visual                   # Visual regression

# Code Quality
pnpm lint                          # Lint
pnpm format                        # Format
pnpm typecheck                     # Type check
```

[→ More commands](./QUICK_REFERENCE.md)

---

## 🧪 Testing

### Unit Tests (Vitest)
- Core utilities, math functions
- Schema validation
- State management
- **Target**: 80%+ coverage

### Integration Tests (Playwright)
- Canvas persistence
- Module hot-swap
- AI assistant tools
- PR workflow

### Visual Regression
- Golden image comparison
- Perceptual color difference (ΔE < 2)
- All modules with visual output

### Performance Tests
- 60 FPS @ 1080p
- Post-FX ≤5ms GPU time
- Particle stress tests
- Memory leak detection

---

## 🚀 Deployment

### Cloudflare Pages (Recommended)
```bash
# Automatic on push to main
git push origin main

# Manual deployment
pnpm wrangler pages deploy apps/web/out
```

### Vercel (Alternative)
```bash
# Deploy to production
vercel --prod
```

---

## 📚 Documentation

### Planning Documents
- **[Implementation Plan](./IMPLEMENTATION_PLAN_4PHASES.md)** — Master plan with 4 phases
- **[Project Summary](./PROJECT_SUMMARY.md)** — Executive overview
- **[Quick Reference](./QUICK_REFERENCE.md)** — Commands & workflows

### Phase Documents
- **[Phase 1: Foundation](./PHASE_1_TODO.md)** — Setup & research
- **[Phase 2: Core Engine](./PHASE_2_TODO.md)** — Engine architecture
- **[Phase 3: Module Library](./PHASE_3_TODO.md)** — Port all modules
- **[Phase 4: Website & Polish](./PHASE_4_TODO.md)** — Complete website

### External Resources
- [Three.js Docs](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [R3F Docs](https://r3f.docs.pmnd.rs/)
- [WebGPU Fundamentals](https://webgpufundamentals.org/)
- [TSL Wiki](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)

---

## 🎯 Success Criteria

### Technical
- ✅ 150+ modules ported and working
- ✅ 80%+ test coverage
- ✅ 60 FPS @ 1080p (RTX 2070-class)
- ✅ Post-FX budget ≤5ms
- ✅ Zero production errors
- ✅ WebGPU + WebGL fallback

### UX
- ✅ Persistent canvas (no re-init)
- ✅ Sub-100ms route transitions
- ✅ Schema-driven controls
- ✅ AI assistants working
- ✅ Admin dashboard functional

### Content
- ✅ 10+ example posts
- ✅ 50+ presets
- ✅ Comprehensive docs
- ✅ RAG search working
- ✅ Comments functional

### Deployment
- ✅ Deployed to production
- ✅ CI/CD pipeline passing
- ✅ Secrets managed
- ✅ Analytics tracking
- ✅ SEO complete

---

## 🤝 Contributing

### Development Workflow
1. Choose a task from phase TODO
2. Create feature branch
3. Implement changes
4. Write tests
5. Update documentation
6. Submit PR

### Module Contribution
1. Check PORT_MAPPING.md
2. Port module from source
3. Create adapter wrapper
4. Add Zod schema
5. Create LAB page
6. Write tests
7. Submit PR

[→ Contributing Guide](./CONTRIBUTING.md) (created in Phase 1)

---

## 🔒 Security

- **Admin routes** gated with authentication
- **API keys** stored in environment variables
- **Rate limiting** on AI assistant tools
- **Audit logs** for all agent actions
- **PR workflow** for Builder Agent (no direct main writes)

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details

---

## 🙏 Acknowledgments

### Source Repositories
- **[Maxime Heckel](https://github.com/MaximeHeckel)** — Portfolio examples with modern WebGPU patterns
- **[Fragments Boilerplate](https://github.com/MaximeHeckel/fragments-boilerplate)** — Clean WebGPU bootstrap
- **TSL WebGPU Examples** — Various projects (fluids, particles, raymarching)
- **[Three.js](https://threejs.org/)** — Foundation graphics engine

### Technologies
- Three.js team for WebGPU/TSL support
- React Three Fiber team for R3F
- Vercel team for AI SDK and hosting
- Cloudflare for Pages and Workers

---

## 📞 Support

- **Documentation**: See `/docs` directory (after Phase 1)
- **Issues**: [GitHub Issues]
- **Discussions**: [GitHub Discussions]
- **Discord**: [Community Discord] (post-launch)

---

## 🗺️ Roadmap

### Current Phase
**Phase 1**: Foundation & Research (Week 1-3)

### Next Milestones
- **Week 4-7**: Core Engine (Phase 2)
- **Week 8-13**: Module Library (Phase 3)
- **Week 14-17**: Website & Polish (Phase 4)
- **Week 18**: Launch 🚀

---

## 📊 Project Status

| Phase | Status | Progress | ETA |
|-------|--------|----------|-----|
| Phase 1 | 🟡 Ready | 0% | Week 1-3 |
| Phase 2 | ⚪ Pending | 0% | Week 4-7 |
| Phase 3 | ⚪ Pending | 0% | Week 8-13 |
| Phase 4 | ⚪ Pending | 0% | Week 14-17 |
| **Total** | **🟡 Ready** | **0%** | **Week 18** |

---

## 🎉 Let's Build!

Ready to create something amazing? Start with **[Phase 1 TODO](./PHASE_1_TODO.md)**!

**Questions?** Check the **[Quick Reference](./QUICK_REFERENCE.md)** or **[Project Summary](./PROJECT_SUMMARY.md)**.

---

**Built with ❤️ using WebGPU, Three.js, and React**

