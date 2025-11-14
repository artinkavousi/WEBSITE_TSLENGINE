import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResourceManager } from '../resources';
import * as THREE from 'three';

describe('ResourceManager', () => {
  let manager: ResourceManager;

  beforeEach(() => {
    manager = new ResourceManager();
  });

  describe('texture management', () => {
    it('should register and track textures', () => {
      const texture = new THREE.Texture();
      texture.dispose = vi.fn();

      manager.registerTexture('tex-1', texture);

      expect(manager.has('tex-1')).toBe(true);
      expect(manager.getRefCount('tex-1')).toBe(1);
    });

    it('should increment ref count on duplicate registration', () => {
      const texture = new THREE.Texture();
      
      manager.registerTexture('tex-1', texture);
      manager.registerTexture('tex-1', texture);

      expect(manager.getRefCount('tex-1')).toBe(2);
    });

    it('should dispose texture when ref count reaches zero', () => {
      const texture = new THREE.Texture();
      texture.dispose = vi.fn();

      manager.registerTexture('tex-1', texture);
      manager.decrementRef('tex-1');

      expect(texture.dispose).toHaveBeenCalled();
      expect(manager.has('tex-1')).toBe(false);
    });
  });

  describe('geometry management', () => {
    it('should register and track geometries', () => {
      const geometry = new THREE.BoxGeometry();
      geometry.dispose = vi.fn();

      manager.registerGeometry('geo-1', geometry);

      expect(manager.has('geo-1')).toBe(true);
      expect(manager.getRefCount('geo-1')).toBe(1);
    });

    it('should dispose geometry when ref count reaches zero', () => {
      const geometry = new THREE.BoxGeometry();
      geometry.dispose = vi.fn();

      manager.registerGeometry('geo-1', geometry);
      manager.decrementRef('geo-1');

      expect(geometry.dispose).toHaveBeenCalled();
      expect(manager.has('geo-1')).toBe(false);
    });
  });

  describe('material management', () => {
    it('should register and track materials', () => {
      const material = new THREE.MeshBasicMaterial();
      material.dispose = vi.fn();

      manager.registerMaterial('mat-1', material);

      expect(manager.has('mat-1')).toBe(true);
      expect(manager.getRefCount('mat-1')).toBe(1);
    });

    it('should dispose material when ref count reaches zero', () => {
      const material = new THREE.MeshBasicMaterial();
      material.dispose = vi.fn();

      manager.registerMaterial('mat-1', material);
      manager.decrementRef('mat-1');

      expect(material.dispose).toHaveBeenCalled();
      expect(manager.has('mat-1')).toBe(false);
    });
  });

  describe('reference counting', () => {
    it('should decrement ref count without disposing', () => {
      const texture = new THREE.Texture();
      texture.dispose = vi.fn();

      manager.registerTexture('tex-1', texture);
      manager.incrementRef('tex-1');
      expect(manager.getRefCount('tex-1')).toBe(2);

      manager.decrementRef('tex-1');
      expect(manager.getRefCount('tex-1')).toBe(1);
      expect(texture.dispose).not.toHaveBeenCalled();
      expect(manager.has('tex-1')).toBe(true);
    });
  });

  describe('dispose', () => {
    it('should dispose a specific resource', () => {
      const texture = new THREE.Texture();
      texture.dispose = vi.fn();

      manager.registerTexture('tex-1', texture);
      manager.dispose('tex-1');

      expect(texture.dispose).toHaveBeenCalled();
      expect(manager.has('tex-1')).toBe(false);
    });
  });

  describe('disposeAll', () => {
    it('should dispose all resources', () => {
      const texture = new THREE.Texture();
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial();

      texture.dispose = vi.fn();
      geometry.dispose = vi.fn();
      material.dispose = vi.fn();

      manager.registerTexture('tex-1', texture);
      manager.registerGeometry('geo-1', geometry);
      manager.registerMaterial('mat-1', material);

      manager.disposeAll();

      expect(texture.dispose).toHaveBeenCalled();
      expect(geometry.dispose).toHaveBeenCalled();
      expect(material.dispose).toHaveBeenCalled();
      expect(manager.getMemoryUsage().textures).toBe(0);
      expect(manager.getMemoryUsage().geometries).toBe(0);
      expect(manager.getMemoryUsage().materials).toBe(0);
    });
  });

  describe('getMemoryUsage', () => {
    it('should return memory usage statistics', () => {
      manager.registerTexture('tex-1', new THREE.Texture());
      manager.registerGeometry('geo-1', new THREE.BoxGeometry());
      manager.registerMaterial('mat-1', new THREE.MeshBasicMaterial());
      manager.incrementRef('tex-1');

      const usage = manager.getMemoryUsage();

      expect(usage.textures).toBe(1);
      expect(usage.geometries).toBe(1);
      expect(usage.materials).toBe(1);
      expect(usage.totalRefs).toBe(4); // 2 for tex-1, 1 each for geo and mat
    });
  });
});

