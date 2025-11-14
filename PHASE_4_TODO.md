# Phase 4: Website, UI & Polish — Detailed TODO

**Duration**: 3-4 weeks  
**Status**: Awaiting Phase 3 Completion  
**Goal**: Build website pages, AI assistants, admin dashboard, and production deployment

---

## 📋 Overview

Phase 4 focuses on:
- Complete content pipeline with MDX and templates
- Admin dashboard with schema-driven UI
- AI assistants (UX Copilot + Builder Agent)
- RAG knowledge base
- All website pages and navigation
- Comments, search, and analytics
- SEO optimization
- Production deployment
- Final polish and launch

**Exit Criteria**:
- ✅ All website pages complete
- ✅ AI assistants working
- ✅ Admin dashboard functional
- ✅ Content pipeline operational
- ✅ RAG search working
- ✅ SEO complete
- ✅ Deployed to production
- ✅ All acceptance criteria met

---

## 📝 Section 1: Content Pipeline & MDX

### 1.1 Contentlayer Configuration

**File**: `apps/web/contentlayer.config.ts`

- [ ] **Install dependencies**
  ```bash
  pnpm add contentlayer2 next-contentlayer2
  pnpm add -D rehype-pretty-code rehype-autolink-headings rehype-slug remark-gfm
  ```

