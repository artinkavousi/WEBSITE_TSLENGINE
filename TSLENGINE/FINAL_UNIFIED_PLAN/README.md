# TSL/WebGPU Engine — Final Unified Plan

> **Complete Implementation Blueprint**  
> **Version:** 2.0  
> **Date:** November 13, 2025  
> **Status:** Ready for Development

---

## 📋 Overview

This folder contains the **complete, unified proposal** for building a self-contained TSL/WebGPU engine + engine-first website, synthesized from all previous planning documents.

---

## 🗂️ Document Structure

### Core Documents

1. **[proposalchat.md](../proposalchat.md)** ⭐ **START HERE**  
   - Complete unified proposal (80+ pages)
   - Architecture, module taxonomy, roadmap
   - Direct-port strategy, testing, deployment

### Reference Documents (`/docs`)

2. **[WEBSITEv1_engine_first_website_tsl_web_gpu_pipeline_unified_final_spec_v_1.md](./docs/WEBSITEv1_engine_first_website_tsl_web_gpu_pipeline_unified_final_spec_v_1.md)**  
   - Original unified spec (engine-first website architecture)

3. **[engine_vision.md](./docs/engine_vision.md)**  
   - Complete engine module taxonomy (300+ items across 16 categories)

4. **[engine_artitechture.md](./docs/engine_artitechture.md)**  
   - TypeScript architecture skeletons (Context, Registry, Modules)

5. **[LAB showcase implementation.md](./docs/LAB showcase implementation.md)**  
   - Per-category lab structure (materials, lighting, postfx, etc.)

6. **[original_proposal.md](./docs/original_proposal.md)**  
   - Original proposal (direct-port philosophy, resource analysis)

### Planning Documents (`/planning`)

7. **[IMPLEMENTATION_ROADMAP.md](./planning/IMPLEMENTATION_ROADMAP.md)**  
   - 7-phase, 14-week detailed roadmap with tasks and acceptance criteria

8. **[PORT_MAPPING.md](./planning/PORT_MAPPING.md)**  
   - Complete source → target mapping for all 150+ modules

9. **[RESOURCE_INVENTORY.md](./planning/RESOURCE_INVENTORY.md)**  
   - Detailed catalog of all available modules in RESOURCES/REPOSITORIES

10. **[TESTING_STRATEGY.md](./planning/TESTING_STRATEGY.md)**  
    - Unit, integration, visual regression, performance testing

11. **[DEPLOYMENT_GUIDE.md](./planning/DEPLOYMENT_GUIDE.md)**  
    - $0 hosting, CI/CD setup, secrets management

### Implementation Guides (`/implementation`)

12. **[QUICK_START.md](./implementation/QUICK_START.md)**  
    - Get started in 30 minutes (scaffold + first module)

13. **[MODULE_PORTING_GUIDE.md](./implementation/MODULE_PORTING_GUIDE.md)**  
    - Step-by-step guide for porting a module from RESOURCES

14. **[SCHEMA_DRIVEN_DESIGN.md](./implementation/SCHEMA_DRIVEN_DESIGN.md)**  
    - How to wire Zod schemas → Tweakpane → MDX

15. **[AI_ASSISTANT_SETUP.md](./implementation/AI_ASSISTANT_SETUP.md)**  
    - UX Copilot + Builder Agent implementation

### Resource Links (`/resources`)

16. **[THREE_R181_KNOWLEDGE.md](./resources/THREE_R181_KNOWLEDGE.md)**  
    - Links to Three.js r181 docs, examples, TSL wiki

17. **[WEBGPU_REFERENCES.md](./resources/WEBGPU_REFERENCES.md)**  
    - WebGPU fundamentals, best practices, community resources

18. **[EXAMPLE_PROJECTS.md](./resources/EXAMPLE_PROJECTS.md)**  
    - Annotated list of all example projects in RESOURCES/REPOSITORIES

---

## 🎯 Getting Started (3 Steps)

### 1. Read the Core Proposal
Start with **[proposalchat.md](../proposalchat.md)** — this is the complete blueprint.

### 2. Review the Roadmap
Check **[IMPLEMENTATION_ROADMAP.md](./planning/IMPLEMENTATION_ROADMAP.md)** to understand the 7 phases.

### 3. Follow Quick Start
Use **[QUICK_START.md](./implementation/QUICK_START.md)** to scaffold the monorepo and port your first module.

---

## 🏗️ Architecture at a Glance

