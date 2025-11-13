Perfect, let’s snap this into your **actual repo shape**:

* Engine lives in **`/packages/tsl-kit`**
* Examples + tests + playgrounds live in **`/LABS`**
* Website uses an **engine-first R3F/Drei canvas** on every page, with **MDX overlays** and **schema-driven Tweakpane UI**.

I’ll give you:

1. How the **module map adapts** to `packages/tsl-kit`
2. A **top-level repo layout**
3. A **LABS structure** that mirrors engine modules
4. A **schema-driven flow** (engine + UI + MDX)
5. A quick mental model for the R3F/MDX site

You can copy-paste most of this into `ENGINE_MODULE_MAP.md` + `REPO_STRUCTURE.md`.

---

## 1. Engine location: `packages/tsl-kit`

Every module we defined before now lives under:

```txt
/packages
  /tsl-kit
    /engine
      /core
      /rendering
      /modules
      /io
      /debug
      /ui
      /api
      /examples   (engine-only minimal tests, optional)
    ENGINE_MODULE_MAP.md
    package.json
```

So in `ENGINE_MODULE_MAP.md`, you can just adjust the intro like:

```md
# 🌌 TSL/WebGPU/MaterialX Engine — Module Map

Root: `packages/tsl-kit`

All engine code lives inside `packages/tsl-kit/engine/**`.
All LABS, showcases, and R3F/MDX demos live in `/LABS/**` and consume this engine as a dependency.
```

And keep the detailed category checklist the same — only path references change:

* Instead of `/engine/core` → `packages/tsl-kit/engine/core`
* etc.

---

## 2. Top-level repo layout (adapted)

Here’s a **monorepo-ish** layout that matches what you described:

```txt
/
  package.json          # workspace root
  turbo.json / nx.json  # (optional) monorepo tooling
  tsconfig.base.json

  /packages
    /tsl-kit
      package.json
      ENGINE_MODULE_MAP.md
      /engine
        /core
        /rendering
        /modules
        /io
        /debug
        /ui
        /api

  /LABS
    /web                # website + interactive labs (Next.js / R3F / Drei / MDX)
      package.json
      next.config.js
      contentlayer.config.ts

      /app or /src
        /labs
        /components
        /layouts
        /schemas
        /mdx
        /styles

      /public
        /assets
```

You can also keep `/RESOURCES` where it is, but that’s orthogonal.

---

## 3. LABS structure: 1:1 with engine modules

Idea: **every major engine module category gets a LABS section**.

Engine (in `packages/tsl-kit/engine/modules`):

```txt
/packages/tsl-kit/engine/modules
  /materials
  /lighting
  /geometry
  /fields
  /particles
  /physics
  /animation
  /postfx
  /math
```

LABS mirrors that:

```txt
/LABS/web/app/labs
  /materials
    pbr-basic
    pbr-advanced
    npr-toon
    emissive-neon
  /lighting
    studio-lighting
    hdr-sky
    area-lighting
  /geometry
    primitives
    deformations
    instancing
  /fields
    flow-fields
    sdf-raymarch
  /particles
    sparks
    rain
    magic-trails
  /physics
    cloth
    fluids-2d
    boids
  /animation
    camera-rigs
    audio-reactive
  /postfx
    cinematic-stack
    neon-arcade
    comic-book
  /math
    noise-gallery
    color-blends
```

Each lab is:

* One **R3F/Drei canvas** using `tsl-kit`
* One **schema config** describing controls
* One **MDX overlay** explaining what’s going on

---

## 4. Schema-driven design (engine + Tweakpane + MDX)

Key piece: **the same schema describes**:

* what knobs exist,
* how the engine config looks,
* and how UI + MDX auto-build per lab.

### 4.1 Where the schema lives

I’d centralize schemas in the LABS project, but referencing types from `tsl-kit`:

```txt
/LABS/web/app/schemas
  engineSchemas.ts        # core types & helpers imported from tsl-kit
  labs.materials.schema.ts
  labs.lighting.schema.ts
  ...
```

Minimal idea:

```ts
// /LABS/web/app/schemas/engineSchemas.ts
import type { EngineConfig } from 'tsl-kit/engine/api'; // you define this

export type ControlType = 'number' | 'color' | 'select' | 'boolean';

export interface UIControl {
  path: string;          // e.g. "material.roughness"
  label: string;
  type: ControlType;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  category?: string;     // e.g. "Material" | "Lighting"
}

export interface LabSchema {
  id: string;
  title: string;
  description: string;
  engineConfig: EngineConfig;  // default engine setup for this lab
  controls: UIControl[];       // used by Tweakpane & MDX docs
  tags?: string[];
}
```

Then each lab exports its schema:

```ts
// /LABS/web/app/labs/materials/pbr-basic/schema.ts
import type { LabSchema } from '@/schemas/engineSchemas';

export const pbrBasicLab: LabSchema = {
  id: 'materials/pbr-basic',
  title: 'PBR Basics',
  description: 'Standard metal/rough PBR with HDRI and simple controls.',
  engineConfig: {
    scenePreset: 'pbr_default',
    materials: {
      main: {
        type: 'pbrStandard',
        color: '#ffffff',
        metalness: 0.7,
        roughness: 0.2,
      },
    },
    lighting: {
      preset: 'studio',
    },
  },
  controls: [
    {
      path: 'materials.main.metalness',
      label: 'Metalness',
      type: 'number',
      min: 0,
      max: 1,
      step: 0.01,
      category: 'Material',
    },
    {
      path: 'materials.main.roughness',
      label: 'Roughness',
      type: 'number',
      min: 0,
      max: 1,
      step: 0.01,
      category: 'Material',
    },
    {
      path: 'lighting.preset',
      label: 'Lighting Preset',
      type: 'select',
      options: ['studio', 'hdr_outdoor', 'neon'],
      category: 'Lighting',
    },
  ],
};
```

### 4.2 How the schema drives Tweakpane

You then create a generic Tweakpane bridge:

```ts
// /LABS/web/app/components/LabControlPanel.tsx
// (pseudo, just conceptual)
export function LabControlPanel({ schema, state, onChange }) {
  // read schema.controls and generate Tweakpane inputs
}
```

* It reads `LabSchema.controls`
* For each control, it creates a Tweakpane input bound to your React state
* Changes call `onChange`, which updates engine config (through `tsl-kit` APIs)

### 4.3 How MDX uses the same schema

Each lab page might be:

```txt
/LABS/web/app/labs/materials/pbr-basic/page.mdx
```

Within the MDX, you can import the schema:

```mdx
import { LabPage } from '@/layouts/LabPage';
import { pbrBasicLab } from './schema';

<LabPage schema={pbrBasicLab}>
  <h1>{pbrBasicLab.title}</h1>
  <p>{pbrBasicLab.description}</p>

  <ul>
    <li>Material: {pbrBasicLab.engineConfig.materials.main.type}</li>
    <li>Lighting preset: {pbrBasicLab.engineConfig.lighting.preset}</li>
  </ul>

  <p>
    Use the controls on the right to explore how metalness and roughness affect the
    highlights and reflections.
  </p>
</LabPage>
```

`<LabPage>` would:

* render the **R3F/Drei canvas** (engine-first),
* pass the `schema` into:

  * `<EngineCanvas>` (to configure `tsl-kit` engine),
  * `<LabControlPanel>` (to build Tweakpane),
* render MDX as an overlay or side-panel.

---

## 5. Engine-first R3F/Drei page layout

In `/LABS/web/app/components/layouts/LabPage.tsx` you basically have:

* Full page = **canvas as the main thing**
* MDX + controls as overlays/panels

Rough mental layout:

```tsx
// pseudo-react, not full code
export function LabPage({ schema, children }: { schema: LabSchema, children: ReactNode }) {
  const [config, setConfig] = useState(schema.engineConfig);

  return (
    <div className="lab-page">
      <div className="lab-canvas">
        <EngineCanvas config={config} schema={schema} />
      </div>

      <aside className="lab-ui">
        <LabControlPanel
          schema={schema}
          state={config}
          onChange={setConfig}
        />
      </aside>

      <section className="lab-mdx">
        {children}
      </section>
    </div>
  );
}
```

* `EngineCanvas` is your R3F Scene that calls into `tsl-kit` (`packages/tsl-kit`) to set up:

  * WebGPU renderer, TSL materials, pipelines, etc.
* MDX is rendered via **Contentlayer**:

  * Source MDX in `/LABS/web/content/labs/**`
  * Mapped to routes `/labs/[category]/[slug]`

---

## 6. Contentlayer + local MD/MDX + optional CMS

You already said:

> Local MD/MDX is the default (Contentlayer); optional headless CMS for remote editing.

So:

* **Source of truth** for docs: local MDX in repo.
* **Contentlayer** parses:

  * `labs` collection → each lab page
  * maybe `docs` collection for general docs
* If later you add a headless CMS:

  * Either sync CMS → MDX in repo,
  * or add a parallel content source that merges with local.

Example Contentlayer config sketch:

```ts
// /LABS/web/contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const LabDoc = defineDocumentType(() => ({
  name: 'LabDoc',
  filePathPattern: `labs/**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    labId: { type: 'string', required: true }, // ties back to LabSchema.id
    tags: { type: 'list', of: { type: 'string' } },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [LabDoc],
});
```

Then each MDX links to a schema via `labId`, or imports the schema module directly.

---

## 7. TL;DR structure snapshot

**Engine (in `packages/tsl-kit`)**

```txt
/packages/tsl-kit
  ENGINE_MODULE_MAP.md
  /engine
    /core
    /rendering
    /modules
    /io
    /debug
    /ui
    /api
```

**LABS + website (in `/LABS/web`)**

```txt
/LABS/web
  package.json
  contentlayer.config.ts

  /content
    /labs
      materials/pbr-basic.mdx
      ...

  /app or /src
    /labs
      /materials
        /pbr-basic
          schema.ts
          page.mdx   # or MDX in /content + a page.tsx wrapper
      /lighting
      /geometry
      ...

    /components
      EngineCanvas.tsx
      LabControlPanel.tsx
      layouts/LabPage.tsx

    /schemas
      engineSchemas.ts
```

This checks all your boxes:

* ✅ Engine lives cleanly in **`packages/tsl-kit`**
* ✅ **`/LABS`** is a full showcase + testbed for each module
* ✅ **Engine-first R3F/Drei canvas** powers each lab page
* ✅ **Schema-driven**: same schema config powers engine config + Tweakpane UI + MDX text
* ✅ **Local MD/MDX via Contentlayer**, with an easy upgrade path to CMS

If you want, next I can:

* Draft a **`REPO_STRUCTURE.md`** you can drop at root, and/or
* Write a **minimal working example** for one lab (`materials/pbr-basic`) with TS types + R3F canvas + dummy schema so you can plug it into Cursor and start generating the rest.
