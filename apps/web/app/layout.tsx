import type { Metadata } from 'next';
import './globals.css';
import dynamic from 'next/dynamic';

const PersistentCanvas = dynamic(() => import('@/components/PersistentCanvas'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'TSL-KIT Engine',
  description: 'WebGPU-powered engine with 150+ modules',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PersistentCanvas />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

