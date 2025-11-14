'use client';

import { useEngineStore } from '@/lib/store';

export default function HomePage() {
  const backend = useEngineStore((state) => state.backend);
  const activeModuleId = useEngineStore((state) => state.activeModuleId);

  return (
    <main className="pointer-events-none flex min-h-screen flex-col items-start justify-start p-8">
      <div className="pointer-events-auto rounded-lg bg-black/50 p-6 text-white backdrop-blur-sm">
        <h1 className="text-4xl font-bold">TSL-KIT Engine</h1>
        <p className="mt-2 text-sm opacity-70">
          Backend: <span className="font-mono">{backend}</span>
        </p>
        <p className="mt-1 text-sm opacity-70">
          Active Module:{' '}
          <span className="font-mono">{activeModuleId || 'None'}</span>
        </p>
        <p className="mt-4 text-sm opacity-50">
          Phase 2: Core engine & R3F integration complete
        </p>
      </div>
    </main>
  );
}

