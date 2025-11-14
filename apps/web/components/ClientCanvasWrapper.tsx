'use client';

import dynamic from 'next/dynamic';

const PersistentCanvas = dynamic(() => import('./PersistentCanvas'), {
  ssr: false,
});

export default function ClientCanvasWrapper() {
  return <PersistentCanvas />;
}

