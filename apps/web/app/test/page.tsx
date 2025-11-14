'use client';

import { useEngineStore } from '@/lib/store';
import { moduleRegistry } from '@tsl-kit/engine';

export default function TestPage() {
  const selectModule = useEngineStore((state) => state.selectModule);
  const activeModuleId = useEngineStore((state) => state.activeModuleId);
  const backend = useEngineStore((state) => state.backend);

  const modules = moduleRegistry.list();

  const handleModuleClick = (moduleId: string) => {
    const module = moduleRegistry.get(moduleId);
    if (module) {
      selectModule(moduleId, module.defaultParams);
    }
  };

  return (
    <main className="pointer-events-auto fixed left-4 top-4 z-20 max-h-[90vh] w-80 overflow-y-auto rounded-lg bg-black/80 p-4 text-white backdrop-blur-md">
      <h1 className="mb-4 text-2xl font-bold">Module Test Panel</h1>
      
      <div className="mb-4 rounded bg-blue-900/50 p-3">
        <p className="text-sm">
          <strong>Backend:</strong> {backend}
        </p>
        <p className="text-sm">
          <strong>Active:</strong> {activeModuleId || 'None'}
        </p>
        <p className="text-sm">
          <strong>Total:</strong> {modules.length} modules
        </p>
      </div>

      <div className="space-y-2">
        {modules.map((module) => {
          const isActive = module.id === activeModuleId;
          
          return (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className={`w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                isActive
                  ? 'bg-green-600 font-bold'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="font-semibold">{module.meta.label}</div>
              <div className="text-xs opacity-70">{module.meta.category}</div>
              <div className="text-xs opacity-50">{module.id}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded bg-yellow-900/50 p-2 text-xs">
        <p className="font-bold">Instructions:</p>
        <p>Click any module to load it. Use mouse to orbit camera.</p>
      </div>
    </main>
  );
}

