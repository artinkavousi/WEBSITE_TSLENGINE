# Risk Register — WEBSITE v1.1 Initiative

This document tracks major risks, their impact, likelihood, mitigation strategies, and ownership. Update
continuously as discovery progresses through the four phases.

| ID | Risk Description | Impact | Likelihood | Phase(s) Affected | Mitigation / Contingency | Owner |
|----|------------------|--------|------------|-------------------|--------------------------|-------|
| R1 | WebGPU API changes or browser regressions delay stable support. | High | Medium | 2-4 | Maintain WebGL fallback parity; monitor browser release notes; automate nightly smoke tests. | Engine Lead |
| R2 | Insufficient performance on lower-tier GPUs when running advanced modules. | High | Medium | 3-4 | Implement adaptive quality controls, dynamic LOD, and presets; capture perf telemetry early. | Performance Eng. |
| R3 | Complexity of 150+ module backlog exceeds schedule. | High | High | 3 | Prioritise flagship modules, defer lower-priority ones, build tooling for rapid porting, add contractor support. | Product Lead |
| R4 | MaterialX bridge implementation diverges from Three.js roadmap. | Medium | Medium | 1-3 | Align with Three.js maintainers, design abstraction layer, prepare fallback import path. | Rendering Eng. |
| R5 | AI assistant misuse or security breach. | High | Medium | 1,4 | Implement sandboxed permissions, rate limiting, audit logging; security review before launch. | Platform Sec. |
| R6 | Content pipeline integration delays due to MDX/Contentlayer complexity. | Medium | Medium | 1,4 | Prototype during Phase 1, allocate dedicated content engineer, maintain fallback static pages. | Web Lead |
| R7 | Asset licensing or size constraints hamper deployment. | Medium | Low | 1-4 | Audit licenses, optimise assets (KTX2, Draco), enforce size budgets in CI. | Creative Dir. |
| R8 | Cross-team coordination gaps between engine and website squads. | Medium | Medium | 1-4 | Establish weekly syncs, shared backlog, and documented integration contracts. | Programme Mgmt. |
| R9 | Testing coverage insufficient for shader regressions. | High | Medium | 2-3 | Invest in golden image testing, shader linting, and automated diffing tools; enforce coverage thresholds. | QA Lead |
| R10 | Deployment pipeline or infra vendor limitations. | Medium | Low | 4 | Evaluate Vercel vs Cloudflare early; create infra ADR; rehearse rollback drills. | DevOps |

Document risk status (Open, Monitoring, Mitigated, Closed) and update mitigations as new information
arises. Reassess likelihood/impact at the end of each phase retrospective.
