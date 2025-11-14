// Module runner - Full lifecycle implementation
import type * as THREE from 'three';
import type {
  ModuleContext,
  EngineModule,
  RendererCapabilities,
  ModuleEvents,
} from './types';
import { ModuleState } from './types';
import { moduleRegistry } from './registry';

export class ModuleRunner {
  private ctx: ModuleContext | null = null;
  private currentModule: EngineModule | null = null;
  private currentRoot: THREE.Object3D | null = null;
  private currentParams: any = null;
  private state: ModuleState = ModuleState.Unloaded;

  constructor(
    private scene: THREE.Scene,
    private renderer: THREE.WebGLRenderer | any,
    private capabilities: RendererCapabilities,
    private events: ModuleEvents
  ) {}

  /**
   * Load and mount a module
   * @param moduleId - ID of the module to load
   * @param params - Optional parameters to override defaults
   * @param getParam - Function to get parameter values
   * @param setParam - Function to set parameter values
   */
  async load(
    moduleId: string,
    params?: any,
    getParam?: <T>(path: string) => T,
    setParam?: (path: string, value: any) => void
  ): Promise<void> {
    // Unload current module if any
    await this.unload();

    // Get module from registry
    const module = moduleRegistry.get(moduleId);
    if (!module) {
      throw new Error(`Module "${moduleId}" not found in registry`);
    }

    // Check capabilities
    this.checkCapabilities(module);

    // Set state
    this.state = ModuleState.Loading;

    try {
      // Create isolated root container
      const root = new (await import('three')).Object3D();
      root.name = `module-${module.id}`;

      // Create context
      this.ctx = {
        scene: this.scene,
        root,
        renderer: this.renderer,
        capabilities: this.capabilities,
        events: this.events,
        getParam: getParam || (() => undefined as any),
        setParam: setParam || (() => {}),
      };

      // Merge params with defaults
      const finalParams = { ...module.defaultParams, ...params };

      // Init module
      await module.init(this.ctx, finalParams);

      this.state = ModuleState.Loaded;

      // Mount module
      await module.mount(this.ctx, finalParams);

      // Add root to scene
      this.scene.add(root);

      // Store state
      this.currentModule = module;
      this.currentRoot = root;
      this.currentParams = finalParams;
      this.state = ModuleState.Mounted;
    } catch (error) {
      this.state = ModuleState.Error;
      // Clean up on error
      if (this.currentRoot && this.scene.children.includes(this.currentRoot)) {
        this.scene.remove(this.currentRoot);
      }
      this.currentModule = null;
      this.currentRoot = null;
      this.currentParams = null;
      this.ctx = null;
      throw new Error(`Module load failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Update the current module (called every frame)
   * @param dt - Delta time in seconds
   * @returns true if frame needs invalidation
   */
  tick(dt: number): boolean {
    if (!this.ctx || !this.currentModule || this.state !== ModuleState.Mounted) {
      return false;
    }

    if (this.currentModule.update) {
      try {
        const needsInvalidate = this.currentModule.update(this.ctx, dt, this.currentParams);
        return !!needsInvalidate;
      } catch (error) {
        console.error('Module update error:', error);
        return false;
      }
    }

    return false;
  }

  /**
   * Update module parameters
   * @param params - New parameter values (merged with existing)
   */
  setParams(params: any): void {
    if (!this.currentParams) return;
    Object.assign(this.currentParams, params);
  }

  /**
   * Get current module parameters
   */
  getParams(): any {
    return this.currentParams ? { ...this.currentParams } : null;
  }

  /**
   * Unload the current module
   */
  async unload(): Promise<void> {
    if (!this.ctx || !this.currentModule) return;

    try {
      // Unmount
      if (this.currentModule.unmount) {
        this.currentModule.unmount(this.ctx);
      }

      // Remove root from scene
      if (this.currentRoot) {
        this.scene.remove(this.currentRoot);
      }

      // Dispose
      if (this.currentModule.dispose) {
        this.currentModule.dispose(this.ctx);
      }
    } catch (error) {
      console.error('Module unload error:', error);
    } finally {
      // Clear state
      this.ctx = null;
      this.currentModule = null;
      this.currentRoot = null;
      this.currentParams = null;
      this.state = ModuleState.Unloaded;
    }
  }

  /**
   * Dispose the runner and cleanup
   */
  async dispose(): Promise<void> {
    await this.unload();
  }

  /**
   * Get current state
   */
  getState(): ModuleState {
    return this.state;
  }

  /**
   * Get current module
   */
  getCurrentModule(): EngineModule | null {
    return this.currentModule;
  }

  /**
   * Get current module ID
   */
  getCurrentModuleId(): string | null {
    return this.currentModule?.id || null;
  }

  /**
   * Check if a module is currently loaded
   */
  isLoaded(): boolean {
    return this.state === ModuleState.Mounted;
  }

  /**
   * Check module capabilities against renderer
   * @throws Error if module requirements not met
   */
  private checkCapabilities(module: EngineModule): void {
    // Check backend compatibility
    if (module.caps.backends && module.caps.backends.length > 0) {
      if (!module.caps.backends.includes(this.capabilities.backend)) {
        throw new Error(
          `Module "${module.id}" requires ${module.caps.backends.join(' or ')} but current backend is ${this.capabilities.backend}`
        );
      }
    }

    // Check compute shader requirement
    if (module.caps.requiresCompute && !this.capabilities.computeShaders) {
      throw new Error(`Module "${module.id}" requires compute shaders but they are not available`);
    }

    // Check storage buffer requirement
    if (module.caps.requiresStorage && !this.capabilities.storageBuffers) {
      throw new Error(
        `Module "${module.id}" requires storage buffers but they are not available`
      );
    }
  }
}


