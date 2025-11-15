Perfect—here’s a **production-ready blueprint** for a **content-management pipeline** that’s:

* **Repo-based (MDX)** for full control + longevity
* **WebGPU/TSL + R3F + GSAP** for custom, animated article templates
* **AI-integrated** (UX Copilot + Builder Agent) to generate posts, variants, and PRs
* **Schema-driven** so the UI, templates, and agents all speak the same language

---

# 1) High-level architecture

* **Content**: Markdown/MDX files stored in Git (`/content/posts/*.mdx`) + JSON/YAML metadata (`/content/meta/*.json`).
* **Content runtime**: **Contentlayer** (or Velite) to type your MDX and expose it to Next.js.
* **Templates**: React components with **R3F (Three.js r180)** + **TSL** + **GSAP** timelines. Chosen per-post via frontmatter (`templateId`, `styleId`, `sceneProps`).
* **Admin**: `/admin` dashboard (protected). Two tabs: **Creative** (visual knobs) and **Dev** (build/tests/deploy).
* **AI**:

  * **UX Assistant** (in-page) for navigation/tweaks.
  * **Builder Agent** (admin) with tools: `draftPost`, `applyTemplate`, `deriveStyle`, `createAssets`, `openPR`, `triggerDeploy`, all **diff→confirm→PR**.
* **Search/comments/analytics**: Pagefind + Giscus + Cloudflare Analytics.
* **Hosting**: Cloudflare Pages or Vercel.
* **$0/offline**: WebLLM fallback for drafting.

---

# 2) Content schemas (single source of truth)

### Post (frontmatter in MDX)

```yaml
---
title: "Shaping Fluids with Sound"
slug: shaping-fluids-with-sound
date: 2025-10-12
tags: [webgpu, r3f, nodes, audio]
summary: "A node-based WebGPU exploration of audio-driven fluid motion."
templateId: "hero.glassWave.v1"
styleId: "emerald-dark-kinetic"
cover: "/og/shaping-fluids.png"
sceneProps:
  camera: { azimuth: 0.7, polar: 1.0, distance: 3.2 }
  lights: { hemi: 0.6, key: 1.2, rim: 0.4 }
  fx: { bloom: true, bloomStrength: 0.65 }
  shader: { hue: 155, emissivePulse: true, metalness: 0.2, roughness: 0.35 }
---
```

### Template registry (JSON; editable in Admin)

```json
{
  "id": "hero.glassWave.v1",
  "component": "@/templates/HeroGlassWave",
  "schema": {
    "shader.hue": { "type": "number", "min": 0, "max": 360, "default": 155 },
    "shader.emissivePulse": { "type": "boolean", "default": true },
    "fx.bloom": { "type": "boolean", "default": true },
    "fx.bloomStrength": { "type": "number", "min": 0, "max": 2, "step": 0.01, "default": 0.65 }
  },
  "gsapTracks": ["introFloat", "accentPulse"]
}
```

### Style token (variant)

```json
{
  "id": "emerald-dark-kinetic",
  "tokens": {
    "colors": { "primary": "#34d399", "bg": "#0b0f12", "text": "#d1d5db" },
    "motion": { "introDuration": 2.2, "easing": "expo.out", "pulseAmp": 0.45 }
  }
}
```

---

# 3) Contentlayer config (typed MDX)

```ts
// cms/contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug:  { type: 'string', required: true },
    date:  { type: 'date',   required: true },
    tags:  { type: 'list', of: { type: 'string' } },
    summary:{ type: 'string' },
    cover: { type: 'string' },
    templateId: { type: 'string', required: true },
    styleId:    { type: 'string', required: true },
    sceneProps: { type: 'json',   required: false }
  },
  computedFields: {
    url: { type: 'string', resolve: p => `/blog/${p.slug}` }
  }
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post]
})
```

---

# 4) R3F + WebGPU + TSL + GSAP template

