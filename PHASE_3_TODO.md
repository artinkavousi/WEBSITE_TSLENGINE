# Phase 3: Extended Engine & Module Library — Detailed TODO

**Duration**: 4-6 weeks  
**Status**: Awaiting Phase 2 Completion  
**Goal**: Port all 150+ modules and complete engine features

---

## 📋 Overview

Phase 3 focuses on:
- Porting all remaining 140+ modules from source repositories
- Creating comprehensive module library across all categories
- Building preset library (50+ presets)
- Completing LAB showcase pages for all modules
- Comprehensive visual regression testing
- Performance optimization

**Exit Criteria**:
- ✅ All 150+ modules ported and working
- ✅ All modules have LAB showcase pages
- ✅ 50+ presets created and tested
- ✅ Visual regression tests passing (ΔE < 2)
- ✅ Performance targets met (60 FPS @ 1080p)
- ✅ No memory leaks

---

## 🎨 Section 1: Materials Library (30+ modules)

### 1.1 Core PBR Materials (8 modules)

**Priority**: High | **Source**: portfolio-main

- [ ] **PBR Clearcoat** (`materials/pbr-clearcoat.ts`)
  - Port from `portfolio-main/src/utils/webgpu/materials/clearcoat.ts`
  - Schema: baseColor, metalness, roughness, clearcoat, clearcoatRoughness
  - Test: Golden image comparison
  - LAB page: `/labs/materials/pbr-clearcoat`

- [ ] **PBR Sheen** (`materials/pbr-sheen.ts`)
  - Port sheen variant
  - Schema: baseColor, sheenColor, sheenRoughness
  - Test: Golden image comparison
  - LAB page: `/labs/materials/pbr-sheen`

- [ ] **PBR Transmission** (`materials/pbr-transmission.ts`)
  - Port glass/transmission variant
  - Schema: transmission, thickness, ior, attenuationColor
  - Test: Golden image comparison
  - LAB page: `/labs/materials/pbr-transmission`

- [ ] **PBR Subsurface** (`materials/pbr-subsurface.ts`)
  - Port SSS variant
  - Schema: subsurface, subsurfaceColor, subsurfaceRadius
  - Test: Golden image comparison
  - LAB page: `/labs/materials/pbr-subsurface`

- [ ] **PBR Anisotropic** (`materials/pbr-anisotropic.ts`)
  - Port anisotropic variant
  - Schema: anisotropy, anisotropyRotation
  - Test: Golden image comparison
  - LAB page: `/labs/materials/pbr-anisotropic`

- [ ] **Car Paint** (`materials/car-paint.ts`)
  - Port car paint material
  - Schema: baseColor, metalness, flakeIntensity, clearcoat
  - Test: Golden image comparison
  - LAB page: `/labs/materials/car-paint`

- [ ] **Fabric** (`materials/fabric.ts`)
  - Port fabric material
  - Schema: baseColor, sheen, fuzziness
  - Test: Golden image comparison
  - LAB page: `/labs/materials/fabric`

- [ ] **Skin** (`materials/skin.ts`)
  - Port skin material with SSS
  - Schema: skinColor, subsurface, oiliness
  - Test: Golden image comparison
  - LAB page: `/labs/materials/skin`

### 1.2 Stylized/NPR Materials (6 modules)

**Priority**: Medium | **Source**: portfolio-main, TSLwebgpuExamples

- [ ] **Toon Shader** (`materials/toon.ts`)
  - Port ramp-based toon shader
  - Schema: baseColor, rampTexture, steps, outlineWidth
  - LAB page: `/labs/materials/toon`

- [ ] **Matcap** (`materials/matcap.ts`)
  - Port matcap material
  - Schema: matcapTexture, tint
  - LAB page: `/labs/materials/matcap`

- [ ] **Halftone** (`materials/halftone.ts`)
  - Port halftone shader
  - Schema: baseColor, dotSize, angle
  - LAB page: `/labs/materials/halftone`

