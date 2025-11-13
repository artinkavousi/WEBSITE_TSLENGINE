# TSL/WebGPU Engine — Complete Documentation Index

> **Navigation guide for all planning documents**  
> **Version:** 2.0  
> **Last Updated:** November 13, 2025

---

## 📍 Start Here

### 🎯 **[proposalchat.md](../proposalchat.md)** ← **READ THIS FIRST**
Complete unified proposal (80+ pages covering everything)

### 📖 **[README.md](./README.md)**
Overview + quick links

### 📊 **[SUMMARY.md](./SUMMARY.md)**
Executive summary (scope, timeline, success criteria)

---

## 📚 Core Documents

### 1. Main Proposal
**File:** `TSLENGINE/proposalchat.md`  
**Size:** ~80 pages  
**Contains:**
- Complete architecture overview
- Module taxonomy (150+ modules across 16 categories)
- Direct-port strategy
- Implementation phases (7 phases, 14 weeks)
- AI assistants (UX Copilot + Builder Agent)
- RAG integration
- Testing strategy
- Deployment guide

**Read if:** You want the complete blueprint

---

### 2. Executive Summary
**File:** `FINAL_UNIFIED_PLAN/SUMMARY.md`  
**Size:** ~10 pages  
**Contains:**
- Quick reference for entire project
- Scope at a glance
- Timeline overview
- Success criteria
- Key innovations
- Progress tracking

**Read if:** You want a high-level overview

---

### 3. Getting Started
**File:** `FINAL_UNIFIED_PLAN/implementation/QUICK_START.md`  
**Size:** ~8 pages  
**Contains:**
- Scaffold monorepo in 30 minutes
- Port your first module
- Test and verify
- Next steps

**Read if:** You're ready to start coding

---

## 📋 Reference Documents (`/docs`)

### 4. Original Website Spec
**File:** `docs/WEBSITEv1_engine_first_website_tsl_web_gpu_pipeline_unified_final_spec_v_1.md`  
**Size:** ~50 pages  
**Contains:**
- Engine-first website architecture
- Persistent canvas pattern
- MDX CMS integration
- AI assistants design
- Tech stack details
- Rollout plan (7 steps)

**Read if:** You want details on the website architecture

---

### 5. Engine Vision
**File:** `docs/engine_vision.md`  
**Size:** ~100 pages  
**Contains:**
- Complete module map (300+ items across 16 categories)
- Every possible feature and system
- Namespace organization
- Folder structure
- Extensibility patterns

**Read if:** You want to see the full engine scope

---

### 6. Engine Architecture
**File:** `docs/engine_artitechture.md`  
**Size:** ~80 pages  
**Contains:**
- TypeScript skeleton code
- Core types and interfaces
- Module registry system
- Example implementations
- Usage patterns

**Read if:** You want to understand the engine's internal structure

---

### 7. LAB Showcase Implementation
**File:** `docs/LAB showcase implementation.md`  
**Size:** ~60 pages  
**Contains:**
- LABS structure (1:1 with engine modules)
- Schema-driven design
- Engine-first R3F/Drei pattern
- MDX integration
- Contentlayer setup

**Read if:** You want to understand the LABS/web architecture

---

### 8. Original Proposal
**File:** `docs/original_proposal.md`  
**Size:** ~20 pages  
**Contains:**
- Direct-port philosophy
- Resource analysis requirements
- Three.js r181 migration notes
- Port mapping strategy

**Read if:** You want to understand the porting approach

---

## 📅 Planning Documents (`/planning`)

### 9. Implementation Roadmap
**File:** `planning/IMPLEMENTATION_ROADMAP.md`  
**Size:** ~100 pages  
**Contains:**
- 7 phases, 14 weeks, detailed breakdown
- Day-by-day tasks
- Acceptance criteria per phase
- Effort estimates
- Progress tracking
- Risk management

**Read if:** You need a detailed work plan

