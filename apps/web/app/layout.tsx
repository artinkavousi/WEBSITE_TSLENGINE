import type { Metadata } from 'next';
import './globals.css';
import ClientCanvasWrapper from '@/components/ClientCanvasWrapper';

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
        <ClientCanvasWrapper />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