- [ ] **Posterization** (`materials/posterize.ts`)
  - Port posterization material
  - Schema: levels, gamma
  - LAB page: `/labs/materials/posterize`

- [ ] **Ink/Sketch** (`materials/ink.ts`)
  - Port ink/sketch material
  - Schema: lineColor, lineWidth, hatching
  - LAB page: `/labs/materials/ink`

- [ ] **Cel-Shaded with Outlines** (`materials/cel-shaded.ts`)
  - Port cel-shaded + outline
  - Schema: baseColor, steps, outlineWidth, outlineColor
  - LAB page: `/labs/materials/cel-shaded`

### 1.3 Procedural Materials (8 modules)

**Priority**: Medium | **Source**: portfolio-main

- [ ] **Marble** (`materials/marble.ts`)
  - Port marble procedural
  - Schema: color1, color2, scale, turbulence
  - LAB page: `/labs/materials/marble`

- [ ] **Wood Grain** (`materials/wood.ts`)
  - Port wood grain procedural
  - Schema: color1, color2, ringScale, grainScale
  - LAB page: `/labs/materials/wood`

- [ ] **Stone/Rock** (`materials/stone.ts`)
  - Port stone procedural
  - Schema: baseColor, noiseScale, bumpIntensity
  - LAB page: `/labs/materials/stone`

- [ ] **Lava/Magma** (`materials/lava.ts`)
  - Port lava material
  - Schema: hotColor, coldColor, flowSpeed, distortion
  - LAB page: `/labs/materials/lava`

- [ ] **Cloud** (`materials/cloud.ts`)
  - Port cloud procedural
  - Schema: color, density, scale, speed
  - LAB page: `/labs/materials/cloud`

- [ ] **Water Surface** (`materials/water.ts`)
  - Port water surface material
  - Schema: color, roughness, waveScale, waveSpeed
  - LAB page: `/labs/materials/water`

- [ ] **Terrain (Triplanar)** (`materials/terrain.ts`)
  - Port triplanar terrain material
  - Schema: textures, scale, blending
  - LAB page: `/labs/materials/terrain`

- [ ] **Holographic** (`materials/holographic.ts`)
  - Port holographic material
  - Schema: baseColor, fresnel, scanlineSpeed
  - LAB page: `/labs/materials/holographic`

### 1.4 Emissive/FX Materials (8 modules)

**Priority**: High | **Source**: portfolio-main

- [ ] **Neon Glass** (`materials/neon-glass.ts`)
  - Port neon glass material
  - Schema: color, transmission, emissiveIntensity, fresnel
  - LAB page: `/labs/materials/neon-glass`

- [ ] **Glitch/Digital** (`materials/glitch.ts`)
  - Port glitch material
  - Schema: color, glitchIntensity, scanlineSpeed
  - LAB page: `/labs/materials/glitch`

- [ ] **Fresnel Glow** (`materials/fresnel-glow.ts`)
  - Schema: color, power, intensity
  - LAB page: `/labs/materials/fresnel-glow`

- [ ] **Pulsing Emissive** (`materials/pulse.ts`)
  - Schema: color, speed, intensity
  - LAB page: `/labs/materials/pulse`

- [ ] **Scanline** (`materials/scanline.ts`)
  - Schema: lineColor, lineWidth, speed
  - LAB page: `/labs/materials/scanline`

- [ ] **Matrix Rain** (`materials/matrix.ts`)
  - Schema: color, speed, density
  - LAB page: `/labs/materials/matrix`

- [ ] **Energy Shield** (`materials/energy-shield.ts`)
  - Schema: color, hexSize, pulseSpeed
  - LAB page: `/labs/materials/energy-shield`

- [ ] **Iridescent (Full Featured)** (`materials/iridescent-full.ts`)
  - Extend Phase 2 iridescent
  - Schema: thickness, ior, baseColor, shift, intensity
  - LAB page: `/labs/materials/iridescent-full`