- [ ] **Create configuration**
  ```typescript
  import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
  import rehypePrettyCode from 'rehype-pretty-code';
  import rehypeAutolinkHeadings from 'rehype-autolink-headings';
  import rehypeSlug from 'rehype-slug';
  import remarkGfm from 'remark-gfm';
  
  export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: 'posts/**/*.mdx',
    contentType: 'mdx',
    fields: {
      title: { type: 'string', required: true },
      description: { type: 'string', required: true },
      date: { type: 'date', required: true },
      published: { type: 'boolean', default: true },
      tags: { type: 'list', of: { type: 'string' } },
      templateId: { type: 'string', required: true },
      styleId: { type: 'string', required: false },
      sceneProps: { type: 'json', required: false },
    },
    computedFields: {
      slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.replace('posts/', ''),
      },
      url: {
        type: 'string',
        resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('posts/', '')}`,
      },
    },
  }));
  
  export const Project = defineDocumentType(() => ({
    name: 'Project',
    filePathPattern: 'projects/**/*.mdx',
    contentType: 'mdx',
    fields: {
      title: { type: 'string', required: true },
      description: { type: 'string', required: true },
      date: { type: 'date', required: true },
      published: { type: 'boolean', default: true },
      tags: { type: 'list', of: { type: 'string' } },
      featured: { type: 'boolean', default: false },
      thumbnail: { type: 'string' },
      templateId: { type: 'string', required: true },
      styleId: { type: 'string', required: false },
      sceneProps: { type: 'json', required: false },
    },
    computedFields: {
      slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.replace('projects/', ''),
      },
      url: {
        type: 'string',
        resolve: (doc) => `/portfolio/${doc._raw.flattenedPath.replace('projects/', '')}`,
      },
    },
  }));
  
  export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post, Project],
    mdx: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypePrettyCode, { theme: 'github-dark' }],
      ],
    },
  });
  ```

- [ ] **Configure Next.js**
  ```javascript
  // next.config.js
  const { withContentlayer } = require('next-contentlayer2');
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    // ... existing config
  };
  
  module.exports = withContentlayer(nextConfig);
  ```

- [ ] **Test contentlayer build**
  ```bash
  pnpm dev  # Should build contentlayer automatically
  ```

### 1.2 Template System

**File**: `apps/web/templates/registry.json`

- [ ] **Create template registry**
  ```json
  {
    "HeroGlassWave": {
      "component": "./HeroGlassWave.tsx",
      "label": "Hero Glass Wave",
      "description": "Glass sphere with wave distortion",
      "schemaKeys": ["camera", "lights", "fx", "shader"],
      "thumbnail": "/og/hero-glass-wave.png"
    },
    "ParticleSwarm": {
      "component": "./ParticleSwarm.tsx",
      "label": "Particle Swarm",
      "description": "Interactive particle field with forces",
      "schemaKeys": ["camera", "lights", "particles", "forces"],
      "thumbnail": "/og/particle-swarm.png"
    },
    "FluidCanvas": {
      "component": "./FluidCanvas.tsx",
      "label": "Fluid Canvas",
      "description": "2D fluid simulation background",
      "schemaKeys": ["fluid", "colors"],
      "thumbnail": "/og/fluid-canvas.png"
    },
    "GeometricShapes": {
      "component": "./GeometricShapes.tsx",
      "label": "Geometric Shapes",
      "description": "Animated SDF shapes with raymarching",
      "schemaKeys": ["camera", "sdf", "colors"],
      "thumbnail": "/og/geometric-shapes.png"
    },
    "EmissiveGrid": {
      "component": "./EmissiveGrid.tsx",
      "label": "Emissive Grid",
      "description": "Neon grid with glow and pulse",
      "schemaKeys": ["camera", "grid", "glow"],
      "thumbnail": "/og/emissive-grid.png"
    }
  }
  ```

**File**: `apps/web/templates/index.ts`

- [ ] **Create template loader**
  ```typescript
  import registry from './registry.json';
  
  export async function loadTemplate(templateId: string) {
    const template = registry[templateId];
    if (!template) {
      throw new Error(`Template "${templateId}" not found`);
    }
    
    const module = await import(template.component);
    return module.default || module;
  }
  
  export function getTemplateMetadata(templateId: string) {
    return registry[templateId];
  }
  
  export function listTemplates() {
    return Object.keys(registry).map((id) => ({
      id,
      ...registry[id],
    }));
  }
  ```

**Files**: `apps/web/templates/*.tsx`

- [ ] **Create HeroGlassWave template**
  ```tsx
  'use client';
  
  import { useRef } from 'react';
  import { useFrame } from '@react-three/fiber';
  import { PerspectiveCamera, Sphere } from '@react-three/drei';
  import { useGSAP } from '@gsap/react';
  import gsap from 'gsap';
  
  export default function HeroGlassWave({ sceneProps }) {
    const { camera, lights, fx, shader } = sceneProps || {};
    const sphereRef = useRef();
    
    useGSAP(() => {
      gsap.from(sphereRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
      });
    }, []);
    
    useFrame((state, dt) => {
      if (sphereRef.current) {
        sphereRef.current.rotation.y += dt * 0.2;
      }
    });
    
    return (
      <>
        <PerspectiveCamera
          makeDefault
          fov={camera?.fov || 45}
          position={camera?.position || [0, 2, 5]}
        />
        
        <ambientLight intensity={lights?.ambient || 0.5} />
        <directionalLight
          position={lights?.directional?.position || [5, 5, 5]}
          intensity={lights?.directional?.intensity || 1}
        />
        
        <Sphere ref={sphereRef} args={[1, 64, 64]}>
          <meshPhysicalMaterial
            color={shader?.baseColor || '#34d399'}
            transmission={shader?.transmission || 0.95}
            roughness={shader?.roughness || 0.05}
            metalness={shader?.metalness || 0}
            clearcoat={shader?.clearcoat || 1}
          />
        </Sphere>
      </>
    );
  }
  ```

- [ ] **Create ParticleSwarm template**
- [ ] **Create FluidCanvas template**
- [ ] **Create GeometricShapes template**
- [ ] **Create EmissiveGrid template**

### 1.3 Style Token System

**File**: `apps/web/lib/styles/tokens.ts`

- [ ] **Define style presets**
  ```typescript
  export const styleTokens = {
    neon: {
      colors: {
        primary: '#00ffcc',
        secondary: '#ff00ff',
        accent: '#ffcc00',
        background: '#0a0a0a',
      },
      motion: {
        duration: 'fast',
        easing: 'ease-in-out',
      },
    },
    cinematic: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#f5f5f5',
        accent: '#ff4444',
        background: '#0a0a0a',
      },
      motion: {
        duration: 'slow',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    // ... more styles
  };
  
  export function getStyleTokens(styleId: string) {
    return styleTokens[styleId] || styleTokens.neon;
  }
  ```

### 1.4 Example Content

**File**: `apps/web/content/posts/example-post.mdx`

- [ ] **Seed 10 example posts**
  ```mdx
  ---
  title: "Exploring WebGPU Particles"
  description: "A deep dive into GPU-accelerated particle systems"
  date: 2025-11-13
  tags: ["webgpu", "particles", "tutorial"]
  templateId: "ParticleSwarm"
  styleId: "neon"
  sceneProps:
    camera:
      fov: 45
      position: [0, 2, 5]
    lights:
      ambient: 0.5
      directional:
        position: [5, 5, 5]
        intensity: 1
    particles:
      count: 50000
      size: 1.5
      color: "#00ffcc"
    forces:
      - type: "vortex"
        strength: 2.0
  ---
  
  # Exploring WebGPU Particles
  
  In this post, we'll explore advanced GPU particle systems...
  
  ## Introduction
  
  WebGPU enables...
  ```

---

## 🎛️ Section 2: Admin Dashboard & Schema-Driven UI

### 2.1 Schema Definitions

**File**: `apps/web/lib/admin/schemas.ts`

- [ ] **Define schemas**
  ```typescript
  import { z } from 'zod';
  
  export const CreativeSchema = z.object({
    material: z.object({
      baseColor: z.string().default('#34d399'),
      metalness: z.number().min(0).max(1).default(0.2),
      roughness: z.number().min(0).max(1).default(0.35),
      emissive: z.boolean().default(true),
      emissiveIntensity: z.number().min(0).max(10).default(1),
    }),
    postfx: z.object({
      bloom: z.boolean().default(true),
      bloomStrength: z.number().min(0).max(2).default(0.65),
      bloomRadius: z.number().min(0).max(1).default(0.4),
      vignette: z.boolean().default(true),
      vignetteIntensity: z.number().min(0).max(1).default(0.5),
      chromaticAberration: z.boolean().default(false),
      caOffset: z.number().min(0).max(0.1).default(0.01),
    }),
    camera: z.object({
      fov: z.number().min(30).max(90).default(45),
      position: z.tuple([z.number(), z.number(), z.number()]).default([0, 2, 5]),
      autoRotate: z.boolean().default(false),
      autoRotateSpeed: z.number().min(0).max(10).default(1),
    }),
    lighting: z.object({
      ambient: z.number().min(0).max(2).default(0.5),
      directionalIntensity: z.number().min(0).max(5).default(1),
      directionalColor: z.string().default('#ffffff'),
    }),
  });
  
  export const DevSchema = z.object({
    renderer: z.object({
      backend: z.enum(['auto', 'webgpu', 'webgl']).default('auto'),
      maxFPS: z.number().int().min(30).max(144).default(60),
      pixelRatio: z.number().min(0.5).max(2).default(1),
    }),
    debug: z.object({
      showStats: z.boolean().default(false),
      showNormals: z.boolean().default(false),
      showWireframe: z.boolean().default(false),
      showBoundingBoxes: z.boolean().default(false),
    }),
    profiling: z.object({
      enableProfiling: z.boolean().default(false),
      logFrameTimes: z.boolean().default(false),
      logMemoryUsage: z.boolean().default(false),
    }),
  });
  
  export type CreativeConfig = z.infer<typeof CreativeSchema>;
  export type DevConfig = z.infer<typeof DevSchema>;
  ```

### 2.2 Tweakpane Bridge

**File**: `apps/web/lib/admin/schema-pane.ts`

- [ ] **Implement schema → Tweakpane bridge**
  ```typescript
  import { Pane } from 'tweakpane';
  import { zodToJsonSchema } from 'zod-to-json-schema';
  import type { z } from 'zod';
  
  export function createSchemaPane(
    schema: z.ZodObject<any>,
    state: any,
    onChange: (path: string, value: any) => void
  ): Pane {
    const pane = new Pane({ title: 'Controls' });
    const jsonSchema = zodToJsonSchema(schema);
    
    // Recursively build controls
    buildControls(pane, '', jsonSchema.properties, state, onChange);
    
    return pane;
  }
  
  function buildControls(
    parent: any,
    prefix: string,
    properties: any,
    state: any,
    onChange: (path: string, value: any) => void
  ) {
    for (const [key, def] of Object.entries(properties)) {
      const path = prefix ? `${prefix}.${key}` : key;
      const value = getNestedValue(state, path);
      
      if (def.type === 'object') {
        // Create folder
        const folder = parent.addFolder({ title: key });
        buildControls(folder, path, def.properties, state, onChange);
      } else {
        // Create control
        const params = { [key]: value };
        const binding = parent.addBinding(params, key, getBindingOptions(def));
        
        binding.on('change', (ev) => {
          onChange(path, ev.value);
        });
      }
    }
  }
  
  function getBindingOptions(def: any) {
    const options: any = {};
    
    if (def.type === 'number') {
      options.min = def.minimum ?? 0;
      options.max = def.maximum ?? 100;
      options.step = def.multipleOf ?? 0.01;
    } else if (def.type === 'boolean') {
      // Checkbox (default)
    } else if (def.type === 'string' && def.format === 'color') {
      options.view = 'color';
    } else if (def.enum) {
      options.options = Object.fromEntries(def.enum.map((v) => [v, v]));
    }
    
    return options;
  }
  
  function getNestedValue(obj: any, path: string): any {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current === undefined || current === null) return undefined;
      current = current[key];
    }
    return current;
  }
  ```

### 2.3 Admin Dashboard Page

**File**: `apps/web/app/admin/page.tsx`

- [ ] **Create admin dashboard**
  ```tsx
  'use client';
  
  import { useEffect, useRef } from 'react';
  import { useEngineStore } from '@/lib/store';
  import { createSchemaPane } from '@/lib/admin/schema-pane';
  import { CreativeSchema, DevSchema } from '@/lib/admin/schemas';
  
  export default function AdminPage() {
    const creativePaneRef = useRef<any>(null);
    const devPaneRef = useRef<any>(null);
    
    const creativeConfig = useEngineStore((s) => s.creativeConfig);
    const devConfig = useEngineStore((s) => s.devConfig);
    const setParam = useEngineStore((s) => s.setParam);
    const savePreset = useEngineStore((s) => s.savePreset);
    const loadPreset = useEngineStore((s) => s.loadPreset);
    
    useEffect(() => {
      if (!creativePaneRef.current) {
        const pane = createSchemaPane(
          CreativeSchema,
          creativeConfig,
          (path, value) => setParam(`creative.${path}`, value)
        );
        creativePaneRef.current = pane;
      }
      
      if (!devPaneRef.current) {
        const pane = createSchemaPane(
          DevSchema,
          devConfig,
          (path, value) => setParam(`dev.${path}`, value)
        );
        devPaneRef.current = pane;
      }
      
      return () => {
        creativePaneRef.current?.dispose();
        devPaneRef.current?.dispose();
      };
    }, []);
    
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Creative Controls</h2>
            <div id="creative-pane" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Developer Controls</h2>
            <div id="dev-pane" />
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Presets</h2>
          <button onClick={() => savePreset('my-preset')}>Save Preset</button>
          <button onClick={() => loadPreset('my-preset')}>Load Preset</button>
        </div>
      </div>
    );
  }
  ```

---

## 🤖 Section 3: AI Assistants

### 3.1 UX Copilot (Public Assistant)

**File**: `apps/web/app/api/ux-assistant/route.ts`

- [ ] **Create API route**
  ```typescript
  import { streamText, tool } from 'ai';
  import { openai } from '@ai-sdk/openai';
  import { z } from 'zod';
  
  const uxTools = {
    navigate: tool({
      description: 'Navigate to a page',
      parameters: z.object({ path: z.string() }),
      execute: async ({ path }) => {
        return { success: true, path };
      },
    }),
    
    setParam: tool({
      description: 'Set a parameter value',
      parameters: z.object({ key: z.string(), value: z.any() }),
      execute: async ({ key, value }) => {
        return { success: true, key, value };
      },
    }),
    
    loadModule: tool({
      description: 'Load a different module/scene',
      parameters: z.object({ id: z.string() }),
      execute: async ({ id }) => {
        return { success: true, moduleId: id };
      },
    }),
    
    togglePostFX: tool({
      description: 'Toggle a post-processing effect',
      parameters: z.object({ name: z.string(), enabled: z.boolean() }),
      execute: async ({ name, enabled }) => {
        return { success: true, effect: name, enabled };
      },
    }),
  };
  
  export async function POST(req: Request) {
    const { messages } = await req.json();
    
    const result = streamText({
      model: openai('gpt-4-turbo'),
      messages,
      tools: uxTools,
      system: `You are a helpful UX copilot for a WebGPU engine website. You can help users navigate, explore modules, and control the experience. Be concise and helpful.`,
    });
    
    return result.toDataStreamResponse();
  }
  ```

**File**: `apps/web/components/AssistantClient.tsx`

- [ ] **Create chat widget**
  ```tsx
  'use client';
  
  import { useChat } from 'ai/react';
  import { useState } from 'react';
  
  export function AssistantClient() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit } = useChat({
      api: '/api/ux-assistant',
    });
    
    return (
      <>
        {/* Floating button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-500 p-4 text-white shadow-lg"
        >
          💬
        </button>
        
        {/* Chat panel */}
        {isOpen && (
          <div className="fixed bottom-20 right-4 z-50 w-96 rounded-lg bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">UX Copilot</h3>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>
            
            <div className="mb-4 h-64 overflow-y-auto">
              {messages.map((m) => (
                <div key={m.id} className="mb-2">
                  <strong>{m.role === 'user' ? 'You' : 'Assistant'}:</strong> {m.content}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit}>
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="w-full rounded border p-2"
              />
            </form>
          </div>
        )}
      </>
    );
  }
  ```

- [ ] **Add to layout**
  ```tsx
  // apps/web/app/layout.tsx
  import { AssistantClient } from '@/components/AssistantClient';
  
  export default function RootLayout({ children }) {
    return (
      <html>
        <body>
          <ThreeRoot />
          <UiOverlay>{children}</UiOverlay>
          <AssistantClient />
        </body>
      </html>
    );
  }
  ```

### 3.2 Builder Agent (Admin-Only)

**File**: `apps/web/app/api/builder/route.ts`

- [ ] **Create API route with admin auth**
- [ ] **Implement `draftPost` tool**
- [ ] **Implement `applyTemplate` tool**
- [ ] **Implement `createAssets` tool**
- [ ] **Implement `confirmAndPR` tool**

**File**: `apps/web/components/AdminAgentPanel.tsx`

- [ ] **Create admin agent UI**
- [ ] **Add diff preview**
- [ ] **Add confirmation dialog**
- [ ] **Add audit log viewer**

---

## 🔍 Section 4: RAG & Knowledge Base

### 4.1 Vector Store Setup

**Choice**: Supabase pgvector OR Cloudflare Vectorize

- [ ] **Set up vector store**
- [ ] **Create embeddings table**
- [ ] **Configure API endpoints**

### 4.2 Embedding Script

**File**: `apps/web/scripts/embed-content.ts`

- [ ] **Implement content embedder**
  ```typescript
  import { embed } from '@ai-sdk/openai';
  import { supabase } from '@/lib/supabase';
  
  async function embedContent() {
    const docs = [
      ...await loadMDXFiles('content/'),
      ...await loadShaders('lib/shaders/'),
      ...await loadScenes('scenes/'),
    ];
    
    for (const doc of docs) {
      const chunks = splitIntoChunks(doc.content, 512);
      const embeddings = await embed(chunks);
      await storeEmbeddings(doc.path, chunks, embeddings);
    }
  }
  ```

- [ ] **Add script to package.json**
- [ ] **Run initial embedding**

### 4.3 Retrieval Function

**File**: `apps/web/lib/ai/rag.ts`

- [ ] **Implement retrieval**
  ```typescript
  export async function retrieveContext(query: string, scope?: string) {
    const embedding = await embed(query);
    const results = await supabase
      .rpc('match_documents', {
        query_embedding: embedding,
        match_threshold: 0.78,
        match_count: 5,
        scope_prefix: scope,
      });
    
    return results.data.map((r) => ({
      content: r.content,
      path: r.path,
      similarity: r.similarity,
    }));
  }
  ```

- [ ] **Integrate into assistants**

---

## 🌐 Section 5: Website Pages & Navigation

### 5.1 Core Pages

- [ ] **Home page** (`app/page.tsx`)
  - Hero with live demo
  - Feature highlights
  - CTA to explore

- [ ] **About page** (`app/about/page.tsx`)
  - Project overview
  - Technology stack
  - Team/credits

- [ ] **Portfolio page** (`app/portfolio/page.tsx`)
  - Project grid
  - Filter by tags
  - 3D preview cards

- [ ] **Blog index** (`app/blog/page.tsx`)
  - Post list
  - Search
  - Filter by tags

- [ ] **Blog post** (`app/blog/[slug]/page.tsx`)
  - MDX rendering
  - Template mounting
  - Reading progress
  - Table of contents
  - Comments

- [ ] **LABS index** (already exists from Phase 2)
- [ ] **LABS category pages** (already exist from Phases 2-3)
- [ ] **404 page** (`app/not-found.tsx`)

### 5.2 Navigation

**File**: `apps/web/components/ui/Navbar.tsx`

- [ ] **Create navbar**
  - Logo
  - Links (Home, Portfolio, Blog, LABS, Admin)
  - Search trigger
  - Theme toggle

**File**: `apps/web/components/ui/Footer.tsx`

- [ ] **Create footer**
  - Links
  - Social
  - Copyright

### 5.3 Search & Discovery

- [ ] **Integrate Pagefind**
  ```bash
  pnpm add -D pagefind
  ```

- [ ] **Add postbuild script**
  ```json
  {
    "scripts": {
      "build": "next build && npx pagefind --site ./out"
    }
  }
  ```

**File**: `apps/web/components/ui/SearchDialog.tsx`

- [ ] **Create search UI**
  - Keyboard shortcut (Cmd+K)
  - Search input
  - Results list
  - Navigation

---

## 💬 Section 6: Comments & Community

### 6.1 Giscus Integration

- [ ] **Set up GitHub Discussions**
- [ ] **Get Giscus config**

**File**: `apps/web/components/Comments.tsx`

- [ ] **Create Comments component**
  ```tsx
  'use client';
  
  import Giscus from '@giscus/react';
  
  export function Comments({ slug }: { slug: string }) {
    return (
      <Giscus
        repo={process.env.NEXT_PUBLIC_GISCUS_REPO!}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
        category="General"
        categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        theme="dark"
      />
    );
  }
  ```

- [ ] **Add to post pages**

---

## 📊 Section 7: SEO & Metadata

### 7.1 Meta Tags

**File**: `apps/web/app/layout.tsx`

- [ ] **Add global metadata**
  ```tsx
  export const metadata = {
    title: {
      default: 'TSL-KIT Engine',
      template: '%s | TSL-KIT Engine',
    },
    description: 'WebGPU-powered engine with 150+ modules',
    openGraph: {
      title: 'TSL-KIT Engine',
      description: 'WebGPU-powered engine with 150+ modules',
      url: 'https://tsl-engine.com',
      siteName: 'TSL-KIT Engine',
      images: ['/og/default.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'TSL-KIT Engine',
      description: 'WebGPU-powered engine with 150+ modules',
      images: ['/og/default.png'],
    },
  };
  ```

**File**: `apps/web/app/blog/[slug]/page.tsx`

- [ ] **Add dynamic metadata per post**

### 7.2 OG Images

**File**: `apps/web/scripts/generate-og-images.ts`

- [ ] **Create OG image generator**
  - Use Playwright to screenshot scenes
  - Save to `/public/og/`

### 7.3 Sitemap & Robots

**File**: `apps/web/app/sitemap.ts`

- [ ] **Generate sitemap**

**File**: `apps/web/app/robots.ts`

- [ ] **Configure robots.txt**

---

## 📈 Section 8: Analytics & Monitoring

### 8.1 Cloudflare Analytics

**File**: `apps/web/app/layout.tsx`

- [ ] **Add analytics beacon**
  ```tsx
  {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
    <script
      defer
      src='https://static.cloudflareinsights.com/beacon.min.js'
      data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
    />
  )}
  ```

### 8.2 Error Tracking

- [ ] **Set up Sentry (optional)**
- [ ] **Add error boundaries**

### 8.3 Performance Monitoring

**File**: `apps/web/lib/vitals.ts`

- [ ] **Track Web Vitals**
  ```typescript
  import { onCLS, onFID, onLCP } from 'web-vitals';
  
  export function reportWebVitals() {
    onCLS(console.log);
    onFID(console.log);
    onLCP(console.log);
  }
  ```

---

## 🚀 Section 9: Deployment & CI/CD

### 9.1 GitHub Actions Workflows

**File**: `.github/workflows/deploy.yml`

- [ ] **Create deployment workflow**
  ```yaml
  name: Deploy
  
  on:
    push:
      branches: [main]
  
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: pnpm/action-setup@v2
          with:
            version: 9
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: 'pnpm'
        
        - run: pnpm install --frozen-lockfile
        - run: pnpm build
        - run: npx pagefind --site ./apps/web/out
        
        - uses: cloudflare/pages-action@v1
          with:
            apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
            accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
            projectName: tsl-engine
            directory: ./apps/web/out
  ```

### 9.2 Cloudflare Pages Setup

- [ ] **Connect GitHub repo**
- [ ] **Configure build settings**
  - Build command: `pnpm build`
  - Output directory: `apps/web/out`
- [ ] **Add environment variables**
- [ ] **Test deployment**

### 9.3 Custom Domain (Optional)

- [ ] **Configure custom domain**
- [ ] **Set up HTTPS**
- [ ] **Configure security headers**

---

## ✨ Section 10: Polish & Launch

### 10.1 Final Testing

- [ ] **Run full test suite**
  - Unit tests
  - Integration tests
  - Visual regression tests
  - Performance tests

- [ ] **Browser testing**
  - Chrome (WebGPU)
  - Edge (WebGPU)
  - Firefox (WebGL fallback)
  - Safari (WebGL fallback)

- [ ] **Device testing**
  - Desktop (1080p, 1440p, 4K)
  - Tablet
  - Mobile (performance mode)

### 10.2 Accessibility

- [ ] **ARIA labels**
- [ ] **Keyboard navigation**
- [ ] **Focus management**
- [ ] **Screen reader testing**
- [ ] **Color contrast check**

### 10.3 Performance Audit

- [ ] **Lighthouse audit**
  - Performance ≥90
  - Accessibility ≥90
  - Best Practices ≥90
  - SEO ≥90

- [ ] **WebGPU performance check**
  - 60 FPS @ 1080p
  - Post-FX ≤5ms
  - No memory leaks

### 10.4 Documentation

- [ ] **Update README**
- [ ] **Create getting started guide**
- [ ] **Create API documentation**
- [ ] **Create video demos**

### 10.5 Launch

- [ ] **Final deployment**
- [ ] **Smoke test production**
- [ ] **Announce launch**

---

## ✅ Phase 4 Completion Checklist

### Content & Templates
- [ ] Contentlayer configured
- [ ] 5 templates created
- [ ] 10+ posts seeded
- [ ] Style tokens defined

### Admin Dashboard
- [ ] Schemas defined
- [ ] Tweakpane bridge working
- [ ] Admin page functional
- [ ] Presets working

### AI Assistants
- [ ] UX Copilot deployed
- [ ] Builder Agent deployed
- [ ] Tools working
- [ ] Rate limiting active

### RAG
- [ ] Vector store set up
- [ ] Content embedded
- [ ] Retrieval working
- [ ] Citations working

### Website
- [ ] All pages complete
- [ ] Navigation working
- [ ] Search working
- [ ] Comments working

### SEO & Analytics
- [ ] Meta tags complete
- [ ] OG images generated
- [ ] Sitemap generated
- [ ] Analytics tracking

### Deployment
- [ ] CI/CD working
- [ ] Deployed to production
- [ ] Custom domain configured
- [ ] HTTPS enabled

### Polish
- [ ] All tests passing
- [ ] Accessibility compliant
- [ ] Performance optimized
- [ ] Documentation complete

---

## 🎉 Final Launch Checklist

- [ ] All acceptance criteria met (see main plan)
- [ ] 150+ modules working
- [ ] Persistent canvas validated
- [ ] AI assistants functional
- [ ] RAG search working
- [ ] All pages deployed
- [ ] SEO complete
- [ ] Analytics tracking
- [ ] Zero production errors
- [ ] 60 FPS @ 1080p
- [ ] Documentation complete
- [ ] Ready for public launch

---

## 🚦 Project Sign-Off

**Criteria for launch:**
1. ✅ All phases complete
2. ✅ All acceptance criteria met
3. ✅ All tests passing
4. ✅ Production deployment stable
5. ✅ Documentation complete
6. ✅ Team approval

**Sign-off**: ________________  
**Date**: ________________

---

**🎉 PROJECT COMPLETE! Ready for launch! 🚀**