```tsx
// templates/HeroGlassWave.tsx
'use client'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import gsap from 'gsap'
// TSL nodes (r180)
import { MeshStandardNodeMaterial, timerGlobal, sin, float, add, mul, color } from 'three/tsl'

type Props = {
  tokens: any
  sceneProps: {
    shader?: { hue?: number; emissivePulse?: boolean; metalness?: number; roughness?: number }
    fx?: { bloom?: boolean; bloomStrength?: number }
  }
}

export default function HeroGlassWave({ tokens, sceneProps }: Props) {
  const mesh = useRef<Mesh>(null!)

  const material = useMemo(() => {
    const hue = sceneProps?.shader?.hue ?? 155
    const hex = `hsl(${hue} 70% 60%)`
    const mat = new MeshStandardNodeMaterial()
    const t = timerGlobal()
    const pulse = add(float(0.5), mul(float(tokens.motion?.pulseAmp ?? 0.4), sin(mul(t, float(2.0)))))
    mat.colorNode = color(hex)
    mat.emissiveNode = (sceneProps?.shader?.emissivePulse ?? true) ? color(hex).mul(pulse) : color('#000')
    mat.roughness = sceneProps?.shader?.roughness ?? 0.35
    mat.metalness = sceneProps?.shader?.metalness ?? 0.2
    return mat
  }, [tokens, sceneProps])

  useEffect(() => {
    // GSAP intro
    gsap.fromTo(mesh.current.rotation, { x: 0.2, y: -0.3 }, { x: 0, y: 0, duration: tokens.motion?.introDuration ?? 2, ease: tokens.motion?.easing ?? 'power3.out' })
    gsap.fromTo(mesh.current.position, { z: -1 }, { z: 0, duration: 1.2, ease: 'expo.out', delay: 0.3 })
  }, [tokens])

  useFrame(() => {/* frameloop='demand' -> invalidate where you animate */})

  return (
    <mesh ref={mesh} material={material}>
      <icosahedronGeometry args={[1.1, 5]} />
    </mesh>
  )
}
```

---

# 5) Rendering a post page (template loader)

```tsx
// app/blog/[slug]/page.tsx
import { allPosts } from 'contentlayer/generated'
import dynamic from 'next/dynamic'
import styles from '@/styles/styles.json'           // registry of style tokens
import templates from '@/templates/registry.json'   // registry of templates

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(p => p.slug === params.slug)!
  const def = templates.find(t => t.id === post.templateId)!
  const Style = styles.find((s: any) => s.id === post.styleId)!
  const Template = dynamic(() => import(def.component), { ssr: false })

  return (
    <>
      <article className="prose prose-invert">
        <h1>{post.title}</h1>
        <p className="opacity-80">{post.summary}</p>
      </article>

      {/* 3D/animated hero bound to style tokens + scene props */}
      <Template tokens={Style.tokens} sceneProps={post.sceneProps} />
    </>
  )
}
```

---

# 6) Admin dashboard: schema-driven controls

* Reuse your **schema→Tweakpane** mapper to generate an editor for `templates/*.json`, `styles/*.json`, and per-post `sceneProps`.
* Add **“Suggest settings”** button → calls Builder Agent to propose tuned values for the current template/style based on the post text and assets.
* Preset library: export/import JSON; attach to post.

---

# 7) AI Builder Agent (key tools)

**API route** `/api/builder` with tools (all **dry-run → diff → confirm → PR**):