---

## 💡 Section 2: Lighting & Environment (12 modules)

### 2.1 Light Types (5 modules)

**Priority**: High | **Source**: three.js-r181/examples

- [ ] **Point Light with Shadows** (`lighting/point-light.ts`)
  - Schema: color, intensity, distance, decay, castShadow
  - LAB page: `/labs/lighting/point-light`

- [ ] **Spot Light with IES** (`lighting/spot-light.ts`)
  - Schema: color, intensity, angle, penumbra, iesProfile
  - LAB page: `/labs/lighting/spot-light`

- [ ] **Area Light (Rect)** (`lighting/area-rect.ts`)
  - Schema: color, intensity, width, height
  - LAB page: `/labs/lighting/area-rect`

- [ ] **Area Light (Tube)** (`lighting/area-tube.ts`)
  - Schema: color, intensity, length, radius
  - LAB page: `/labs/lighting/area-tube`

- [ ] **Directional with Cascaded Shadows** (`lighting/directional-csm.ts`)
  - Schema: color, intensity, direction, cascades
  - LAB page: `/labs/lighting/directional-csm`

### 2.2 Environment (4 modules)

**Priority**: High | **Source**: portfolio-main

- [ ] **HDRI Loader + IBL** (extend Phase 2 module)
  - Add more HDRI presets
  - Schema: hdriPath, exposure, rotation, blur
  - LAB page: `/labs/lighting/hdri`

- [ ] **Procedural Sky** (`lighting/procedural-sky.ts`)
  - Port physical sky
  - Schema: sunPosition, turbidity, rayleigh, mieCoefficient
  - LAB page: `/labs/lighting/procedural-sky`

- [ ] **Reflection Probes** (`lighting/reflection-probes.ts`)
  - Schema: position, size, resolution
  - LAB page: `/labs/lighting/reflection-probes`

- [ ] **Light Probes (SH)** (`lighting/light-probes.ts`)
  - Port spherical harmonics light probes
  - Schema: coefficients, intensity
  - LAB page: `/labs/lighting/light-probes`

### 2.3 Shadows (3 modules)

**Priority**: Medium | **Source**: three.js-r181/examples

- [ ] **PCF Shadows** (`lighting/shadow-pcf.ts`)
  - Schema: radius, samples
  - LAB page: `/labs/lighting/shadow-pcf`

- [ ] **PCSS Shadows** (`lighting/shadow-pcss.ts`)
  - Port percentage-closer soft shadows
  - Schema: lightSize, samples
  - LAB page: `/labs/lighting/shadow-pcss`

- [ ] **Contact Shadows** (`lighting/contact-shadows.ts`)
  - Port contact shadow approximation
  - Schema: opacity, blur, resolution
  - LAB page: `/labs/lighting/contact-shadows`

---

## 🎞️ Section 3: Post-Processing (20+ modules)

### 3.1 Core Chain (5 modules)

**Priority**: High | **Source**: three.js-r181/examples, @react-three/postprocessing

- [ ] **Tone Mapping Suite** (`postfx/tone-mapping.ts`)
  - ACES, Filmic, Reinhard, Uncharted2
  - Schema: type, exposure
  - LAB page: `/labs/postfx/tone-mapping`

- [ ] **Exposure Control** (`postfx/exposure.ts`)
  - Manual and auto-exposure
  - Schema: exposure, autoExposure, adaptationRate
  - LAB page: `/labs/postfx/exposure`

- [ ] **Color Grading (LUT)** (`postfx/color-grading-lut.ts`)
  - LUT-based color grading
  - Schema: lutTexture, intensity
  - LAB page: `/labs/postfx/color-grading-lut`

- [ ] **Color Grading (Parametric)** (`postfx/color-grading-params.ts`)
  - Parametric color grading
  - Schema: contrast, saturation, temperature, tint, shadows, midtones, highlights
  - LAB page: `/labs/postfx/color-grading-params`

