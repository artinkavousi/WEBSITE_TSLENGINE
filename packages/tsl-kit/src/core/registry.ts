// Module registry - Full implementation
import type { EngineModule } from './types';

export class ModuleRegistry {
  private modules = new Map<string, EngineModule>();

  /**
   * Register a module in the registry
   * @throws Error if module is invalid or already registered
   */
  register<T>(module: EngineModule<T>): void {
    this.validateModule(module);

    if (this.modules.has(module.id)) {
      throw new Error(`Module "${module.id}" is already registered`);
    }

    this.modules.set(module.id, module);
  }

  /**
   * Unregister a module from the registry
   * @returns true if module was found and removed
   */
  unregister(id: string): boolean {
    return this.modules.delete(id);
  }

  /**
   * Get a module by ID
   * @returns The module or undefined if not found
   */
  get(id: string): EngineModule | undefined {
    return this.modules.get(id);
  }

  /**
   * Check if a module is registered
   */
  has(id: string): boolean {
    return this.modules.has(id);
  }

  /**
   * List all registered modules
   */
  list(): EngineModule[] {
    return Array.from(this.modules.values());
  }

  /**
   * Find modules by kind (scene, postfx, material, sim, utility)
   */
  findByKind(kind: string): EngineModule[] {
    return this.list().filter((m) => m.caps.kind === kind);
  }

  /**
   * Find modules by tag
   */
  findByTag(tag: string): EngineModule[] {
    return this.list().filter((m) => m.meta.tags.includes(tag));
  }

  /**
   * Find modules by category
   */
  findByCategory(category: string): EngineModule[] {
    return this.list().filter((m) => m.meta.category === category);
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    const categories = new Set<string>();
    this.modules.forEach((m) => categories.add(m.meta.category));
    return Array.from(categories).sort();
  }

  /**
   * Get all tags
   */
  getTags(): string[] {
    const tags = new Set<string>();
    this.modules.forEach((m) => m.meta.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }

  /**
   * Clear all registered modules
   */
  clear(): void {
    this.modules.clear();
  }

  /**
   * Get registry size
   */
  get size(): number {
    return this.modules.size;
  }

  /**
   * Validate module structure
   * @throws Error if module is invalid
   */
  private validateModule(module: EngineModule): void {
    if (!module.id) {
      throw new Error('Module must have an id');
    }

    if (!module.meta) {
      throw new Error(`Module "${module.id}" must have meta`);
    }

    if (!module.meta.label) {
      throw new Error(`Module "${module.id}" must have meta.label`);
    }

    if (!module.meta.description) {
      throw new Error(`Module "${module.id}" must have meta.description`);
    }

    if (!module.meta.category) {
      throw new Error(`Module "${module.id}" must have meta.category`);
    }

    if (!Array.isArray(module.meta.tags)) {
      throw new Error(`Module "${module.id}" must have meta.tags array`);
    }

    if (!module.caps) {
      throw new Error(`Module "${module.id}" must have caps`);
    }

    if (!module.caps.kind) {
      throw new Error(`Module "${module.id}" must have caps.kind`);
    }

    const validKinds = ['scene', 'postfx', 'material', 'sim', 'utility'];
    if (!validKinds.includes(module.caps.kind)) {
      throw new Error(
        `Module "${module.id}" has invalid caps.kind "${module.caps.kind}". Must be one of: ${validKinds.join(', ')}`
      );
    }

    if (module.defaultParams === undefined) {
      throw new Error(`Module "${module.id}" must have defaultParams`);
    }

    if (!module.schema) {
      throw new Error(`Module "${module.id}" must have schema`);
    }

    if (typeof module.init !== 'function') {
      throw new Error(`Module "${module.id}" must have init function`);
    }

    if (typeof module.mount !== 'function') {
      throw new Error(`Module "${module.id}" must have mount function`);
    }
  }
}

export const moduleRegistry = new ModuleRegistry();