**Structure:**
- Phase 1: Foundation (Week 1-2)
- Phase 2: Admin Dashboard (Week 2-3)
- Phase 3: MDX CMS (Week 3-4)
- Phase 4: Module Porting (Week 4-8) ← **Largest phase**
- Phase 5: UX Copilot (Week 9)
- Phase 6: Builder Agent (Week 10)
- Phase 7: RAG + Search (Week 11-12)
- Phase 8: Polish + Launch (Week 13-14)

---

### 10. Port Mapping
**File:** `planning/PORT_MAPPING.md`  
**Size:** ~60 pages  
**Contains:**
- Complete source → target mapping
- 150+ module mappings
- File paths (source and target)
- Priority levels
- Dependencies
- Effort estimates

**Read if:** You need to know where each module comes from

**Categories:**
- Noise & Math (30 modules)
- SDF & Fields (15 modules)
- Post-Processing (25 modules)
- Materials (60 modules)
- Particles (20 modules)
- Physics/Sims (15 modules)
- Lighting (10 modules)
- Geometry (10 modules)
- Utilities (25 modules)

---

### 11. Resource Inventory
**File:** `planning/RESOURCE_INVENTORY.md`  
**Size:** ~90 pages  
**Contains:**
- Complete catalog of available modules
- Per-project breakdown (28 projects)
- Quality ratings (⭐ system)
- Effort estimates
- Licensing notes
- Dependency map

**Read if:** You want to see what's available to port

**Sources:**
1. fragments-boilerplate-main (26 modules, ⭐⭐⭐⭐⭐)
2. portfolio-main (22 modules, ⭐⭐⭐⭐⭐)
3. tsl-textures-main (54 modules, ⭐⭐⭐⭐⭐)
4. TSLwebgpuExamples (18 modules across multiple projects, ⭐⭐⭐⭐)

---

### 12. Testing Strategy
**File:** `planning/TESTING_STRATEGY.md`  
**Size:** ~40 pages  
**Contains:**
- Unit tests (Vitest)
- Integration tests (Playwright)
- Visual regression (golden images, ΔE < 2)
- Performance tests (60 FPS @ 1080p)
- Acceptance tests (A1-A8)
- CI/CD pipeline setup

**Read if:** You need to understand testing requirements

---

### 13. Deployment Guide
**File:** `planning/DEPLOYMENT_GUIDE.md`  
**Size:** ~30 pages  
**Contains:**
- $0 hosting path (Cloudflare Pages)
- Alternative: Vercel Hobby
- CI/CD setup (GitHub Actions)
- Secrets management (ENV vars)
- SSL, DNS, analytics setup
- Production checklist

**Read if:** You're ready to deploy

---

## 🛠️ Implementation Guides (`/implementation`)

### 14. Quick Start Guide
**File:** `implementation/QUICK_START.md`  
**Size:** ~8 pages  
**Contains:**
- Scaffold monorepo (30 minutes)
- Port first module (1 hour)
- Test and verify (30 minutes)
- Next steps

**Read if:** You want to start immediately

---

### 15. Module Porting Guide
**File:** `implementation/MODULE_PORTING_GUIDE.md`  
**Size:** ~15 pages  
**Contains:**
- Step-by-step porting process
- Example walkthrough
- Common issues and solutions
- Best practices
- Testing checklist

**Read if:** You're porting modules from RESOURCES

---

### 16. Schema-Driven Design
**File:** `implementation/SCHEMA_DRIVEN_DESIGN.md`  
**Size:** ~20 pages  
**Contains:**
- Zod schemas → Tweakpane bridge
- MDX integration
- Engine config binding
- Example implementations
- Advanced patterns

**Read if:** You're implementing admin dashboard or controls

---

### 17. AI Assistant Setup
**File:** `implementation/AI_ASSISTANT_SETUP.md`  
**Size:** ~25 pages  
**Contains:**
- UX Copilot implementation
- Builder Agent implementation
- Tool definitions
- GitHub App setup
- PR workflow
- Rate limiting and security

**Read if:** You're implementing AI assistants

---

## 📖 Resource Links (`/resources`)