- [ ] **Gamma Correction** (`postfx/gamma.ts`)
  - Schema: gamma
  - LAB page: `/labs/postfx/gamma`

### 3.2 Cinematic FX (8 modules)

**Priority**: High | **Source**: portfolio-main, @react-three/postprocessing

- [ ] **Depth of Field (Bokeh)** (`postfx/dof.ts`)
  - Port bokeh DOF
  - Schema: focusDistance, focalLength, bokehScale, maxBlur
  - LAB page: `/labs/postfx/dof`

- [ ] **Motion Blur** (`postfx/motion-blur.ts`)
  - Schema: intensity, samples
  - LAB page: `/labs/postfx/motion-blur`

- [ ] **Vignette** (extend Phase 2)
  - Add more options
  - LAB page: `/labs/postfx/vignette`

- [ ] **Film Grain** (`postfx/grain.ts`)
  - Schema: intensity, size
  - LAB page: `/labs/postfx/grain`

- [ ] **Chromatic Aberration** (extend Phase 2)
  - Add radial distortion
  - LAB page: `/labs/postfx/chromatic-aberration`

- [ ] **Lens Distortion** (`postfx/lens-distortion.ts`)
  - Schema: distortion, principalPoint, focalLength
  - LAB page: `/labs/postfx/lens-distortion`

- [ ] **Anamorphic Lens Flares** (`postfx/lens-flare.ts`)
  - Schema: threshold, intensity, scale, color
  - LAB page: `/labs/postfx/lens-flare`

- [ ] **Bloom** (extend Phase 2)
  - Add selective bloom
  - LAB page: `/labs/postfx/bloom`

### 3.3 Stylized FX (4 modules)

**Priority**: Medium | **Source**: three.js-r181/examples

- [ ] **Edge Detection/Outlines** (`postfx/edges.ts`)
  - Sobel, Frei-Chen, Canny
  - Schema: method, threshold, color
  - LAB page: `/labs/postfx/edges`

- [ ] **Posterization** (`postfx/posterize.ts`)
  - Schema: levels, gamma
  - LAB page: `/labs/postfx/posterize`

- [ ] **Halftone** (`postfx/halftone.ts`)
  - Schema: shape, scale, angle, contrast
  - LAB page: `/labs/postfx/halftone`

- [ ] **Pixelation/Mosaic** (`postfx/pixelate.ts`)
  - Schema: pixelSize, grayscale
  - LAB page: `/labs/postfx/pixelate`

### 3.4 Distortion FX (3 modules)

**Priority**: Medium | **Source**: portfolio-main, TSLwebgpuExamples

- [ ] **Heat Haze/Ripple** (`postfx/heat-haze.ts`)
  - Schema: intensity, frequency, speed
  - LAB page: `/labs/postfx/heat-haze`

- [ ] **Shockwave Distortion** (`postfx/shockwave.ts`)
  - Schema: center, radius, strength, decay
  - LAB page: `/labs/postfx/shockwave`

- [ ] **Glitch Suite** (`postfx/glitch.ts`)
  - RGB split, scanlines, block corruption
  - Schema: intensity, glitchType, frequency
  - LAB page: `/labs/postfx/glitch`

### 3.5 Pipeline Presets (4 presets)

**Priority**: High

- [ ] **Cinematic Default Preset**
  - Bloom + DOF + grain + vignette
  - Preset JSON file

- [ ] **Neon Arcade Preset**
  - High bloom + CA + scanlines
  - Preset JSON file

- [ ] **Comic Book Preset**
  - Outlines + halftone + posterize
  - Preset JSON file

- [ ] **Retro CRT Preset**
  - Scanlines + CA + vignette + curvature
  - Preset JSON file

---

## ✨ Section 4: Particles & VFX (18 modules)

### 4.1 Core Framework (4 modules)

**Priority**: High | **Source**: TSLwebgpuExamples/tsl-compute-particles

