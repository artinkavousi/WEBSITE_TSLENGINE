import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}

