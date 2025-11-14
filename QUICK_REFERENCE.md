# TSL-KIT Engine — Quick Reference Guide

> **Quick access to commands, workflows, and key information**

---

## 📁 Project Structure

```
root/
├── packages/tsl-kit/          # Engine package
├── apps/web/                  # Website
├── RESOURCES/                 # Source repositories
├── IMPLEMENTATION_PLAN_4PHASES.md
├── PHASE_1_TODO.md
├── PHASE_2_TODO.md
├── PHASE_3_TODO.md
├── PHASE_4_TODO.md
├── PROJECT_SUMMARY.md
└── QUICK_REFERENCE.md         # This file
```

---

## 🚀 Quick Start (After Phase 1)

```bash
# Clone repo
git clone <repo-url>
cd tsl-engine

# Install dependencies
pnpm install

# Build engine package
pnpm --filter @tsl-kit/engine build

# Start dev server
pnpm --filter web dev

# Open browser
open http://localhost:3000
```

---

## 📦 Common Commands

### Development
```bash
# Start all packages in dev mode
pnpm dev

# Start only website
pnpm --filter web dev

# Build engine package
pnpm --filter @tsl-kit/engine build

# Watch engine package
pnpm --filter @tsl-kit/engine dev
```

### Building
```bash
# Build everything
pnpm build

# Build engine only
pnpm --filter @tsl-kit/engine build

# Build website only
pnpm --filter web build
```

### Testing
```bash
# Run all tests
pnpm test

# Run unit tests
pnpm test:unit

# Run unit tests with UI
pnpm test:ui

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui

# Run tests with coverage
pnpm test:coverage
```

### Code Quality
```bash
# Lint all code
pnpm lint

# Format all code
pnpm format

# Check and fix issues
pnpm check

# Type check
pnpm typecheck
```

### Other
```bash
# Clean all build artifacts
pnpm clean

# Clean and reinstall
pnpm clean:all && pnpm install

# Generate OG images
pnpm --filter web generate-og

# Embed content for RAG
pnpm --filter web embed-content
```

---

## 🎯 Phase Checklist

### Phase 1: Foundation ✅
- [ ] Monorepo structure
- [ ] Dependencies installed
- [ ] Research complete
- [ ] PORT_MAPPING.md created
- [ ] CI/CD foundation

**Start**: [Phase 1 TODO](./PHASE_1_TODO.md)

### Phase 2: Core Engine ✅
- [ ] Core architecture
- [ ] Renderer factory
- [ ] 15 essential modules
- [ ] Persistent canvas
- [ ] Testing infrastructure

**Start**: [Phase 2 TODO](./PHASE_2_TODO.md)

### Phase 3: Module Library ✅
- [ ] 150+ modules ported
- [ ] LAB pages created
- [ ] 50+ presets
- [ ] Visual regression tests
- [ ] Performance optimized

**Start**: [Phase 3 TODO](./PHASE_3_TODO.md)

### Phase 4: Website & Polish ✅
- [ ] Content pipeline
- [ ] Admin dashboard
- [ ] AI assistants
- [ ] RAG knowledge base
- [ ] Production deployment

**Start**: [Phase 4 TODO](./PHASE_4_TODO.md)

---

## 🧩 Module Development

### Creating a New Module

1. **Create module file**
   ```typescript
   // packages/tsl-kit/src/modules/materials/my-material.ts
   import { z } from 'zod';
   import type { EngineModule } from '@tsl-kit/core/types';
   
   const MyMaterialSchema = z.object({
     color: z.string().default('#34d399'),
     intensity: z.number().min(0).max(1).default(0.5),
   });
   
   export const MyMaterial: EngineModule = {
     id: 'materials/my-material',
     meta: {
       id: 'materials/my-material',
       label: 'My Material',
       description: 'A custom material',
       category: 'Materials',
       tags: ['material', 'custom'],
     },
     caps: {
       kind: 'material',
       backends: ['webgpu', 'webgl'],
     },
     defaultParams: MyMaterialSchema.parse({}),
     schema: { zod: MyMaterialSchema },
     
     init: async (ctx, params) => {
       // Create material, geometry, mesh
     },
     
     mount: (ctx, params) => {
       // Add to scene
     },
     
     update: (ctx, dt, params) => {
       // Update animation
       return true; // Invalidate frame
     },
     
     unmount: (ctx) => {
       // Remove from scene
     },
     
     dispose: (ctx) => {
       // Clean up resources
     },
   };
   ```

