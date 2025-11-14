'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Helper functions for nested parameter access
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current === undefined || current === null) {
      return undefined;
    }
    current = current[key];
  }
  return current;
}

function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

interface EngineStore {
  // Engine configuration
  backend: 'auto' | 'webgpu' | 'webgl';
  fpsCap: number;
  
  // Module state
  activeModuleId: string | null;
  moduleParams: Record<string, any>;
  
  // Presets
  presets: Record<string, { moduleId: string; params: any }>;
  
  // Actions
  setBackend: (backend: 'auto' | 'webgpu' | 'webgl') => void;
  setFpsCap: (fps: number) => void;
  selectModule: (id: string, params?: any) => void;
  setParam: (path: string, value: any) => void;
  getParam: (path: string) => any;
  savePreset: (name: string) => void;
  loadPreset: (name: string) => void;
  deletePreset: (name: string) => void;
  listPresets: () => string[];
  clearModule: () => void;
}

export const useEngineStore = create<EngineStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        backend: 'webgpu', // Explicitly use WebGPU
        fpsCap: 60,
        activeModuleId: null,
        moduleParams: {},
        presets: {},

        // Actions
        setBackend: (backend) => {
          set({ backend });
        },

        setFpsCap: (fps) => {
          set({ fpsCap: Math.max(30, Math.min(144, fps)) });
        },

        selectModule: (id, params = {}) => {
          set({
            activeModuleId: id,
            moduleParams: params,
          });
        },

        setParam: (path, value) => {
          set((state) => {
            const newParams = { ...state.moduleParams };
            setNestedValue(newParams, path, value);
            return { moduleParams: newParams };
          });
        },

        getParam: (path) => {
          const params = get().moduleParams;
          return getNestedValue(params, path);
        },

        savePreset: (name) => {
          const { activeModuleId, moduleParams } = get();
          if (!activeModuleId) {
            console.warn('Cannot save preset: no active module');
            return;
          }

          set((state) => ({
            presets: {
              ...state.presets,
              [name]: {
                moduleId: activeModuleId,
                params: { ...moduleParams },
              },
            },
          }));
        },

        loadPreset: (name) => {
          const preset = get().presets[name];
          if (!preset) {
            console.warn(`Preset "${name}" not found`);
            return;
          }

          set({
            activeModuleId: preset.moduleId,
            moduleParams: { ...preset.params },
          });
        },

        deletePreset: (name) => {
          set((state) => {
            const newPresets = { ...state.presets };
            delete newPresets[name];
            return { presets: newPresets };
          });
        },

        listPresets: () => {
          return Object.keys(get().presets);
        },

        clearModule: () => {
          set({
            activeModuleId: null,
            moduleParams: {},
          });
        },
      }),
      {
        name: 'engine-store',
        partialize: (state) => ({
          backend: state.backend,
          fpsCap: state.fpsCap,
          presets: state.presets,
        }),
      }
    )
  )
);

