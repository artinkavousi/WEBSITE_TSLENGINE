import { Metadata } from 'next';
import type { Post } from 'contentlayer/generated';

const siteConfig = {
  name: 'TSL-KIT Engine',
  description: 'WebGPU-powered engine with 150+ modules and an engine-first showcase website',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og/default.png',
  twitterHandle: '@tslkit',
};

/**
 * Generate metadata for blog posts
 */
export function generatePostMetadata(post: Post): Metadata {
  const url = `${siteConfig.url}${post.url}`;
  const ogImage = post.thumbnail || siteConfig.ogImage;

  return {
    title: post.title,
    description: post.description,
    authors: post.author ? [{ name: post.author }] : undefined,
    keywords: post.tags,
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      images: [
        {
          url: `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteConfig.url}${ogImage}`],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate metadata for pages
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = ogImage || siteConfig.ogImage;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [
        {
          url: `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}${image}`],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data for blog posts
 */
export function generateArticleJsonLd(post: Post) {
  const baseUrl = siteConfig.url;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.thumbnail ? `${baseUrl}${post.thumbnail}` : `${baseUrl}${siteConfig.ogImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'TSL-KIT Team',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${post.url}`,
    },
    keywords: post.tags?.join(', '),
  };
}

/**
 * Generate JSON-LD for website/organization
 */
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD for breadcrumbs
 */
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export { siteConfig };

