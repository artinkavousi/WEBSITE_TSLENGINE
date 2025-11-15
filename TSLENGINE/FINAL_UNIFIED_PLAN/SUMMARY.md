# TSL/WebGPU Engine — Executive Summary

> **Quick reference for the complete unified proposal**  
> **Version:** 2.0  
> **Date:** November 13, 2025

---

## 🎯 Project Overview

### Vision
Build a **self-contained, plug-and-play TSL/WebGPU/MaterialX engine** that powers an **engine-first website** with 150+ pre-built modules, dual AI assistants, and schema-driven architecture.

### Goals
1. **Engine**: Comprehensive TSL/WebGPU toolkit (150+ modules across 16 categories)
2. **Website**: Persistent canvas architecture with MDX overlays
3. **AI**: UX Copilot (public) + Builder Agent (admin, PR workflow)
4. **DX**: Direct-port strategy (no reinvention), schema-driven controls
5. **Deploy**: $0 hosting path (Cloudflare Pages), CI/CD pipeline

---

## 📊 Scope at a Glance

### Module Categories (150+ Total)

| Category | Count | Examples |
|----------|-------|----------|
| **Materials** | 25+ | PBR, NPR, procedural (wood, marble, rust), emissive |
| **Lighting** | 15+ | Directional, point, spot, HDRI, shadows, GI |
| **Post-FX** | 20+ | Bloom, DOF, TAA, SSR, GTAO, SSGI, tone mapping |
| **Particles** | 20+ | GPGPU, attractors, flow fields, emitters, forces |
| **Noise & Math** | 15+ | Perlin, Simplex, Curl, FBM, Worley, Voronoi |
| **Fields & SDF** | 10+ | Primitives, boolean ops, raymarching, volumes |
| **Physics** | 10+ | Cloth, fluids, boids, softbody, wind |
| **Geometry** | 10+ | Primitives, modifiers, instancing, deformation |
| **Animation** | 5+ | Timelines, curves, camera rigs, audio-reactive |
| **Utilities** | 20+ | Color, coordinates, patterns, algorithms |

**Total:** 150+ modules, ~280 hours porting effort

---

## 🏗️ Architecture Highlights

### Monorepo Structure

```txt
/
├── packages/
│   └── tsl-kit/              # Self-contained engine (150+ modules)
│
└── LABS/
    └── web/                  # Engine-first website (Next.js + R3F)
```

### Key Technologies

**Engine:**
- Three.js r181+ (WebGPU + TSL)
- TypeScript
- Zod (schemas)

**Website:**
- Next.js (App Router)
- React Three Fiber (R3F v9+)
- Contentlayer (MDX CMS)
- GSAP (animation)
- Tweakpane (schema-driven UI)
- Zustand (state)

**AI:**
- Vercel AI SDK (OpenAI/Anthropic)
- Optional: WebLLM (offline fallback)
- RAG: pgvector or Vectorize

**Deploy:**
- Cloudflare Pages ($0) OR Vercel Hobby
- GitHub Actions (CI/CD)
- Giscus (comments), Pagefind (search)

---

## 🚀 Implementation Timeline (14 Weeks)

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **1. Foundation** | Week 1-2 | Scaffold + WebGPU renderer |
| **2. Admin Dashboard** | Week 2-3 | Schema-driven controls |
| **3. MDX CMS** | Week 3-4 | Content + templates |
| **4. Module Porting** | Week 4-8 | 150+ modules from RESOURCES |
| **5. UX Copilot** | Week 9 | Public AI assistant |
| **6. Builder Agent** | Week 10 | Admin AI + PR workflow |
| **7. RAG + Search** | Week 11-12 | Knowledge base |
| **8. Polish + Launch** | Week 13-14 | Production deploy |

**Total:** 14 weeks (3.5 months)

---

## 📦 Source Repositories (RESOURCES/)

### Priority 1: fragments-boilerplate-main (⭐⭐⭐⭐⭐)
- **26 modules** (noise, SDF, post-FX, utilities)
- **21 hours** porting effort
- Clean, modern TSL patterns

