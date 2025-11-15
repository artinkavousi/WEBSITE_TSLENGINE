// Module exports

// Test modules
export { default as helloCubeModule } from './test/HelloCube';
export { default as tslTestModule } from './test/TSLTest';

// Material modules
export { default as emissiveMaterialModule } from './materials/EmissiveMaterial';
export { default as iridescentMaterialModule } from './materials/IridescentMaterial';
export { default as pbrMaterialModule } from './materials/PBRMaterial';
export { default as tslWaveMaterialModule } from './materials/TSLWaveMaterial';

// Noise modules
export { default as curlNoiseModule } from './noise/CurlNoise';
export { default as fbmNoiseModule } from './noise/FBMNoise';
export { default as simplexNoiseModule } from './noise/SimplexNoise';
export { default as voronoiNoiseModule } from './noise/VoronoiNoise';

// Post-FX modules
export { default as bloomEffectModule } from './postfx/BloomEffect';
export { default as chromaticAberrationModule } from './postfx/ChromaticAberration';
export { default as vignetteEffectModule } from './postfx/VignetteEffect';

