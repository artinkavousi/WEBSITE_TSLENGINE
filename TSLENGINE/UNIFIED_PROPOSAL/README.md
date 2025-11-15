# 🌌 TSL/WebGPU/MaterialX Engine — Unified Proposal

**Complete development plan for building a production-ready TSL/WebGPU engine with showcase website**

---

## 📖 What is This?

This folder contains the **complete, unified development plan** for building:

1. **TSL-Kit Engine** (`/packages/tsl-kit`) — A self-contained, plug-and-play TSL/WebGPU/MaterialX engine on Three.js r181+
2. **LABS Website** (`/LABS/web`) — An engine-first showcase website with 30+ interactive demos using R3F, MDX, and schema-driven controls

This specification merges and supersedes all previous proposals, consolidating:
- Engine architecture & module design
- Resource analysis & port strategy  
- Website structure & schema-driven workflow
- 20-week implementation roadmap

---

## 📂 Document Structure

```
TSLENGINE/UNIFIED_PROPOSAL/
├── README.md                          # ← You are here
├── UNIFIED_ENGINE_PROPOSAL.md         # Main specification (50+ pages)
├── RESOURCE_INVENTORY.md              # Catalog of all 210+ modules available for porting
├── PORT_MAPPING.md                    # Detailed source → target mapping
├── IMPLEMENTATION_ROADMAP.md          # 20-week plan with daily tasks
│
├── /docs                              # Source documents
│   ├── proposalchat.md                # Original requirements
│   ├── WEBSITEv1_engine_first_website_tsl_web_gpu_pipeline_unified_final_spec_v_1.md
│   ├── original_proposal.md           # Lines 1-18 from proposal v1
│   ├── engine_vision.md               # Engine vision & scope
│   ├── engine_artitechture.md         # Architecture patterns
│   └── LAB showcase implementation.md # LABS structure
│
└── /analysis                          # (For future analysis docs)
```

---

## 🚀 Quick Start

### For Project Managers

1. **Read:** `UNIFIED_ENGINE_PROPOSAL.md` (Executive Summary + Vision)
2. **Review:** `IMPLEMENTATION_ROADMAP.md` (Timeline + Milestones)
3. **Track:** Use roadmap's weekly check-in template

### For Developers