### Priority 2: portfolio-main (⭐⭐⭐⭐⭐)
- **22 modules** (infrastructure, compute, materials)
- **38.5 hours** porting effort
- Production-tested patterns

### Priority 3: tsl-textures-main (⭐⭐⭐⭐⭐)
- **16 essential modules** (Phase 4), **38 additional** (Phase 6+)
- **26 hours** (Phase 4), **60 hours** (Phase 6+)
- Polished procedural texture library

### Priority 4: TSLwebgpuExamples (⭐⭐⭐⭐)
- **14 modules** (particles, fluids, physics)
- **47 hours** porting effort
- Diverse implementations

**Total:** 78 modules (Phase 4), 125+ modules (all phases)

---

## 🎯 Success Criteria

### Technical
- ✅ 150+ modules ported and working
- ✅ 80%+ test coverage (unit + integration)
- ✅ 60 FPS @ 1080p (RTX 2070-class GPU)
- ✅ Post-FX budget ≤5ms GPU time
- ✅ Zero production console errors
- ✅ WebGPU + WebGL fallback both functional

### UX
- ✅ Persistent canvas (no re-init on route change)
- ✅ Sub-100ms route transitions
- ✅ Schema-driven controls auto-generate
- ✅ AI assistants respond to natural language

### Content
- ✅ 10+ example posts with different templates
- ✅ 50+ material/FX/particle presets
- ✅ Comprehensive docs (API, module map, getting started)
- ✅ RAG-powered search with source citations

### Deployment
- ✅ $0 hosting option (Cloudflare Pages)
- ✅ CI/CD pipeline (quality, build, test, deploy)
- ✅ No hard-coded secrets
- ✅ PR workflow for Builder Agent (no direct main writes)

---

## 💡 Key Innovations

### 1. Direct-Port Strategy
**Philosophy:** Port working code verbatim (no reinvention)  
**Benefit:** Minimize bugs, preserve proven implementations  
**Method:** Copy → adapt paths/types → wrap in `EngineModule`

### 2. Schema-Driven Architecture
**Single Source of Truth:** Zod schemas → Tweakpane + MDX + Engine  
**Benefit:** One definition, three outputs (controls, docs, config)  
**Example:**
```ts
const CreativeSchema = z.object({
  material: z.object({ baseColor: z.string(), ... }),
  postfx: z.object({ bloom: z.boolean(), ... }),
})
// → Auto-generates Tweakpane UI
// → Powers MDX documentation
// → Drives engine configuration
```

### 3. Engine-First Website
**Persistent Canvas:** One R3F/Three canvas across all routes  
**Benefit:** No canvas re-init, seamless transitions  
**Pattern:**
```tsx
<html>
  <body>
    <ThreeRoot />          {/* Persistent canvas */}
    <UiOverlay>{children}</UiOverlay>  {/* MDX overlays */}
  </body>
</html>
```

### 4. Dual AI Assistants
**UX Copilot (Public):**
- Safe tools only (navigate, setParam, search)
- No file writes, no repo access

**Builder Agent (Admin):**
- Content creation tools (draftPost, applyTemplate)
- PR workflow (dry-run → diff → confirm → PR)
- Second confirmation for high-impact ops
- Audit logging

### 5. RAG-Powered Knowledge
**Embed:** Content, code, shaders, API docs  
**Retrieve:** Scoped by path prefix  
**Cite:** Source links (file paths + line numbers) in responses

---

## 📚 Documentation Structure

### Core Documents
1. **[proposalchat.md](../proposalchat.md)** — Complete unified proposal (START HERE)
2. **[README.md](./README.md)** — Overview + navigation

### Reference (`/docs`)
3. **WEBSITEv1_engine_first_website...** — Original website spec
4. **engine_vision.md** — Complete module taxonomy (300+ items)
5. **engine_artitechture.md** — TypeScript architecture
6. **LAB showcase implementation.md** — Per-category lab structure
7. **original_proposal.md** — Direct-port philosophy