- [ ] **GPU Particle Buffer System** (extend Phase 2)
  - Add more buffer attributes
  - Schema: maxParticles, attributes
  - LAB page: `/labs/particles/buffer-system`

- [ ] **Particle Updater (Compute)** (`particles/updater.ts`)
  - Port compute shader updater
  - Schema: dt, forces, constraints
  - LAB page: `/labs/particles/updater`

- [ ] **Particle Renderer (Instanced)** (`particles/renderer.ts`)
  - Port instanced renderer
  - Schema: geometry, material, sorting
  - LAB page: `/labs/particles/renderer`

- [ ] **Particle Trail/Ribbon** (`particles/trail.ts`)
  - Port trail renderer
  - Schema: length, width, fade
  - LAB page: `/labs/particles/trail`

### 4.2 Emitters (5 modules)

**Priority**: High | **Source**: portfolio-main, TSLwebgpuExamples

- [ ] **Point Emitter** (extend Phase 2)
  - Add burst mode
  - LAB page: `/labs/particles/emitter-point`

- [ ] **Sphere Emitter** (`particles/emitter-sphere.ts`)
  - Schema: radius, shell, velocity
  - LAB page: `/labs/particles/emitter-sphere`

- [ ] **Box Emitter** (`particles/emitter-box.ts`)
  - Schema: size, volume, velocity
  - LAB page: `/labs/particles/emitter-box`

- [ ] **Cone Emitter** (`particles/emitter-cone.ts`)
  - Schema: radius, angle, height, velocity
  - LAB page: `/labs/particles/emitter-cone`

- [ ] **Mesh Surface Emitter** (`particles/emitter-mesh.ts`)
  - Schema: mesh, sampleCount, normalOffset
  - LAB page: `/labs/particles/emitter-mesh`

### 4.3 Forces (5 modules)

**Priority**: High | **Source**: portfolio-main, TSLwebgpuExamples

- [ ] **Gravity Force** (`particles/force-gravity.ts`)
  - Schema: strength, direction
  - LAB page: `/labs/particles/force-gravity`

- [ ] **Wind Force** (`particles/force-wind.ts`)
  - Schema: direction, strength, turbulence
  - LAB page: `/labs/particles/force-wind`

- [ ] **Drag Force** (`particles/force-drag.ts`)
  - Schema: coefficient
  - LAB page: `/labs/particles/force-drag`

- [ ] **Vortex Force** (`particles/force-vortex.ts`)
  - Schema: center, axis, strength, radius
  - LAB page: `/labs/particles/force-vortex`

- [ ] **Noise/Turbulence Force** (`particles/force-noise.ts`)
  - Schema: scale, strength, octaves
  - LAB page: `/labs/particles/force-noise`

### 4.4 Particle Presets (4 presets)

**Priority**: Medium

- [ ] **Sparks/Embers**
- [ ] **Rain**
- [ ] **Snow**
- [ ] **Magic Trails**

---

## 🌊 Section 5: Fields, Volumes & SDF (16 modules)

### 5.1 Noise Fields (6 modules - extend Phase 2)

**Priority**: High | **Source**: portfolio-main

- [ ] **Simplex 2D/3D** (already in Phase 2)
- [ ] **Curl Noise** (already in Phase 2)
- [ ] **Voronoi** (already in Phase 2)
- [ ] **FBM** (already in Phase 2)

- [ ] **Perlin Noise** (`math/perlin-noise.ts`)
  - Port classic Perlin
  - Schema: scale, octaves
  - LAB page: `/labs/fields/perlin`

- [ ] **Value Noise** (`math/value-noise.ts`)
  - Port value noise
  - Schema: scale, octaves
  - LAB page: `/labs/fields/value`

### 5.2 SDF Primitives (6 modules)

**Priority**: Medium | **Source**: TSLwebgpuExamples/raymarching-tsl-main