```ts
// lib/agents/admin-tools.ts
import { tool } from 'ai'
import { z } from 'zod'
import { readFile, writeFile } from 'node:fs/promises'
import { slugify, diffPatch, openPR } from './git-utils'
import { renderOg } from './og-renderer' // server-side three-canvas or Satori

export const draftPost = tool(
  'draftPost',
  z.object({
    title: z.string(),
    brief: z.string(),
    tags: z.array(z.string()).optional(),
    templateId: z.string().default('hero.glassWave.v1'),
    styleId: z.string().default('emerald-dark-kinetic')
  }),
  async ({ title, brief, tags, templateId, styleId }) => {
    const slug = slugify(title)
    const mdxPath = `content/posts/${slug}.mdx`
    const body = `---\ntitle: "${title}"\nslug: ${slug}\ndate: ${new Date().toISOString()}\ntags: ${JSON.stringify(tags ?? [])}\nsummary: ""\ncover: "/og/${slug}.png"\ntemplateId: "${templateId}"\nstyleId: "${styleId}"\nsceneProps: {}\n---\n\n${brief}\n`
    return diffPatch(mdxPath, body)                // return diff, don't write yet
  }
)

export const applyTemplate = tool(
  'applyTemplate',
  z.object({ slug: z.string(), sceneProps: z.record(z.any()) }),
  async ({ slug, sceneProps }) => {
    const path = `content/posts/${slug}.mdx`
    const src = await readFile(path, 'utf8')
    const updated = src.replace(/sceneProps:\s*{[^}]*}/, `sceneProps: ${JSON.stringify(sceneProps, null, 2)}`)
    return diffPatch(path, updated)
  }
)

export const createAssets = tool(
  'createAssets',
  z.object({ slug: z.string() }),
  async ({ slug }) => {
    const og = await renderOg({ slug })           // make /public/og/${slug}.png
    return diffPatch(`/public/og/${slug}.png`, og) // binary diff/summary
  }
)

export const confirmAndPR = tool(
  'confirmAndPR',
  z.object({ diffs: z.array(z.string()), title: z.string() }),
  async ({ diffs, title }) => {
    // write files, create branch, open PR; return PR URL
    return openPR({ diffs, title })
  }
)
```

**Flow** (from `/admin/new` wizard):

1. `draftPost` → review diff → **Confirm**
2. `applyTemplate` (auto-suggest `sceneProps` from content) → **Confirm**
3. `createAssets` (OG image, thumbnails) → **Confirm**
4. `confirmAndPR` → opens PR; CI runs build + Pagefind; preview URL appears.

> For **$0/offline**, route the same toolflow through **WebLLM** with a reduced model for drafting text; keep code/PR steps on server.

---

# 8) MDX authoring with live 3D blocks

Let authors drop interactive blocks inside the post:

```tsx
// components/mdx/blocks.tsx
'use client'
import dynamic from 'next/dynamic'
export const LiveDemo = dynamic(() => import('@/templates/HeroGlassWave'), { ssr: false })
```

```mdx
Here’s the live node-based glow:

<LiveDemo tokens={{ colors: { primary: '#34d399' }, motion: { introDuration: 1.6 } }} sceneProps={{ shader: { hue: 155 } }} />
```

---

# 9) Build & index

* **Pagefind** after build to index HTML (including MDX).
* **Images**: optimize to WebP/PNG; heavy 3D under `/public/models` with Draco/meshoptimizer + KTX2 textures.
* **CI**: typecheck → lint → unit (Vitest) → E2E (Playwright: post page renders + template mounts + search works) → build → deploy (preview) → comment PR with links.

---

# 10) Minimal commands

```bash
# Core deps
pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing gsap
pnpm add contentlayer next-contentlayer
pnpm add ai zod             # Vercel AI SDK style tools
pnpm add @mlc-ai/web-llm    # optional offline fallback
pnpm add tweakpane @tweakpane/plugin-essentials

# Build/search
pnpm add -D pagefind vitest playwright biome
```

---

## What I can generate next (just say the word)

* **/admin** dashboard (schema editor + “Suggest settings” button)
* **HeroGlassWave** + a second template (e.g., **MorphoGrid**) with its own GSAP tracks
* **Builder Agent** API with the tool handlers above, plus PR wiring stubs
* **Contentlayer** config + seed posts + Pagefind postbuild script
* **Playwright** tests for the acceptance checklist

If you want this as a drop-in **starter repo**, say **“generate the AI-CMS kit”** and I’ll output all files in one pass.


