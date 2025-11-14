// Resource manager - GPU resource lifecycle management
import * as THREE from 'three';

export class ResourceManager {
  private textures = new Map<string, THREE.Texture>();
  private geometries = new Map<string, THREE.BufferGeometry>();
  private materials = new Map<string, THREE.Material>();
  private refCounts = new Map<string, number>();

  /**
   * Register a texture
   */
  registerTexture(id: string, texture: THREE.Texture): void {
    if (this.textures.has(id)) {
      this.incrementRef(id);
    } else {
      this.textures.set(id, texture);
      this.refCounts.set(id, 1);
    }
  }

  /**
   * Register a geometry
   */
  registerGeometry(id: string, geometry: THREE.BufferGeometry): void {
    if (this.geometries.has(id)) {
      this.incrementRef(id);
    } else {
      this.geometries.set(id, geometry);
      this.refCounts.set(id, 1);
    }
  }

  /**
   * Register a material
   */
  registerMaterial(id: string, material: THREE.Material): void {
    if (this.materials.has(id)) {
      this.incrementRef(id);
    } else {
      this.materials.set(id, material);
      this.refCounts.set(id, 1);
    }
  }

  /**
   * Increment reference count
   */
  incrementRef(id: string): void {
    const count = this.refCounts.get(id) || 0;
    this.refCounts.set(id, count + 1);
  }

  /**
   * Decrement reference count and dispose if reaches zero
   */
  decrementRef(id: string): void {
    const count = this.refCounts.get(id) || 0;
    if (count <= 1) {
      this.dispose(id);
    } else {
      this.refCounts.set(id, count - 1);
    }
  }

  /**
   * Dispose a specific resource
   */
  dispose(id: string): void {
    const texture = this.textures.get(id);
    if (texture) {
      texture.dispose();
      this.textures.delete(id);
    }

    const geometry = this.geometries.get(id);
    if (geometry) {
      geometry.dispose();
      this.geometries.delete(id);
    }

    const material = this.materials.get(id);
    if (material) {
      material.dispose();
      this.materials.delete(id);
    }

    this.refCounts.delete(id);
  }

  /**
   * Dispose all resources
   */
  disposeAll(): void {
    // Dispose textures
    for (const texture of this.textures.values()) {
      texture.dispose();
    }
    this.textures.clear();

    // Dispose geometries
    for (const geometry of this.geometries.values()) {
      geometry.dispose();
    }
    this.geometries.clear();

    // Dispose materials
    for (const material of this.materials.values()) {
      material.dispose();
    }
    this.materials.clear();

    this.refCounts.clear();
  }

  /**
   * Get memory usage statistics
   */
  getMemoryUsage(): {
    textures: number;
    geometries: number;
    materials: number;
    totalRefs: number;
  } {
    let totalRefs = 0;
    for (const count of this.refCounts.values()) {
      totalRefs += count;
    }

    return {
      textures: this.textures.size,
      geometries: this.geometries.size,
      materials: this.materials.size,
      totalRefs,
    };
  }

  /**
   * Check if a resource exists
   */
  has(id: string): boolean {
    return (
      this.textures.has(id) || this.geometries.has(id) || this.materials.has(id)
    );
  }

  /**
   * Get reference count for a resource
   */
  getRefCount(id: string): number {
    return this.refCounts.get(id) || 0;
  }
}

export const resourceManager = new ResourceManager();

