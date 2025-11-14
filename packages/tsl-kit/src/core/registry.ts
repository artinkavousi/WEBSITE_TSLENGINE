// Module registry - TODO: Implement in Phase 2
import type { EngineModule } from './types';

export class ModuleRegistry {
  private modules = new Map<string, EngineModule>();
  // TODO: Implement full functionality in Phase 2
}

export const moduleRegistry = new ModuleRegistry();

