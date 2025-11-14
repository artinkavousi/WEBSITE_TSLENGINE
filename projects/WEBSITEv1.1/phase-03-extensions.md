# Phase 3 — Engine Feature Expansion & Module Library

Phase 3 focuses on turning the minimal engine into the full-featured TSL/WebGPU toolkit described in
the proposals. The objective is to deliver production-ready modules, resource management, preset
systems, and developer tooling that match or exceed the referenced specifications.

## 1. Module Porting & Development
- Prioritise module families (materials, lighting, postFX, particles, fields, physics, geometry,
  animation, math) based on launch requirements and demo needs.
- For each module:
  - Port shader logic from RESOURCES examples or write new TSL nodes consistent with guide §3.4.
  - Define parameter schema (decorators or Zod) and default presets.
  - Implement lifecycle hooks (`init`, `mount`, `update`, `dispose`) with robust resource management.
  - Create docs entries and LABS showcase configuration (for Phase 4 consumption).
- Establish naming conventions and folder structure mirroring taxonomy in proposalchat.

## 2. Resource & Preset Infrastructure
- Implement GPU resource cache (buffers, textures, pipelines) with reference counting and disposal.
- Add async loaders for HDR/KTX2 textures, GLTF/GLB with Draco/meshopt, and MaterialX documents.
- Build preset manager capable of saving/loading JSON snapshots, diffing params, and integrating with
  Orchestrator UI.
- Introduce adaptive quality controls and device capability checks using research from Phase 1.

## 3. Debugging & Telemetry
- Add internal debug visualisers (G-buffer, light volumes, particle bounds) accessible via developer
  overlay or query string flags.
- Integrate frame timing metrics and GPU profiler hooks (WebGPU timestamp queries where available).
- Provide logging utilities with verbosity levels for engine diagnostics.

## 4. Testing & Validation
- Expand unit tests to cover module lifecycle transitions, schema generation, and preset serialization.
- Implement snapshot/golden testing for shader outputs or rendered frames (Playwright + WebGPU capture).
- Add performance regression tests with thresholds for frame time and memory usage on representative
  hardware.
- Validate fallback behaviour for modules that support only WebGL or require specific extensions.

## 5. Documentation & Developer Experience
- Generate API documentation (TypeDoc) for engine core and modules.
- Produce how-to guides for creating new modules, importing MaterialX, and extending the registry.
- Document presets and include visual thumbnails in LABS metadata.
- Prepare sample scripts demonstrating programmatic engine usage outside the website.

## Deliverables & Exit Criteria
- Module registry populated with priority catalog (target ≥ 30 flagship modules, expanding to full list
  via ongoing workstreams).
- Resource manager ensures no leaks; engine passes stress tests and sustained runtime scenarios.
- Preset system functional with save/load/import/export flows.
- Debugging tools and documentation available for internal teams.
- Comprehensive automated test suite covering modules, rendering paths, and presets.

Completion of Phase 3 confirms the engine is production-ready and unlocks the broader website and content
experience work in Phase 4.
