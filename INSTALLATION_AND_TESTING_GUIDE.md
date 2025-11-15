# Installation and Testing Guide

**Phase 4 Section 1: Content Pipeline**  
**Date**: November 14, 2025

---

## 📦 Installation Steps

### Prerequisites

- Node.js 20+
- pnpm 9.15.0+
- Git

### Step 1: Install pnpm (if not already installed)

```bash
npm install -g pnpm@9.15.0
```

### Step 2: Install Dependencies

```bash
# Navigate to project root
cd C:/Users/ARTDESKTOP/Desktop/CODE/.website/WEBSITE_TSLENGINE

# Install all workspace dependencies
pnpm install
```

**Expected Output**:
```
Packages: +<number> packages added
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: ...
  Virtual store is at: node_modules/.pnpm

dependencies:
+ contentlayer2 0.5.3
+ next-contentlayer2 0.5.3
+ rehype-pretty-code 0.14.0
+ rehype-autolink-headings 7.1.0
+ rehype-slug 6.0.0
+ remark-gfm 4.0.0
(+ existing dependencies)
```

### Step 3: Build Engine Package

```bash
cd packages/tsl-kit
pnpm build
```

**Expected Output**:
```
> @tsl-kit/engine@0.1.0 build
> tsc

✓ TypeScript compiled successfully
```

### Step 4: Start Development Server

```bash
cd ../../apps/web
pnpm dev
```

**Expected Output**:
```
> web@0.1.0 dev
> next dev

Contentlayer config change detected. Updating type definitions and data...
Generated 10 documents in .contentlayer
✓ Contentlayer built successfully

   ▲ Next.js 15.5.6
   - Local:        http://localhost:3000
   - Network:      http://172.21.224.1:3000

 ✓ Starting...
 ✓ Ready in 3.2s
```

---

## 🧪 Testing Content Pipeline

### Test 1: Verify Contentlayer Build

**What to Check**:
- `.contentlayer/generated` directory created
- 10 posts generated
- Type definitions present

**Commands**:
```bash
# Check generated directory
ls -la .contentlayer/generated/

# Should show:
# - allPosts.json
# - Post/_index.json
# - types.ts
# - index.d.ts
```

**Expected Behavior**:
- ✅ Directory exists
- ✅ 10 post files in `Post/` subdirectory
- ✅ No build errors in console

### Test 2: Access Generated Content

**Create a Test Page** (temporary):

```typescript
// apps/web/app/content-test/page.tsx
import { allPosts } from 'contentlayer/generated';

export default function ContentTest() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Content Test</h1>
      <h2 className="mt-4">Posts: {allPosts.length}</h2>
      <ul className="mt-4 space-y-2">
        {allPosts.map((post) => (
          <li key={post._id}>
            <strong>{post.title}</strong>
            <br />
            Template: {post.templateId} | Style: {post.styleId}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Visit**: http://localhost:3000/content-test

**Expected Output**:
```
Content Test

Posts: 10

• Getting Started with WebGPU
  Template: HeroGlassWave | Style: neon
• Building GPU Particle Systems
  Template: ParticleSwarm | Style: neon
• Mastering TSL: Three Shading Language
  Template: GeometricShapes | Style: cinematic
...
```

### Test 3: Verify Template System

**Test Template Loader**:

```typescript
// apps/web/app/template-test/page.tsx
'use client';

import { listTemplates, getTemplateMetadata } from '@/templates';

