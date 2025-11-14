// Module exports

// Test modules
export { default as helloCubeModule } from './test/HelloCube';

// Material modules
export { default as pbrMaterialModule } from './materials/PBRMaterial';
export { default as emissiveMaterialModule } from './materials/EmissiveMaterial';
export { default as iridescentMaterialModule } from './materials/IridescentMaterial';

// Noise modules
export { default as simplexNoiseModule } from './noise/SimplexNoise';
export { default as curlNoiseModule } from './noise/CurlNoise';
export { default as voronoiNoiseModule } from './noise/VoronoiNoise';
export { default as fbmNoiseModule } from './noise/FBMNoise';

// Post-FX modules
export { default as bloomEffectModule } from './postfx/BloomEffect';
export { default as vignetteEffectModule } from './postfx/VignetteEffect';
export { default as chromaticAberrationModule } from './postfx/ChromaticAberration';

