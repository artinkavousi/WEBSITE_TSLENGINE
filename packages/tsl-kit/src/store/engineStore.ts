import { create } from "zustand";

export type ModuleIdentifier = string;

interface EngineStoreState {
  activeModule: ModuleIdentifier | null;
  setActiveModule: (identifier: ModuleIdentifier | null) => void;
}

export const engineStore = create<EngineStoreState>((set) => ({
  activeModule: null,
  setActiveModule: (identifier) => set({ activeModule: identifier }),
}));