Perfect—here’s a **production-ready blueprint** for a **content-management pipeline** that’s:

* **Repo-based (MDX)** for full control + longevity
* **WebGPU/TSL + R3F + GSAP** for custom, animated article templates
* **AI-integrated** (UX Copilot + Builder Agent) to generate posts, variants, and PRs
* **Schema-driven** so the UI, templates, and agents all speak the same language

---

# 1) High-level architecture

* **Content**: Markdown/MDX files stored in Git (`/content/posts/*.mdx`) + JSON/YAML metadata (`/content/meta/*.json`).
* **Content runtime**: **Contentlayer** (or Velite) to type your MDX and expose it to Next.js.
* **Templates**: React components with **R3F (Three.js r180)** + **TSL** + **GSAP** timelines. Chosen per-post via frontmatter (`templateId`, `styleId`, `sceneProps`).
* **Admin**: `/admin` dashboard (protected). Two tabs: **Creative** (visual knobs) and **Dev** (build/tests/deploy).
* **AI**:

  * **UX Assistant** (in-page) for navigation/tweaks.
  * **Builder Agent** (admin) with tools: `draftPost`, `applyTemplate`, `deriveStyle`, `createAssets`, `openPR`, `triggerDeploy`, all **diff→confirm→PR**.
* **Search/comments/analytics**: Pagefind + Giscus + Cloudflare Analytics.
* **Hosting**: Cloudflare Pages or Vercel.
* **$0/offline**: WebLLM fallback for drafting.

---

# 2) Content schemas (single source of truth)

### Post (frontmatter in MDX)

```yaml
---
title: "Shaping Fluids with Sound"
slug: shaping-fluids-with-sound
date: 2025-10-12
tags: [webgpu, r3f, nodes, audio]
summary: "A node-based WebGPU exploration of audio-driven fluid motion."
templateId: "hero.glassWave.v1"
styleId: "emerald-dark-kinetic"
cover: "/og/shaping-fluids.png"
sceneProps:
  camera: { azimuth: 0.7, polar: 1.0, distance: 3.2 }
  lights: { hemi: 0.6, key: 1.2, rim: 0.4 }
  fx: { bloom: true, bloomStrength: 0.65 }
  shader: { hue: 155, emissivePulse: true, metalness: 0.2, roughness: 0.35 }
---
```

### Template registry (JSON; editable in Admin)

```json
{
  "id": "hero.glassWave.v1",
  "component": "@/templates/HeroGlassWave",
  "schema": {
    "shader.hue": { "type": "number", "min": 0, "max": 360, "default": 155 },
    "shader.emissivePulse": { "type": "boolean", "default": true },
    "fx.bloom": { "type": "boolean", "default": true },
    "fx.bloomStrength": { "type": "number", "min": 0, "max": 2, "step": 0.01, "default": 0.65 }
  },
  "gsapTracks": ["introFloat", "accentPulse"]
}
```

### Style token (variant)

```json
{
  "id": "emerald-dark-kinetic",
  "tokens": {
    "colors": { "primary": "#34d399", "bg": "#0b0f12", "text": "#d1d5db" },
    "motion": { "introDuration": 2.2, "easing": "expo.out", "pulseAmp": 0.45 }
  }
}
```

---

# 3) Contentlayer config (typed MDX)

```ts
// cms/contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug:  { type: 'string', required: true },
    date:  { type: 'date',   required: true },
    tags:  { type: 'list', of: { type: 'string' } },
    summary:{ type: 'string' },
    cover: { type: 'string' },
    templateId: { type: 'string', required: true },
    styleId:    { type: 'string', required: true },
    sceneProps: { type: 'json',   required: false }
  },
  computedFields: {
    url: { type: 'string', resolve: p => `/blog/${p.slug}` }
  }
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post]
})
```

---

# 4) R3F + WebGPU + TSL + GSAP template

