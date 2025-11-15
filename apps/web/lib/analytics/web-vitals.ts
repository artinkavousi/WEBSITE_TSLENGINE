import type { Metric } from 'web-vitals';

/**
 * Web Vitals Tracking
 * 
 * Tracks Core Web Vitals and other performance metrics:
 * - CLS: Cumulative Layout Shift
 * - FID: First Input Delay
 * - FCP: First Contentful Paint
 * - LCP: Largest Contentful Paint
 * - TTFB: Time to First Byte
 * - INP: Interaction to Next Paint (new metric)
 * 
 * These metrics are automatically collected by Next.js.
 * This function reports them to the console (dev) or analytics service (prod).
 */

export function reportWebVitals(metric: Metric) {
  const { name, value, rating, id } = metric;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      rating,
      id,
    });
  }

  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_label: id,
        non_interaction: true,
      });
    }

    // Example: Send to custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          value,
          rating,
          id,
          timestamp: Date.now(),
        }),
      }).catch((err) => {
        // Silently fail - don't disrupt user experience
        console.error('Failed to send web vitals:', err);
      });
    }

    // Cloudflare Web Analytics automatically tracks some of these,
    // so we don't need to send duplicates if using Cloudflare
  }
}

/**
 * Get thresholds for Web Vitals metrics
 * Based on Google's recommendations
 */
export const WEB_VITALS_THRESHOLDS = {
  // Cumulative Layout Shift (no units)
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  // First Input Delay (milliseconds)
  FID: {
    good: 100,
    needsImprovement: 300,
  },
  // First Contentful Paint (milliseconds)
  FCP: {
    good: 1800,
    needsImprovement: 3000,
  },
  // Largest Contentful Paint (milliseconds)
  LCP: {
    good: 2500,
    needsImprovement: 4000,
  },
  // Time to First Byte (milliseconds)
  TTFB: {
    good: 800,
    needsImprovement: 1800,
  },
  // Interaction to Next Paint (milliseconds)
  INP: {
    good: 200,
    needsImprovement: 500,
  },
};

/**
 * Check if a metric value is good, needs improvement, or poor
 */
export function getMetricRating(
  name: Metric['name'],
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[name];
  
  if (!thresholds) {
    return 'good'; // Unknown metric, assume good
  }

  if (value <= thresholds.good) {
    return 'good';
  } else if (value <= thresholds.needsImprovement) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}

/**
 * Format metric value for display
 */
export function formatMetricValue(name: Metric['name'], value: number): string {
  if (name === 'CLS') {
    return value.toFixed(3);
  }
  return `${Math.round(value)}ms`;
}