- [ ] **Sphere SDF** (`fields/sdf-sphere.ts`)
  - Schema: radius, position
  - LAB page: `/labs/fields/sdf-sphere`

- [ ] **Box SDF** (`fields/sdf-box.ts`)
  - Schema: size, position, rounding
  - LAB page: `/labs/fields/sdf-box`

- [ ] **Capsule SDF** (`fields/sdf-capsule.ts`)
  - Schema: height, radius, position
  - LAB page: `/labs/fields/sdf-capsule`

- [ ] **Torus SDF** (`fields/sdf-torus.ts`)
  - Schema: majorRadius, minorRadius, position
  - LAB page: `/labs/fields/sdf-torus`

- [ ] **Gyroid SDF** (`fields/sdf-gyroid.ts`)
  - Schema: scale, thickness, position
  - LAB page: `/labs/fields/sdf-gyroid`

- [ ] **SDF Boolean Ops** (`fields/sdf-ops.ts`)
  - Union, subtract, intersect, smooth blend
  - Schema: operation, smoothing
  - LAB page: `/labs/fields/sdf-ops`

### 5.3 Volumes & Raymarching (4 modules)

**Priority**: Medium | **Source**: TSLwebgpuExamples

- [ ] **3D Texture Volume** (`fields/volume-3d.ts`)
  - Schema: texture, density, scale
  - LAB page: `/labs/fields/volume-3d`

- [ ] **Fog/Cloud Volume** (`fields/fog.ts`)
  - Schema: density, color, falloff
  - LAB page: `/labs/fields/fog`

- [ ] **Generic Raymarcher** (`fields/raymarcher.ts`)
  - Port from raymarching-tsl-main
  - Schema: maxSteps, epsilon, maxDistance
  - LAB page: `/labs/fields/raymarcher`

- [ ] **Volumetric Lighting** (`fields/volumetric-light.ts`)
  - Schema: lightPos, samples, decay, exposure
  - LAB page: `/labs/fields/volumetric-light`

---

## 🌀 Section 6: Physics & Simulation (12 modules)

### 6.1 Rigid Body (2 modules)

**Priority**: Low | **Source**: Custom implementation

- [ ] **Kinematic Motion** (`physics/kinematic.ts`)
  - Schema: velocity, acceleration
  - LAB page: `/labs/physics/kinematic`

- [ ] **Simple Collision** (`physics/collision.ts`)
  - AABB, sphere collision
  - Schema: shapes, response
  - LAB page: `/labs/physics/collision`

### 6.2 Cloth & Softbody (3 modules)

**Priority**: Medium | **Source**: TSLwebgpuExamples/softbodies-master

- [ ] **Mass-Spring Cloth** (`physics/cloth.ts`)
  - Port from softbodies-master
  - Schema: resolution, stiffness, damping
  - LAB page: `/labs/physics/cloth`

- [ ] **Softbody Deformation** (`physics/softbody.ts`)
  - Port softbody sim
  - Schema: stiffness, pressure, damping
  - LAB page: `/labs/physics/softbody`

- [ ] **Jiggle Physics** (`physics/jiggle.ts`)
  - Simple jiggle for accessories
  - Schema: frequency, damping
  - LAB page: `/labs/physics/jiggle`

### 6.3 Fluids (4 modules)

**Priority**: Medium-High | **Source**: TSLwebgpuExamples (breeze, Splash, WaterBall, fluidglass)

- [ ] **2D Fluid (Smoke)** (`physics/fluid-2d-smoke.ts`)
  - Port from breeze-main
  - Schema: viscosity, diffusion, dissipation
  - LAB page: `/labs/physics/fluid-smoke`

- [ ] **2D Fluid (Ink/Dye)** (`physics/fluid-2d-ink.ts`)
  - Add dye injection
  - Schema: inkColor, diffusion, dissipation
  - LAB page: `/labs/physics/fluid-ink`