2. **Register module**
   ```typescript
   // packages/tsl-kit/src/modules/index.ts
   import { MyMaterial } from './materials/my-material';
   import { moduleRegistry } from '../core/registry';
   
   export function registerAllModules() {
     moduleRegistry.register(MyMaterial);
     // ... other modules
   }
   ```

3. **Create LAB page**
   ```tsx
   // apps/web/LABS/materials/my-material/page.tsx
   'use client';
   
   import { useEffect } from 'react';
   import { useEngineStore } from '@/lib/store';
   
   export default function MyMaterialPage() {
     const selectModule = useEngineStore((s) => s.selectModule);
     
     useEffect(() => {
       selectModule('materials/my-material');
     }, [selectModule]);
     
     return (
       <div className="container mx-auto py-12">
         <h1>My Material</h1>
         <p>Description...</p>
       </div>
     );
   }
   ```

4. **Write tests**
   ```typescript
   // packages/tsl-kit/src/modules/materials/__tests__/my-material.test.ts
   import { describe, it, expect } from 'vitest';
   import { MyMaterial } from '../my-material';
   
   describe('MyMaterial', () => {
     it('should have correct id', () => {
       expect(MyMaterial.id).toBe('materials/my-material');
     });
     
     it('should have default params', () => {
       expect(MyMaterial.defaultParams).toMatchObject({
         color: '#34d399',
         intensity: 0.5,
       });
     });
   });
   ```

---

## 🎨 Porting Guidelines

### Porting a Module from Source Repo

1. **Identify source file** (use PORT_MAPPING.md)
2. **Copy to `ported/` directory**
   ```bash
   cp RESOURCES/REPOSITORIES/portfolio-main/src/utils/webgpu/materials/clearcoat.ts \
      packages/tsl-kit/ported/portfolio/clearcoat.ts
   ```

3. **Create adapter wrapper** (see module template above)
4. **Update import paths** (Three.js, types)
5. **Add Zod schema** for parameters
6. **Wrap in `EngineModule` interface**
7. **Register in module index**
8. **Create LAB page**
9. **Write visual regression test**
10. **Update documentation**

### Quality Checklist
- [ ] Visual parity with source (ΔE < 2)
- [ ] No TypeScript errors
- [ ] Schema defined and validated
- [ ] Lifecycle methods implemented
- [ ] Resources disposed properly
- [ ] LAB page created
- [ ] Tests passing
- [ ] Documented

---

## 🧪 Testing Workflows

### Unit Testing
```bash
# Run tests
pnpm test:unit

# Run in watch mode
pnpm test:unit --watch

# Run with UI
pnpm test:ui

# Run specific file
pnpm test:unit registry.test.ts
```

### E2E Testing
```bash
# Run E2E tests
pnpm test:e2e

# Run in UI mode
pnpm test:e2e:ui

# Run specific test
pnpm test:e2e canvas-persistence.spec.ts

# Debug mode
pnpm test:e2e --debug
```

### Visual Regression
```bash
# Capture golden images
pnpm test:visual --update-snapshots

# Run visual tests
pnpm test:visual

# View diff report
open playwright-report/index.html
```

---

## 🔧 Debugging

### Engine Debugging
```typescript
// Enable debug mode in store
useEngineStore.setState({ debug: { showStats: true } });

// Log module state
const runner = useEngineStore.getState().runner;
console.log('Current module:', runner.getCurrentModule());
console.log('State:', runner.getState());

// Check registry
import { moduleRegistry } from '@tsl-kit/core/registry';
console.log('All modules:', moduleRegistry.list());
console.log('Materials:', moduleRegistry.findByKind('material'));
```

### Browser DevTools
```javascript
// Access store from console
window.__ENGINE_STORE__ = useEngineStore.getState();

// Access Three.js scene
window.__THREE_SCENE__ = scene;

// Enable WebGPU validation
localStorage.setItem('webgpu-validation', 'true');
```

### Performance Profiling
```typescript
// Enable profiling
useEngineStore.setState({
  profiling: {
    enableProfiling: true,
    logFrameTimes: true,
    logMemoryUsage: true,
  },
});

// Check FPS
import { useFrame } from '@react-three/fiber';
useFrame((state) => {
  console.log('FPS:', 1 / state.clock.getDelta());
});
```