### Planning (`/planning`)
8. **IMPLEMENTATION_ROADMAP.md** — 7 phases, 14 weeks, detailed tasks
9. **PORT_MAPPING.md** — Source → target mapping (150+ modules)
10. **RESOURCE_INVENTORY.md** — Complete catalog of available modules
11. **TESTING_STRATEGY.md** — Unit, integration, visual, performance
12. **DEPLOYMENT_GUIDE.md** — $0 hosting, CI/CD, secrets

### Implementation (`/implementation`)
13. **QUICK_START.md** — Get started in 30 minutes
14. **MODULE_PORTING_GUIDE.md** — Step-by-step porting guide
15. **SCHEMA_DRIVEN_DESIGN.md** — Zod → Tweakpane → MDX workflow
16. **AI_ASSISTANT_SETUP.md** — UX Copilot + Builder Agent setup

### Resources (`/resources`)
17. **THREE_R181_KNOWLEDGE.md** — Three.js r181 links
18. **WEBGPU_REFERENCES.md** — WebGPU fundamentals
19. **EXAMPLE_PROJECTS.md** — Annotated project list

---

## 🎬 Getting Started (3 Steps)

### 1. Read the Proposal
Start with **[proposalchat.md](../proposalchat.md)** for the complete blueprint

### 2. Review the Roadmap
Check **[IMPLEMENTATION_ROADMAP.md](./planning/IMPLEMENTATION_ROADMAP.md)** for the 7-phase plan

### 3. Follow Quick Start
Use **[QUICK_START.md](./implementation/QUICK_START.md)** to scaffold and port your first module

---

## 🔧 Development Commands

```bash
# Start development
cd packages/tsl-kit && pnpm dev

# Build engine
cd packages/tsl-kit && pnpm build

# Start LABS site
cd LABS/web && pnpm dev

# Run tests
pnpm test

# Check types
pnpm typecheck

# Lint & format
pnpm lint
pnpm format
```

---

## 📊 Progress Tracking

### Module Count

| Phase | Target | Current | % Complete |
|-------|--------|---------|------------|
| Phase 4 | 150+ | 0 | 0% |
| **TOTAL** | **150+** | **0** | **0%** |

### Timeline

| Phase | Status | Completion Date |
|-------|--------|-----------------|
| Phase 1 | ⏳ Pending | - |
| Phase 2 | ⏳ Pending | - |
| Phase 3 | ⏳ Pending | - |
| Phase 4 | ⏳ Pending | - |
| Phase 5 | ⏳ Pending | - |
| Phase 6 | ⏳ Pending | - |
| Phase 7 | ⏳ Pending | - |
| Phase 8 | ⏳ Pending | - |

---

## 🚨 Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Three.js r181 API changes | Pin version, test early |
| Performance issues | Profile each phase |
| Scope creep | Stick to roadmap, defer extras |
| Timeline delays | Buffer time in Phase 4 |
| Feature complexity | MVP first, enhance later |

---

## 🎯 Next Actions (Immediate)

1. **Read** [proposalchat.md](../proposalchat.md)
2. **Review** [IMPLEMENTATION_ROADMAP.md](./planning/IMPLEMENTATION_ROADMAP.md)
3. **Start** [QUICK_START.md](./implementation/QUICK_START.md)
4. **Begin** Phase 1 (Foundation)

---

## 📞 Support & References

### Documentation
- [Three.js r181 Docs](https://threejs.org/docs/)
- [TSL Wiki](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)
- [R3F v9 Migration](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide)
- [WebGPU Fundamentals](https://webgpufundamentals.org/)

### Internal
- **RESOURCES/REPOSITORIES/portfolio examples/** — Source material (⭐⭐⭐⭐⭐)
- **RESOURCES/REPOSITORIES/TSLwebgpuExamples/** — Additional sources (⭐⭐⭐⭐)
- **RESOURCES/THREEJS_TSL_knowladge_DOCS/** — Three.js r181 knowledge base

---

**Ready to build? → [QUICK_START.md](./implementation/QUICK_START.md)**