```txt
/
├── packages/
│   └── tsl-kit/              # Self-contained engine (150+ modules)
│       ├── engine/
│       │   ├── core/         # Context, registry, types
│       │   ├── rendering/    # WebGPU/WebGL renderer
│       │   └── modules/      # 16 categories (materials, postfx, etc.)
│       └── ported/           # Direct ports from RESOURCES (verbatim)
│
└── LABS/
    └── web/                  # Engine-first website
        ├── app/              # Next.js App Router
        ├── components/       # ThreeRoot, UiOverlay, Assistants
        ├── scenes/           # Route-based 3D scenes
        ├── templates/        # 3D/GSAP templates for MDX
        ├── lib/              # Zustand, AI, agents
        └── content/          # MDX posts/projects
```

---

## 📊 Module Breakdown (150+ Total)

| Category             | Count | Priority | Status  |
|----------------------|-------|----------|---------|
| Materials (PBR/NPR)  | 25+   | High     | Pending |
| Lighting & Shadows   | 15+   | High     | Pending |
| Post-FX              | 20+   | High     | Pending |
| Particles & VFX      | 20+   | Medium   | Pending |
| Noise & Patterns     | 15+   | Medium   | Pending |
| Fields & Volumes     | 10+   | Medium   | Pending |
| SDF & Raymarching    | 15+   | Medium   | Pending |
| Physics & Sim        | 10+   | Low      | Pending |
| Geometry & Mesh      | 10+   | Low      | Pending |
| Animation & Motion   | 5+    | Low      | Pending |
| Math & Utilities     | 10+   | Medium   | Pending |
| **Total**            | **150+** | -     | **0%**  |

---

## 🚀 Implementation Timeline

| Phase | Duration | Objective |
|-------|----------|-----------|
| **1. Foundation** | Week 1-2 | Scaffold + renderer shell |
| **2. Admin Dashboard** | Week 2-3 | Schema-driven controls |
| **3. MDX CMS** | Week 3-4 | Content + templates |
| **4. Module Porting** | Week 4-8 | Port 150+ modules |
| **5. UX Copilot** | Week 9 | Public AI assistant |
| **6. Builder Agent** | Week 10 | Admin AI + PR workflow |
| **7. RAG + Search** | Week 11-12 | Knowledge base |
| **8. Polish + Launch** | Week 13-14 | Production deploy |

**Total:** 14 weeks (3.5 months)

---

## 🎯 Success Criteria

### Technical
- ✅ 150+ modules ported and working
- ✅ 80%+ test coverage
- ✅ 60 FPS @ 1080p (RTX 2070-class)
- ✅ WebGPU + WebGL fallback

### UX
- ✅ Persistent canvas (no re-init on route change)
- ✅ Schema-driven controls auto-generate
- ✅ AI assistants respond to natural language

### Content
- ✅ 10+ example posts with templates
- ✅ 50+ material/FX presets
- ✅ Comprehensive docs

### Deployment
- ✅ $0 hosting option (Cloudflare Pages)
- ✅ CI/CD pipeline (quality, build, test, deploy)
- ✅ No hard-coded secrets

---

## 📚 Key Resources

### Internal
- **RESOURCES/REPOSITORIES/portfolio examples/** — 30+ WebGPU experiments (⭐⭐⭐⭐⭐)
- **RESOURCES/REPOSITORIES/TSLwebgpuExamples/** — 25+ working TSL projects (⭐⭐⭐⭐)
- **RESOURCES/THREEJS_TSL_knowladge_DOCS/** — Three.js r181 knowledge base

### External
- [Three.js r181 Docs](https://threejs.org/docs/)
- [Three.js Examples (WebGPU)](https://threejs.org/examples/)
- [TSL Wiki](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)
- [R3F v9 Migration](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide)
- [WebGPU Fundamentals](https://webgpufundamentals.org/)

---

## 🔧 Tooling

### Development
- **Three.js r181+** (WebGPU + TSL)
- **React Three Fiber** (R3F v9+)
- **Next.js** (App Router)
- **TypeScript**
- **Zustand** (state)
- **Zod** (schemas)

### Build & Test
- **Vitest** (unit tests)
- **Playwright** (integration + visual regression)
- **Biome** (lint + format)
- **pnpm** (package manager)

### Deploy
- **Cloudflare Pages** (hosting)
- **GitHub Actions** (CI/CD)
- **Vercel AI SDK** (AI assistants)

---

## 💬 Support

### Questions?
- Read the docs in `/docs`, `/planning`, `/implementation`
- Check the resource inventory: [RESOURCE_INVENTORY.md](./planning/RESOURCE_INVENTORY.md)
- Review example projects: [EXAMPLE_PROJECTS.md](./resources/EXAMPLE_PROJECTS.md)

### Issues?
- Verify Three.js version (must be r181+)
- Check WebGPU support in browser
- Review [TESTING_STRATEGY.md](./planning/TESTING_STRATEGY.md)

---

**Ready to build? Start with [QUICK_START.md](./implementation/QUICK_START.md) →**

