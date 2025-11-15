import ClientCanvasWrapper from '@/components/ClientCanvasWrapper';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ModuleControls from '@/components/ModuleControls';
import { WebVitalsReporter } from '@/components/WebVitalsReporter';
import { CloudflareAnalytics } from '@/lib/analytics/cloudflare';
import { generateWebsiteJsonLd, siteConfig } from '@/lib/seo/metadata';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'WebGPU',
    'TSL',
    'Three.js',
    '3D Graphics',
    'Shader Programming',
    'Creative Coding',
    'React Three Fiber',
  ],
  authors: [{ name: 'TSL-KIT Team' }],
  creator: 'TSL-KIT Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <ErrorBoundary>
          <ClientCanvasWrapper />
          <ModuleControls />
          <div className="relative z-10">{children}</div>
        </ErrorBoundary>
        <CloudflareAnalytics />
        <WebVitalsReporter />
      </body>
    </html>
  );
}

