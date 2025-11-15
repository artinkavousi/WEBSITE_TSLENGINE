/**
 * Analytics Configuration
 * 
 * Central configuration for all analytics services
 */

export const analyticsConfig = {
  /**
   * Cloudflare Web Analytics
   * Get token from: https://dash.cloudflare.com -> Account -> Analytics -> Web Analytics
   */
  cloudflare: {
    enabled: !!process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN,
    token: process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN,
  },

  /**
   * Sentry Error Tracking (optional)
   * Get DSN from: https://sentry.io
   */
  sentry: {
    enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    // Sample rate for performance monitoring (0.0 to 1.0)
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  },

  /**
   * Google Analytics (optional)
   * Get tracking ID from: https://analytics.google.com
   */
  googleAnalytics: {
    enabled: !!process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  },

  /**
   * Web Vitals Tracking
   * Always enabled
   */
  webVitals: {
    enabled: true,
    // Send to custom endpoint (optional)
    endpoint: process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT,
  },

  /**
   * Privacy Settings
   */
  privacy: {
    // Respect Do Not Track browser setting
    respectDNT: true,
    // Enable in development
    enableInDev: false,
  },
};

/**
 * Check if any analytics service is configured
 */
export function isAnalyticsEnabled(): boolean {
  if (process.env.NODE_ENV === 'development' && !analyticsConfig.privacy.enableInDev) {
    return false;
  }

  // Check if DNT is enabled
  if (analyticsConfig.privacy.respectDNT && typeof navigator !== 'undefined') {
    // @ts-ignore - doNotTrack is not in TS types but exists in browsers
    if (navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes') {
      return false;
    }
  }

  return (
    analyticsConfig.cloudflare.enabled ||
    analyticsConfig.sentry.enabled ||
    analyticsConfig.googleAnalytics.enabled
  );
}

/**
 * Get list of enabled analytics services
 */
export function getEnabledServices(): string[] {
  const services: string[] = [];

  if (analyticsConfig.cloudflare.enabled) {
    services.push('Cloudflare Web Analytics');
  }

  if (analyticsConfig.sentry.enabled) {
    services.push('Sentry');
  }

  if (analyticsConfig.googleAnalytics.enabled) {
    services.push('Google Analytics');
  }

  if (analyticsConfig.webVitals.enabled) {
    services.push('Web Vitals');
  }

  return services;
}