```tsx
// templates/HeroGlassWave.tsx
'use client'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import gsap from 'gsap'
// TSL nodes (r180)
import { MeshStandardNodeMaterial, timerGlobal, sin, float, add, mul, color } from 'three/tsl'

type Props = {
  tokens: any
  sceneProps: {
    shader?: { hue?: number; emissivePulse?: boolean; metalness?: number; roughness?: number }
    fx?: { bloom?: boolean; bloomStrength?: number }
  }
}

export default function HeroGlassWave({ tokens, sceneProps }: Props) {
  const mesh = useRef<Mesh>(null!)

  const material = useMemo(() => {
    const hue = sceneProps?.shader?.hue ?? 155
    const hex = `hsl(${hue} 70% 60%)`
    const mat = new MeshStandardNodeMaterial()
    const t = timerGlobal()
    const pulse = add(float(0.5), mul(float(tokens.motion?.pulseAmp ?? 0.4), sin(mul(t, float(2.0)))))
    mat.colorNode = color(hex)
    mat.emissiveNode = (sceneProps?.shader?.emissivePulse ?? true) ? color(hex).mul(pulse) : color('#000')
    mat.roughness = sceneProps?.shader?.roughness ?? 0.35
    mat.metalness = sceneProps?.shader?.metalness ?? 0.2
    return mat
  }, [tokens, sceneProps])

  useEffect(() => {
    // GSAP intro
    gsap.fromTo(mesh.current.rotation, { x: 0.2, y: -0.3 }, { x: 0, y: 0, duration: tokens.motion?.introDuration ?? 2, ease: tokens.motion?.easing ?? 'power3.out' })
    gsap.fromTo(mesh.current.position, { z: -1 }, { z: 0, duration: 1.2, ease: 'expo.out', delay: 0.3 })
  }, [tokens])

  useFrame(() => {/* frameloop='demand' -> invalidate where you animate */})

  return (
    <mesh ref={mesh} material={material}>
      <icosahedronGeometry args={[1.1, 5]} />
    </mesh>
  )
}
```

---

# 5) Rendering a post page (template loader)

```tsx
// app/blog/[slug]/page.tsx
import { allPosts } from 'contentlayer/generated'
import dynamic from 'next/dynamic'
import styles from '@/styles/styles.json'           // registry of style tokens
import templates from '@/templates/registry.json'   // registry of templates

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(p => p.slug === params.slug)!
  const def = templates.find(t => t.id === post.templateId)!
  const Style = styles.find((s: any) => s.id === post.styleId)!
  const Template = dynamic(() => import(def.component), { ssr: false })

  return (
    <>
      <article className="prose prose-invert">
        <h1>{post.title}</h1>
        <p className="opacity-80">{post.summary}</p>
      </article>

      {/* 3D/animated hero bound to style tokens + scene props */}
      <Template tokens={Style.tokens} sceneProps={post.sceneProps} />
    </>
  )
}
```

---

# 6) Admin dashboard: schema-driven controls

* Reuse your **schema→Tweakpane** mapper to generate an editor for `templates/*.json`, `styles/*.json`, and per-post `sceneProps`.
* Add **“Suggest settings”** button → calls Builder Agent to propose tuned values for the current template/style based on the post text and assets.
* Preset library: export/import JSON; attach to post.

---

# 7) AI Builder Agent (key tools)

**API route** `/api/builder` with tools (all **dry-run → diff → confirm → PR**):