### 18. Three.js r181 Knowledge
**File:** `resources/THREE_R181_KNOWLEDGE.md`  
**Size:** ~15 pages  
**Contains:**
- Official Three.js r181 docs links
- TSL wiki links
- WebGPU example links
- Migration guides
- Community resources

**Read if:** You need Three.js r181 references

---

### 19. WebGPU References
**File:** `resources/WEBGPU_REFERENCES.md`  
**Size:** ~12 pages  
**Contains:**
- WebGPU fundamentals
- WGSL syntax guide
- Best practices
- Performance tips
- Browser compatibility

**Read if:** You need WebGPU references

---

### 20. Example Projects
**File:** `resources/EXAMPLE_PROJECTS.md`  
**Size:** ~25 pages  
**Contains:**
- Annotated list of all 28 source projects
- Quality ratings
- What to port from each
- Key features
- Links to source files

**Read if:** You want to explore source projects

---

## 🗺️ Navigation by Task

### I want to understand the project
1. Read [SUMMARY.md](./SUMMARY.md) (10 min)
2. Read [proposalchat.md](../proposalchat.md) (2 hours)
3. Skim [engine_vision.md](./docs/engine_vision.md) (30 min)

### I want to start coding
1. Read [QUICK_START.md](./implementation/QUICK_START.md) (15 min)
2. Follow the guide (2 hours)
3. Reference [MODULE_PORTING_GUIDE.md](./implementation/MODULE_PORTING_GUIDE.md) as needed

### I want to see the detailed plan
1. Read [IMPLEMENTATION_ROADMAP.md](./planning/IMPLEMENTATION_ROADMAP.md) (1 hour)
2. Review [RESOURCE_INVENTORY.md](./planning/RESOURCE_INVENTORY.md) (30 min)
3. Check [PORT_MAPPING.md](./planning/PORT_MAPPING.md) for specific modules

### I want to understand the website
1. Read [WEBSITEv1...md](./docs/WEBSITEv1_engine_first_website_tsl_web_gpu_pipeline_unified_final_spec_v_1.md) (1 hour)
2. Read [LAB showcase implementation.md](./docs/LAB showcase implementation.md) (30 min)
3. Reference [SCHEMA_DRIVEN_DESIGN.md](./implementation/SCHEMA_DRIVEN_DESIGN.md) for controls

### I want to understand the engine
1. Read [engine_vision.md](./docs/engine_vision.md) (1 hour)
2. Read [engine_artitechture.md](./docs/engine_artitechture.md) (1 hour)
3. Reference [MODULE_PORTING_GUIDE.md](./implementation/MODULE_PORTING_GUIDE.md) for implementation

### I want to set up AI assistants
1. Read [AI_ASSISTANT_SETUP.md](./implementation/AI_ASSISTANT_SETUP.md) (1 hour)
2. Follow UX Copilot setup (2 hours)
3. Follow Builder Agent setup (3 hours)

### I want to deploy
1. Read [DEPLOYMENT_GUIDE.md](./planning/DEPLOYMENT_GUIDE.md) (30 min)
2. Set up CI/CD (2 hours)
3. Deploy to Cloudflare Pages (1 hour)

---

## 📊 Document Statistics

| Category | Files | Total Pages | Est. Read Time |
|----------|-------|-------------|----------------|
| Core | 3 | ~100 | 3 hours |
| Reference | 5 | ~310 | 8 hours |
| Planning | 5 | ~320 | 8 hours |
| Implementation | 4 | ~68 | 2 hours |
| Resources | 3 | ~52 | 1.5 hours |
| **TOTAL** | **20** | **~850** | **22.5 hours** |

---

## 🎯 Recommended Reading Order

