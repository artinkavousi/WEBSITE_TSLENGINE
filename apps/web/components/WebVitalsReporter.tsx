'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { reportWebVitals } from '@/lib/analytics/web-vitals';

/**
 * WebVitalsReporter Component
 * 
 * Uses Next.js's built-in Web Vitals hook to report metrics.
 * Must be a Client Component.
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    reportWebVitals(metric);
  });

  return null;
}