1. **Read:** `UNIFIED_ENGINE_PROPOSAL.md` (Technical Architecture)
2. **Understand:** `RESOURCE_INVENTORY.md` (What's available to port)
3. **Follow:** `PORT_MAPPING.md` (How to port each module)
4. **Execute:** `IMPLEMENTATION_ROADMAP.md` (Daily task breakdown)

### For Designers

1. **Read:** `UNIFIED_ENGINE_PROPOSAL.md` (LABS & Showcase Website section)
2. **Review:** `docs/LAB showcase implementation.md`
3. **Explore:** Reference sites:
   - [Maxime Heckel's blog](https://blog.maximeheckel.com)
   - [Fragments Supply](https://fragments.supply)

---

## 🎯 Project Goals

### Engine Goals

✅ **Self-contained** — Drop into any Three.js/WebGPU project  
✅ **50+ modules** — Materials, post-FX, particles, physics, math  
✅ **Modular** — Components work independently or snap together  
✅ **Agent-friendly** — JSON schemas + typed APIs for AI/agents  
✅ **Production-ready** — Performance tuning, WebGL fallback, debug tools

### Website Goals

✅ **Engine-first** — Persistent R3F canvas across all pages  
✅ **30+ LABS** — Interactive showcases for each module  
✅ **Schema-driven** — One schema controls engine + UI + docs  
✅ **MDX content** — Local-first with Contentlayer  
✅ **Deployed** — Cloudflare Pages or Vercel (free tier available)

---

## 📊 Project Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Engine Modules** | 50+ | 0 | 🔴 Not Started |
| **LABS Showcases** | 30+ | 0 | 🔴 Not Started |
| **Documentation** | Complete | 0% | 🔴 Not Started |
| **Tests** | All passing | 0 | 🔴 Not Started |
| **Deployed** | Live site | No | 🔴 Not Started |

---

## 📅 Timeline

| Phase | Weeks | Modules | LABS | Status |
|-------|-------|---------|------|--------|
| **Phase 0** | 1-2 | Setup | 0 | 🔴 Not Started |
| **Phase 1** | 3-5 | 13 | 3-5 | 🔴 Not Started |
| **Phase 2** | 6-8 | 11 | 5-7 | 🔴 Not Started |
| **Phase 3** | 9-11 | 6 | 4-6 | 🔴 Not Started |
| **Phase 4** | 12-14 | 15 | 5-7 | 🔴 Not Started |
| **Phase 5** | 15-17 | 5 | 4-5 | 🔴 Not Started |
| **Phase 6** | 18-20 | 18 | All | 🔴 Not Started |
| **TOTAL** | **20 weeks** | **68+** | **30+** | **0%** |

---

## 🔑 Key Decisions

### Port Philosophy

✅ **Direct port existing working code**  
❌ **Do NOT rewrite or reinvent**

**Rationale:** Minimize bugs by keeping proven implementations intact. Only adapt imports, types, and paths.

---

### Priority Order

1. 🔥 **Phase 1:** Noise, SDF, Math (foundation for everything)
2. 🟡 **Phase 2:** Post-FX, Materials (visible results quickly)
3. 🟢 **Phase 3:** Particles, Compute (impressive demos)
4. 🔵 **Phase 4:** Advanced Materials, Lighting (polish)
5. 🟣 **Phase 5:** Physics, Fluids (advanced features)
6. ⚫ **Phase 6:** Extras, Polish (nice-to-haves)

---

### Technology Choices

#### Engine (`/packages/tsl-kit`)

- **Core:** Three.js r181+, TypeScript
- **Rendering:** WebGPU (primary), WebGL (fallback)
- **Build:** Rollup (ESM/CJS bundles)
- **Testing:** Vitest

#### Website (`/LABS/web`)

- **Framework:** Next.js 14 (App Router)
- **3D:** @react-three/fiber, @react-three/drei
- **Content:** Contentlayer (MDX)
- **UI:** Tailwind + shadcn/ui
- **Controls:** Tweakpane (Leva)
- **Deploy:** Cloudflare Pages or Vercel

---

## 📚 Resources Being Ported

### Source Repositories

1. **fragments-boilerplate-main** (🔥 Priority 1)
   - 8 noise modules
   - 2 SDF modules
   - 6 post-FX effects
   - Math utilities

2. **portfolio-main** (🔥 Priority 2)
   - BaseExperience class
   - 4 compute patterns
   - WebGPU demos
   - Custom materials

3. **blog.maximeheckel.com-main** (🔥 Priority 3)
   - 57 MDX articles
   - 50+ interactive widgets
   - TSL explanations

4. **tsl-textures-main** (🟡 Priority 4)
   - 53 procedural textures
   - tsl-utils library
   - Material examples

5. **TSLwebgpuExamples/** (🟡 Priority 5)
   - 28 example projects
   - Particle systems
   - Fluid simulations
   - Physics demos

**Total Available:** 210+ modules across 28 projects

---

## 🛠️ How to Use This Spec

### For Implementation

1. **Start with:** `IMPLEMENTATION_ROADMAP.md` Phase 0
2. **For each module:**
   - Find it in `RESOURCE_INVENTORY.md`
   - Get port details from `PORT_MAPPING.md`
   - Follow the standard port workflow
3. **Track progress:** Update roadmap checkboxes
4. **Weekly check-in:** Use roadmap template

### For Reference

- **Architecture questions?** → `UNIFIED_ENGINE_PROPOSAL.md` (Technical Architecture)
- **Module locations?** → `RESOURCE_INVENTORY.md`
- **Port instructions?** → `PORT_MAPPING.md`
- **Timeline questions?** → `IMPLEMENTATION_ROADMAP.md`

---

## ✅ Acceptance Criteria

### Engine Package (`/packages/tsl-kit`)

- [ ] 50+ modules across all categories
- [ ] All modules implement `EngineModule` interface
- [ ] All modules have param schemas
- [ ] TypeScript strict mode, no `any`
- [ ] Compiled to ESM + CJS
- [ ] Tree-shakeable
- [ ] Versioned releases
- [ ] Comprehensive README
- [ ] JSDoc on all public APIs

### LABS Website (`/LABS/web`)

- [ ] 30+ interactive showcases
- [ ] Each LABS has:
  - [ ] Schema defining config + controls
  - [ ] Tweakpane UI
  - [ ] MDX documentation
  - [ ] Works on mobile
- [ ] Engine-first R3F canvas persists across routes
- [ ] Search functional (Pagefind)
- [ ] Deployed and live
- [ ] 60fps on mid-range devices

### Documentation

- [ ] Getting started guide
- [ ] API reference
- [ ] Porting guide (how to add modules)
- [ ] Architecture overview
- [ ] Example projects

### Testing

- [ ] Unit tests for utilities
- [ ] Integration tests for modules
- [ ] Playwright tests for LABS
- [ ] Performance benchmarks
- [ ] Visual regression tests

---

## 🚨 Risks & Mitigation

### Top Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Three.js r181 API changes** | Medium | High | Use transpiler, reference docs, test early |
| **Performance on low-end devices** | Medium | High | Quality presets, resolution scaling, profiling |
| **Scope creep** | High | High | Stick to roadmap, defer "nice-to-haves" |
| **Underestimated porting effort** | Medium | Medium | Buffer time per phase, track actuals |
| **Complex TSL conversions** | Medium | Medium | Start simple, iterate, use proven examples |

---

## 📞 Next Steps

1. **Review this README** ✅ (You're doing it!)
2. **Read the full spec:** `UNIFIED_ENGINE_PROPOSAL.md`
3. **Review the roadmap:** `IMPLEMENTATION_ROADMAP.md`
4. **Start Phase 0:** Setup & Foundation (Weeks 1-2)

---

## 📄 License

Engine modules will be ported from various sources. Check `RESOURCE_INVENTORY.md` for individual licenses. Target license for the engine package: **MIT** (where compatible).

---

## 👥 Team

- **Lead Developer:** TBD
- **Project Manager:** TBD
- **Designer:** TBD

---

## 📈 Status Updates

*This section will be updated weekly during implementation*

**Last Updated:** November 13, 2024  
**Current Phase:** Pre-Phase 0 (Planning Complete)  
**Next Milestone:** Begin Phase 0 - Setup & Foundation

---

## 🎉 Success Looks Like

**Engine:**
```ts
import { createEngineContext, registerAllEngineModules } from 'tsl-kit'

const engine = createEngineContext({ renderer, scene, camera })
registerAllEngineModules(engine)

// 50+ modules available
console.log(engine.listModules())

// High-level helpers
engine.createPBRScene()
engine.addFluidSimLayer()
engine.attachPostFXPipeline("cinematic")
```

**Website:**
- Persistent WebGPU canvas across all pages
- 30+ interactive demos showcasing every module
- Schema-driven controls (change params, see live updates)
- MDX docs explaining each technique
- Fast, responsive, mobile-friendly
- Deployed and accessible to everyone

---

**Let's build this! 🚀**