### For Project Lead / Technical Architect
1. **[SUMMARY.md](./SUMMARY.md)** (overview)
2. **[proposalchat.md](../proposalchat.md)** (complete blueprint)
3. **[IMPLEMENTATION_ROADMAP.md](./planning/IMPLEMENTATION_ROADMAP.md)** (execution plan)
4. **[RESOURCE_INVENTORY.md](./planning/RESOURCE_INVENTORY.md)** (what's available)

**Total:** ~4 hours reading

### For Developer Starting Phase 1
1. **[SUMMARY.md](./SUMMARY.md)** (context)
2. **[QUICK_START.md](./implementation/QUICK_START.md)** (get started)
3. **[engine_artitechture.md](./docs/engine_artitechture.md)** (structure)
4. **[MODULE_PORTING_GUIDE.md](./implementation/MODULE_PORTING_GUIDE.md)** (how to port)

**Total:** ~2 hours reading + 2 hours doing

### For Developer Starting Phase 4 (Module Porting)
1. **[PORT_MAPPING.md](./planning/PORT_MAPPING.md)** (source → target)
2. **[RESOURCE_INVENTORY.md](./planning/RESOURCE_INVENTORY.md)** (source details)
3. **[MODULE_PORTING_GUIDE.md](./implementation/MODULE_PORTING_GUIDE.md)** (process)
4. **[THREE_R181_KNOWLEDGE.md](./resources/THREE_R181_KNOWLEDGE.md)** (reference)

**Total:** ~2.5 hours reading

### For Developer Starting Phase 5-6 (AI Assistants)
1. **[AI_ASSISTANT_SETUP.md](./implementation/AI_ASSISTANT_SETUP.md)** (implementation)
2. **[proposalchat.md](../proposalchat.md)** (sections 8-9, assistants design)
3. **[WEBSITEv1...md](./docs/WEBSITEv1_engine_first_website_tsl_web_gpu_pipeline_unified_final_spec_v_1.md)** (section 8, assistants)

**Total:** ~2 hours reading

---

## 🔍 Quick Reference

### Key Files by Size

**Largest (80+ pages):**
- proposalchat.md (~80 pages) — Complete proposal
- IMPLEMENTATION_ROADMAP.md (~100 pages) — Detailed roadmap
- engine_vision.md (~100 pages) — Full module map
- RESOURCE_INVENTORY.md (~90 pages) — Source catalog

**Medium (30-60 pages):**
- engine_artitechture.md (~80 pages) — TS architecture
- LAB showcase implementation.md (~60 pages) — LABS structure
- PORT_MAPPING.md (~60 pages) — Module mappings
- WEBSITEv1...md (~50 pages) — Website spec
- TESTING_STRATEGY.md (~40 pages) — Testing plan
- DEPLOYMENT_GUIDE.md (~30 pages) — Deploy guide

**Smallest (<30 pages):**
- SUMMARY.md (~10 pages) — Executive summary
- QUICK_START.md (~8 pages) — Getting started
- MODULE_PORTING_GUIDE.md (~15 pages) — Porting guide
- SCHEMA_DRIVEN_DESIGN.md (~20 pages) — Schema design
- AI_ASSISTANT_SETUP.md (~25 pages) — AI setup
- THREE_R181_KNOWLEDGE.md (~15 pages) — Three.js links
- WEBGPU_REFERENCES.md (~12 pages) — WebGPU links
- EXAMPLE_PROJECTS.md (~25 pages) — Project list
- original_proposal.md (~20 pages) — Original proposal

---

## 📱 Mobile-Friendly Reading

For reading on mobile devices, recommended order by length:

**Short (< 20 pages):**
1. SUMMARY.md
2. QUICK_START.md
3. WEBGPU_REFERENCES.md
4. THREE_R181_KNOWLEDGE.md
5. MODULE_PORTING_GUIDE.md
6. original_proposal.md

**Medium (20-60 pages):**
1. SCHEMA_DRIVEN_DESIGN.md
2. AI_ASSISTANT_SETUP.md
3. EXAMPLE_PROJECTS.md
4. DEPLOYMENT_GUIDE.md
5. TESTING_STRATEGY.md
6. WEBSITEv1...md

**Long (60+ pages):**
1. LAB showcase implementation.md
2. PORT_MAPPING.md
3. proposalchat.md
4. engine_artitechture.md
5. RESOURCE_INVENTORY.md
6. engine_vision.md
7. IMPLEMENTATION_ROADMAP.md

---

**Ready to start? → [QUICK_START.md](./implementation/QUICK_START.md)**