```ts
// lib/agents/admin-tools.ts
import { tool } from 'ai'
import { z } from 'zod'
import { readFile, writeFile } from 'node:fs/promises'
import { slugify, diffPatch, openPR } from './git-utils'
import { renderOg } from './og-renderer' // server-side three-canvas or Satori

export const draftPost = tool(
  'draftPost',
  z.object({
    title: z.string(),
    brief: z.string(),
    tags: z.array(z.string()).optional(),
    templateId: z.string().default('hero.glassWave.v1'),
    styleId: z.string().default('emerald-dark-kinetic')
  }),
  async ({ title, brief, tags, templateId, styleId }) => {
    const slug = slugify(title)
    const mdxPath = `content/posts/${slug}.mdx`
    const body = `---\ntitle: "${title}"\nslug: ${slug}\ndate: ${new Date().toISOString()}\ntags: ${JSON.stringify(tags ?? [])}\nsummary: ""\ncover: "/og/${slug}.png"\ntemplateId: "${templateId}"\nstyleId: "${styleId}"\nsceneProps: {}\n---\n\n${brief}\n`
    return diffPatch(mdxPath, body)                // return diff, don't write yet
  }
)

export const applyTemplate = tool(
  'applyTemplate',
  z.object({ slug: z.string(), sceneProps: z.record(z.any()) }),
  async ({ slug, sceneProps }) => {
    const path = `content/posts/${slug}.mdx`
    const src = await readFile(path, 'utf8')
    const updated = src.replace(/sceneProps:\s*{[^}]*}/, `sceneProps: ${JSON.stringify(sceneProps, null, 2)}`)
    return diffPatch(path, updated)
  }
)

export const createAssets = tool(
  'createAssets',
  z.object({ slug: z.string() }),
  async ({ slug }) => {
    const og = await renderOg({ slug })           // make /public/og/${slug}.png
    return diffPatch(`/public/og/${slug}.png`, og) // binary diff/summary
  }
)

export const confirmAndPR = tool(
  'confirmAndPR',
  z.object({ diffs: z.array(z.string()), title: z.string() }),
  async ({ diffs, title }) => {
    // write files, create branch, open PR; return PR URL
    return openPR({ diffs, title })
  }
)
```

**Flow** (from `/admin/new` wizard):

1. `draftPost` → review diff → **Confirm**
2. `applyTemplate` (auto-suggest `sceneProps` from content) → **Confirm**
3. `createAssets` (OG image, thumbnails) → **Confirm**
4. `confirmAndPR` → opens PR; CI runs build + Pagefind; preview URL appears.

> For **$0/offline**, route the same toolflow through **WebLLM** with a reduced model for drafting text; keep code/PR steps on server.

---

# 8) MDX authoring with live 3D blocks

Let authors drop interactive blocks inside the post:

```tsx
// components/mdx/blocks.tsx
'use client'
import dynamic from 'next/dynamic'
export const LiveDemo = dynamic(() => import('@/templates/HeroGlassWave'), { ssr: false })
```

```mdx
Here’s the live node-based glow:

<LiveDemo tokens={{ colors: { primary: '#34d399' }, motion: { introDuration: 1.6 } }} sceneProps={{ shader: { hue: 155 } }} />
```

---

# 9) Build & index

* **Pagefind** after build to index HTML (including MDX).
* **Images**: optimize to WebP/PNG; heavy 3D under `/public/models` with Draco/meshoptimizer + KTX2 textures.
* **CI**: typecheck → lint → unit (Vitest) → E2E (Playwright: post page renders + template mounts + search works) → build → deploy (preview) → comment PR with links.

---

# 10) Minimal commands

```bash
# Core deps
pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing gsap
pnpm add contentlayer next-contentlayer
pnpm add ai zod             # Vercel AI SDK style tools
pnpm add @mlc-ai/web-llm    # optional offline fallback
pnpm add tweakpane @tweakpane/plugin-essentials

# Build/search
pnpm add -D pagefind vitest playwright biome
```

---

## What I can generate next (just say the word)

* **/admin** dashboard (schema editor + “Suggest settings” button)
* **HeroGlassWave** + a second template (e.g., **MorphoGrid**) with its own GSAP tracks
* **Builder Agent** API with the tool handlers above, plus PR wiring stubs
* **Contentlayer** config + seed posts + Pagefind postbuild script
* **Playwright** tests for the acceptance checklist

If you want this as a drop-in **starter repo**, say **“generate the AI-CMS kit”** and I’ll output all files in one pass.