export default function TemplateTest() {
  const templates = listTemplates();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Template Test</h1>
      <h2 className="mt-4">Templates: {templates.length}</h2>
      <ul className="mt-4 space-y-4">
        {templates.map((t) => (
          <li key={t.id} className="border p-4 rounded">
            <h3 className="font-bold">{t.label}</h3>
            <p className="text-sm text-gray-600">{t.description}</p>
            <p className="text-xs mt-2">Category: {t.category}</p>
            <p className="text-xs">Tags: {t.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Visit**: http://localhost:3000/template-test

**Expected Output**:
- ✅ Shows 5 templates
- ✅ Each has label, description, category, tags
- ✅ No console errors

### Test 4: Verify Style Tokens

**Test Style System**:

```typescript
// apps/web/app/style-test/page.tsx
'use client';

import { listStyles, getStyleTokens } from '@/lib/styles/tokens';

export default function StyleTest() {
  const styles = listStyles();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Style Test</h1>
      <h2 className="mt-4">Styles: {styles.length}</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {styles.map((styleId) => {
          const tokens = getStyleTokens(styleId);
          return (
            <div key={styleId} className="border p-4 rounded">
              <h3 className="font-bold capitalize">{styleId}</h3>
              <div className="mt-2 flex gap-2">
                {Object.entries(tokens.colors).map(([name, color]) => (
                  <div
                    key={name}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded"
                    title={name}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Visit**: http://localhost:3000/style-test

**Expected Output**:
- ✅ Shows 5 style themes
- ✅ Each shows color swatches
- ✅ Colors match token definitions

---

## 🔍 Troubleshooting

### Issue 1: Contentlayer Not Building

**Symptom**: No `.contentlayer` directory or build errors

**Possible Causes**:
- Dependencies not installed
- Invalid MDX frontmatter
- Missing required fields

**Solution**:
```bash
# Check for errors
pnpm dev

# Manually trigger build
npx contentlayer build

# Check MDX files for syntax errors
```

### Issue 2: Module Not Found Errors

**Symptom**: `Cannot find module '@/templates'`

**Solution**:
```bash
# Ensure TypeScript paths are configured
# Check tsconfig.json has:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./"]
    }
  }
}
```

### Issue 3: Template Dynamic Imports Fail

**Symptom**: `Cannot find module './HeroGlassWave.tsx'`

**Possible Cause**: Incorrect path in registry.json

**Solution**:
- Verify template files exist
- Check paths in `templates/registry.json`
- Ensure files have correct extensions

---

## ✅ Success Criteria

### Contentlayer
- [ ] `.contentlayer/generated` directory exists
- [ ] 10 posts generated successfully
- [ ] `allPosts` array accessible
- [ ] Type definitions correct

### Templates
- [ ] 5 templates listed
- [ ] Metadata loads correctly
- [ ] Dynamic imports work
- [ ] Components render without errors

### Styles
- [ ] 5 styles listed
- [ ] Tokens load correctly
- [ ] CSS variables convert properly
- [ ] Colors display correctly

### Integration
- [ ] No console errors
- [ ] WebGPU still works
- [ ] Existing pages still function
- [ ] Build completes successfully

---

## 📊 Performance Benchmarks

### Build Time
- **Contentlayer**: <5s for 10 posts
- **Next.js**: <30s cold, <5s cached
- **Total**: <35s initial build

### Runtime
- **Post List Load**: <100ms
- **Template Load**: <200ms
- **Style Application**: <50ms
- **Total TTI**: <1s

---

## 🚀 Next Steps After Testing

Once all tests pass:

1. ✅ **Mark Section 1 Complete**
2. 🔄 **Create Blog Pages** (Section 5)
   - `/app/blog/page.tsx` - Blog index
   - `/app/blog/[slug]/page.tsx` - Post page
3. 🎨 **Integrate Templates**
   - Load template per post
   - Pass scene props
   - Apply style tokens
4. 📝 **Test End-to-End**
   - Visit blog posts
   - Verify 3D backgrounds
   - Check styling
   - Test navigation

---

## 📞 Support

If you encounter issues:

1. Check console for errors
2. Verify file paths
3. Ensure dependencies installed
4. Review this guide's troubleshooting section
5. Check Phase 4 documentation

---

**Guide Version**: 1.0  
**Last Updated**: November 14, 2025  
**Status**: Ready for testing

