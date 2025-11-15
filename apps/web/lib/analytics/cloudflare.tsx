'use client';

import { useEffect } from 'react';

/**
 * Cloudflare Web Analytics
 * 
 * A privacy-friendly analytics solution that:
 * - Doesn't use cookies
 * - Doesn't track personal information
 * - Is free for all Cloudflare users
 * - Provides essential metrics (page views, unique visitors, etc.)
 * 
 * Setup:
 * 1. Go to Cloudflare Dashboard > Account > Analytics > Web Analytics
 * 2. Click "Add a site" and enter your domain
 * 3. Copy the beacon token
 * 4. Add to .env.local: NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your_token
 */

interface CloudflareAnalyticsProps {
  token?: string;
}

export function CloudflareAnalytics({ token }: CloudflareAnalyticsProps) {
  useEffect(() => {
    const analyticsToken = token || process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;
    
    if (!analyticsToken || typeof window === 'undefined') {
      return;
    }

    // Check if script already exists
    if (document.querySelector('script[data-cf-beacon]')) {
      return;
    }

    // Create and inject the Cloudflare analytics script
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: analyticsToken }));
    
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector('script[data-cf-beacon]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [token]);

  return null;
}

/**
 * Check if Cloudflare Analytics is configured
 */
export function isCloudflareAnalyticsConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;
}

/**
 * Track custom events (if needed in the future)
 * Note: Cloudflare Web Analytics automatically tracks page views
 */
export function trackEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  
  // For now, log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, data);
  }
  
  // Custom event tracking can be implemented here if Cloudflare adds support
  // or if you want to send events to another service
}