---

## 🌐 Development URLs

| Service | URL |
|---------|-----|
| Dev Server | http://localhost:3000 |
| Home | http://localhost:3000 |
| Portfolio | http://localhost:3000/portfolio |
| Blog | http://localhost:3000/blog |
| LABS | http://localhost:3000/labs |
| Admin | http://localhost:3000/admin |
| API Docs | http://localhost:3000/api-docs |

---

## 📝 Git Workflow

### Branches
- `main` — Production branch (protected)
- `develop` — Development branch
- `feature/*` — Feature branches
- `fix/*` — Bug fix branches
- `docs/*` — Documentation branches

### Commit Messages
```
<type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Examples:
feat(materials): add clearcoat PBR material
fix(particles): resolve memory leak in emitter
docs(readme): update installation instructions
```

### Pull Request Workflow
1. Create feature branch
2. Make changes
3. Write tests
4. Update docs
5. Commit changes
6. Push to remote
7. Create PR
8. Wait for CI
9. Request review
10. Merge after approval

---

## 🚀 Deployment

### Cloudflare Pages
```bash
# Build for production
pnpm build

# Deploy (automatic on push to main)
git push origin main

# Manual deploy
pnpm wrangler pages deploy apps/web/out --project-name=tsl-engine
```

### Vercel
```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

---

## 🔑 Environment Variables

### Required
```bash
# AI Models
OPENAI_API_KEY=sk-...

# Optional (for Phase 4)
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
GITHUB_APP_ID=...
GITHUB_APP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
NEXTAUTH_SECRET=...
NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=...
```

### Setup
1. Copy `.env.local.example` to `.env.local`
2. Fill in your keys
3. Restart dev server

---

## 📚 Documentation Links

### Project Docs
- [Implementation Plan](./IMPLEMENTATION_PLAN_4PHASES.md)
- [Project Summary](./PROJECT_SUMMARY.md)
- [Phase 1 TODO](./PHASE_1_TODO.md)
- [Phase 2 TODO](./PHASE_2_TODO.md)
- [Phase 3 TODO](./PHASE_3_TODO.md)
- [Phase 4 TODO](./PHASE_4_TODO.md)

### External Docs
- [Three.js Docs](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [R3F Docs](https://r3f.docs.pmnd.rs/)
- [WebGPU Fundamentals](https://webgpufundamentals.org/)
- [TSL Wiki](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)

---

## 🆘 Troubleshooting

### Common Issues

**Issue**: `Module not found: Can't resolve 'three'`
```bash
# Solution: Reinstall dependencies
pnpm install
```

**Issue**: WebGPU not working
```bash
# Check: Chrome/Edge with WebGPU flag enabled
chrome://flags/#enable-unsafe-webgpu
```

**Issue**: Hot reload not working
```bash
# Solution: Restart dev server
pnpm dev
```

**Issue**: TypeScript errors after adding module
```bash
# Solution: Rebuild engine package
pnpm --filter @tsl-kit/engine build
```

**Issue**: Tests failing
```bash
# Solution: Update snapshots
pnpm test:visual --update-snapshots
```

---

## 💡 Tips & Tricks

### Speed up development
```bash
# Use Turborepo cache
pnpm dev --force  # Skip cache

# Run only affected tests
pnpm test --changed

# Build in parallel
pnpm build --parallel
```

### Optimize performance
```typescript
// Use demand frameloop
<Canvas frameloop="demand" />

// Batch parameter updates
useEngineStore.setState((state) => ({
  ...state,
  params: { ...state.params, ...updates },
}));

// Dispose resources properly
useEffect(() => {
  return () => {
    material.dispose();
    geometry.dispose();
  };
}, []);
```

### Debug WebGPU
```javascript
// Enable validation layers
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice({
  requiredFeatures: ['chromium-experimental-timestamp-query'],
});

// Log GPU info
console.log('Adapter:', adapter);
console.log('Limits:', adapter.limits);
```

---

## 📞 Getting Help

### Resources
1. Check this guide
2. Read phase TODO for your current phase
3. Search documentation
4. Check GitHub issues
5. Ask in team chat

### Useful Commands
```bash
# Show all npm scripts
pnpm run

# Show workspace info
pnpm list --depth=0

# Check for outdated deps
pnpm outdated

# Update dependencies
pnpm update
```

---

**Happy coding! 🚀**

