'use client';

import { useEffect, useRef } from 'react';

interface CommentsProps {
  /**
   * The repo to use for discussions
   * Format: "username/repo"
   * Example: "tslkit/website"
   */
  repo: string;
  
  /**
   * The discussions category to use
   * Must be an "Announcements" type category
   */
  repoId: string;
  category: string;
  categoryId: string;
  
  /**
   * Mapping between the embedding page and the discussion
   * Options: "pathname", "url", "title", "og:title", "specific", "number"
   */
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  
  /**
   * Use strict title matching
   */
  strict?: '0' | '1';
  
  /**
   * Enable reactions for the main post
   */
  reactionsEnabled?: '0' | '1';
  
  /**
   * Emit discussion metadata
   */
  emitMetadata?: '0' | '1';
  
  /**
   * Input position
   */
  inputPosition?: 'top' | 'bottom';
  
  /**
   * Theme
   */
  theme?: string;
  
  /**
   * Language
   */
  lang?: string;
  
  /**
   * Loading strategy
   */
  loading?: 'lazy' | 'eager';
}

export default function Comments({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  strict = '0',
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'bottom',
  theme = 'dark',
  lang = 'en',
  loading = 'lazy',
}: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    // Clear any existing giscus
    commentsRef.current.innerHTML = '';

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-strict', strict);
    script.setAttribute('data-reactions-enabled', reactionsEnabled);
    script.setAttribute('data-emit-metadata', emitMetadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', loading);
    script.crossOrigin = 'anonymous';
    script.async = true;

    commentsRef.current.appendChild(script);

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, [repo, repoId, category, categoryId, mapping, strict, reactionsEnabled, emitMetadata, inputPosition, theme, lang, loading]);

  return (
    <div className="pointer-events-auto w-full">
      <div ref={commentsRef} className="giscus" />
    </div>
  );
}