- [ ] **2D Fluid (Water)** (`physics/fluid-2d-water.ts`)
  - Port from Splash-main
  - Schema: gravity, surface tension
  - LAB page: `/labs/physics/fluid-water`

- [ ] **3D Fluid Template** (`physics/fluid-3d.ts`)
  - Advanced 3D fluid (optional, feature-gated)
  - Schema: resolution, viscosity, pressure solver
  - LAB page: `/labs/physics/fluid-3d`

### 6.4 Crowd (3 modules)

**Priority**: Low | **Source**: portfolio-main

- [ ] **Boids (Separation)** (`physics/boids-separation.ts`)
  - Schema: radius, strength
  - LAB page: `/labs/physics/boids-separation`

- [ ] **Boids (Alignment)** (`physics/boids-alignment.ts`)
  - Schema: radius, strength
  - LAB page: `/labs/physics/boids-alignment`

- [ ] **Boids (Cohesion)** (`physics/boids-cohesion.ts`)
  - Schema: radius, strength
  - LAB page: `/labs/physics/boids-cohesion`

---

## 📐 Section 7: Geometry & Mesh (10 modules)

### 7.1 Primitives (4 modules)

**Priority**: Low | **Source**: three.js-r181

- [ ] **Rounded Box** (`geometry/rounded-box.ts`)
- [ ] **Capsule** (`geometry/capsule.ts`)
- [ ] **Superquadric** (`geometry/superquadric.ts`)
- [ ] **Parametric Shapes** (`geometry/parametric.ts`)

### 7.2 Modifiers (4 modules)

**Priority**: Low | **Source**: Custom

- [ ] **Bend Modifier** (`geometry/bend.ts`)
- [ ] **Twist Modifier** (`geometry/twist.ts`)
- [ ] **Taper Modifier** (`geometry/taper.ts`)
- [ ] **Noise Displacement** (`geometry/displace.ts`)

### 7.3 Deformation (2 modules)

**Priority**: Low | **Source**: three.js-r181

- [ ] **Skeletal Skinning** (`geometry/skinning.ts`)
- [ ] **Morph Targets** (`geometry/morph.ts`)

---

## 🎬 Section 8: Animation & Motion (8 modules)

### 8.1 Time (2 modules)

**Priority**: Medium

- [ ] **Global Time Node** (`animation/time-global.ts`)
- [ ] **Local Time Node** (`animation/time-local.ts`)

### 8.2 Parametric Motion (3 modules)

**Priority**: Medium

- [ ] **Oscillators** (`animation/oscillators.ts`)
- [ ] **Easing Functions** (`animation/easing.ts`)
- [ ] **Noise-Driven Motion** (`animation/noise-motion.ts`)

### 8.3 Camera (2 modules)

**Priority**: Low

- [ ] **Spline Camera** (`animation/camera-spline.ts`)
- [ ] **Orbit Camera** (`animation/camera-orbit.ts`)

### 8.4 Audio-Reactive (1 module)

**Priority**: Low

- [ ] **Audio Analyzer** (`animation/audio-analyzer.ts`)

---

## 🔢 Section 9: Math & Utility Library (20 modules)

### 9.1 Core Math (5 modules)

**Priority**: High | **Source**: three.js, custom

- [ ] **Vector Operations** (`math/vector-ops.ts`)
- [ ] **Matrix Operations** (`math/matrix-ops.ts`)
- [ ] **Smoothstep/Smoothmin** (`math/smooth.ts`)
- [ ] **Remap/Clamp** (`math/remap.ts`)
- [ ] **Coordinate Transforms** (`math/transforms.ts`)

### 9.2 Color (4 modules)

**Priority**: Medium

- [ ] **Color Conversions** (`math/color-convert.ts`)
- [ ] **Color Gradients** (`math/gradients.ts`)
- [ ] **Blend Modes** (`math/blend-modes.ts`)
- [ ] **Color Harmonies** (`math/harmonies.ts`)

### 9.3 Patterns (5 modules)

