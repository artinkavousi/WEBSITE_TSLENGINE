import { describe, it, expect, beforeEach } from 'vitest';
import { ModuleRegistry } from '../registry';
import type { EngineModule } from '../types';

describe('ModuleRegistry', () => {
  let registry: ModuleRegistry;

  const createTestModule = (id: string): EngineModule => ({
    id,
    meta: {
      id,
      label: `Test ${id}`,
      description: 'Test module',
      category: 'Test',
      tags: ['test'],
    },
    caps: {
      kind: 'scene',
    },
    defaultParams: {},
    schema: {},
    init: async () => {},
    mount: async () => {},
  });

  beforeEach(() => {
    registry = new ModuleRegistry();
  });

  describe('register', () => {
    it('should register a valid module', () => {
      const module = createTestModule('test-1');
      registry.register(module);
      expect(registry.has('test-1')).toBe(true);
      expect(registry.size).toBe(1);
    });

    it('should throw if module is already registered', () => {
      const module = createTestModule('test-1');
      registry.register(module);
      expect(() => registry.register(module)).toThrow('already registered');
    });

    it('should throw if module is invalid', () => {
      expect(() => registry.register({} as any)).toThrow();
    });
  });

  describe('unregister', () => {
    it('should unregister a module', () => {
      const module = createTestModule('test-1');
      registry.register(module);
      expect(registry.unregister('test-1')).toBe(true);
      expect(registry.has('test-1')).toBe(false);
    });

    it('should return false if module does not exist', () => {
      expect(registry.unregister('nonexistent')).toBe(false);
    });
  });

  describe('get', () => {
    it('should return a registered module', () => {
      const module = createTestModule('test-1');
      registry.register(module);
      expect(registry.get('test-1')).toBe(module);
    });

    it('should return undefined for nonexistent module', () => {
      expect(registry.get('nonexistent')).toBeUndefined();
    });
  });

  describe('list', () => {
    it('should return all registered modules', () => {
      registry.register(createTestModule('test-1'));
      registry.register(createTestModule('test-2'));
      expect(registry.list()).toHaveLength(2);
    });

    it('should return empty array when no modules registered', () => {
      expect(registry.list()).toHaveLength(0);
    });
  });

  describe('findByKind', () => {
    it('should find modules by kind', () => {
      const module1 = createTestModule('test-1');
      module1.caps.kind = 'scene';
      const module2 = createTestModule('test-2');
      module2.caps.kind = 'postfx';

      registry.register(module1);
      registry.register(module2);

      expect(registry.findByKind('scene')).toHaveLength(1);
      expect(registry.findByKind('postfx')).toHaveLength(1);
    });
  });

  describe('findByTag', () => {
    it('should find modules by tag', () => {
      const module1 = createTestModule('test-1');
      module1.meta.tags = ['test', 'advanced'];
      const module2 = createTestModule('test-2');
      module2.meta.tags = ['test', 'basic'];

      registry.register(module1);
      registry.register(module2);

      expect(registry.findByTag('test')).toHaveLength(2);
      expect(registry.findByTag('advanced')).toHaveLength(1);
      expect(registry.findByTag('basic')).toHaveLength(1);
    });
  });

  describe('findByCategory', () => {
    it('should find modules by category', () => {
      const module1 = createTestModule('test-1');
      module1.meta.category = 'Materials';
      const module2 = createTestModule('test-2');
      module2.meta.category = 'PostFX';

      registry.register(module1);
      registry.register(module2);

      expect(registry.findByCategory('Materials')).toHaveLength(1);
      expect(registry.findByCategory('PostFX')).toHaveLength(1);
    });
  });

  describe('getCategories', () => {
    it('should return unique categories sorted', () => {
      const module1 = createTestModule('test-1');
      module1.meta.category = 'Materials';
      const module2 = createTestModule('test-2');
      module2.meta.category = 'PostFX';
      const module3 = createTestModule('test-3');
      module3.meta.category = 'Materials';

      registry.register(module1);
      registry.register(module2);
      registry.register(module3);

      const categories = registry.getCategories();
      expect(categories).toEqual(['Materials', 'PostFX']);
    });
  });

  describe('getTags', () => {
    it('should return unique tags sorted', () => {
      const module1 = createTestModule('test-1');
      module1.meta.tags = ['test', 'advanced'];
      const module2 = createTestModule('test-2');
      module2.meta.tags = ['test', 'basic', 'shader'];

      registry.register(module1);
      registry.register(module2);

      const tags = registry.getTags();
      expect(tags).toEqual(['advanced', 'basic', 'shader', 'test']);
    });
  });

  describe('clear', () => {
    it('should remove all modules', () => {
      registry.register(createTestModule('test-1'));
      registry.register(createTestModule('test-2'));
      registry.clear();
      expect(registry.size).toBe(0);
      expect(registry.list()).toHaveLength(0);
    });
  });

  describe('validation', () => {
    it('should validate caps.kind values', () => {
      const module = createTestModule('test-1');
      module.caps.kind = 'invalid' as any;
      expect(() => registry.register(module)).toThrow('invalid caps.kind');
    });

    it('should require init function', () => {
      const module = createTestModule('test-1');
      delete (module as any).init;
      expect(() => registry.register(module)).toThrow('must have init function');
    });

    it('should require mount function', () => {
      const module = createTestModule('test-1');
      delete (module as any).mount;
      expect(() => registry.register(module)).toThrow('must have mount function');
    });
  });
});