**Priority**: Medium

- [ ] **Tileable Noise** (`math/tileable-noise.ts`)
- [ ] **Grid Patterns** (`math/grid.ts`)
- [ ] **Stripe Patterns** (`math/stripes.ts`)
- [ ] **Spiral Patterns** (`math/spiral.ts`)
- [ ] **Radial Patterns** (`math/radial.ts`)

### 9.4 Algorithms (6 modules)

**Priority**: Low

- [ ] **Hash Functions** (`math/hash.ts`)
- [ ] **Poisson Sampling** (`math/poisson.ts`)
- [ ] **Curve Shaping** (`math/curves.ts`)
- [ ] **Distance Fields** (`math/distance-fields.ts`)
- [ ] **UV Utilities** (`math/uv-utils.ts`)
- [ ] **Normal Blending** (`math/normal-blend.ts`)

---

## 📦 Section 10: I/O & Assets (8 modules)

### 10.1 Geometry Loaders (3 modules)

**Priority**: Medium

- [ ] **GLTF/GLB Loader** (`io/gltf-loader.ts`)
- [ ] **Draco Support** (`io/draco-loader.ts`)
- [ ] **Lazy-Load Manager** (`io/lazy-loader.ts`)

### 10.2 Texture Loaders (3 modules)

**Priority**: Medium

- [ ] **HDR/EXR Loader** (`io/hdr-loader.ts`)
- [ ] **KTX2 Loader** (`io/ktx2-loader.ts`)
- [ ] **Texture Atlas** (`io/texture-atlas.ts`)

### 10.3 Presets (2 modules)

**Priority**: Medium

- [ ] **JSON Preset Loader** (`io/json-presets.ts`)
- [ ] **YAML Preset Loader** (`io/yaml-presets.ts`)

---

## 🐛 Section 11: Debug & Profiling (6 modules)

**Priority**: Low

- [ ] **G-Buffer Visualizer** (`debug/gbuffer-viz.ts`)
- [ ] **Light Volume Visualizer** (`debug/light-viz.ts`)
- [ ] **Shadow Cascade Visualizer** (`debug/shadow-viz.ts`)
- [ ] **Frame Timing Profiler** (`debug/profiler.ts`)
- [ ] **GPU Memory Profiler** (`debug/memory.ts`)
- [ ] **Overdraw Heatmap** (`debug/overdraw.ts`)

---

## ✅ Phase 3 Completion Checklist

### Module Porting
- [ ] All 30+ materials ported
- [ ] All 12 lighting modules ported
- [ ] All 20+ post-FX modules ported
- [ ] All 18 particle modules ported
- [ ] All 16 field/SDF modules ported
- [ ] All 12 physics modules ported
- [ ] All 10 geometry modules ported
- [ ] All 8 animation modules ported
- [ ] All 20 math utilities ported
- [ ] All 8 I/O modules ported
- [ ] All 6 debug modules ported

### Testing
- [ ] All modules have unit tests
- [ ] All modules have visual regression tests
- [ ] All golden images captured (ΔE < 2)
- [ ] Performance tests passing (60 FPS)
- [ ] Memory leak tests passing

### Documentation
- [ ] All modules have LAB pages
- [ ] All modules documented in API docs
- [ ] 50+ presets created and tested
- [ ] Module catalog complete

### Quality
- [ ] No critical bugs
- [ ] All modules registered
- [ ] All tests passing
- [ ] Performance targets met

---

## 🚦 Phase 3 Sign-Off

**Criteria for moving to Phase 4:**
1. ✅ All 150+ modules ported and tested
2. ✅ All LAB pages complete
3. ✅ Visual regression tests passing
4. ✅ Performance targets met
5. ✅ No memory leaks
6. ✅ 50+ presets created

**Sign-off**: ________________  
**Date**: ________________

---

**Next Phase**: [Phase 4 TODO](./PHASE_4_TODO.md) — Website, UI & Polish

