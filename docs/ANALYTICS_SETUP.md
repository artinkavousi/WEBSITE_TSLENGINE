# Analytics & Monitoring Setup Guide

This guide covers setting up analytics and monitoring for your TSL-KIT website.

---

## Overview

The website includes three monitoring systems:

1. **Cloudflare Web Analytics** - Privacy-friendly page view tracking
2. **Web Vitals Tracking** - Core Web Vitals performance monitoring
3. **Error Boundaries** - React error handling and reporting

---

## 1. Cloudflare Web Analytics

### What is it?

Cloudflare Web Analytics is a **free, privacy-friendly** analytics solution that:
- ✅ Doesn't use cookies
- ✅ Doesn't track personal information
- ✅ Respects user privacy
- ✅ Provides essential metrics (page views, unique visitors, countries, referrers)
- ✅ Works without JavaScript (server-side analytics)

### Setup

#### Step 1: Create a Cloudflare Account

1. Visit https://cloudflare.com
2. Sign up for a free account (if you don't have one)

#### Step 2: Enable Web Analytics

1. Log in to Cloudflare Dashboard
2. Click on your **Account** (top left)
3. Navigate to **Analytics** → **Web Analytics**
4. Click **"Add a site"**
5. Enter your domain name (e.g., `tsl-engine.com`)
6. Click **"Add site"**

#### Step 3: Get Your Token

After adding your site, you'll see a **beacon token**. It looks like:
```
abc123def456ghi789jkl012mno345
```

#### Step 4: Configure Your App

Add the token to `.env.local`:

```env
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your_token_here
```

**Example:**
```env
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=abc123def456ghi789jkl012mno345
```

#### Step 5: Restart Dev Server

```bash
cd apps/web
pnpm dev
```

#### Step 6: Verify

1. Visit your site (http://localhost:3000)
2. Open browser DevTools → Network tab
3. Look for a request to `cloudflareinsights.com/beacon.min.js`
4. If you see it, analytics is working!

### Production Deployment

When deploying to production:

1. Add the environment variable to your hosting platform:
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site settings → Environment variables
   - **Cloudflare Pages**: Settings → Environment variables

2. Set the variable:
   ```
   NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your_token_here
   ```

3. Redeploy your site

### Viewing Analytics

1. Go to Cloudflare Dashboard
2. Navigate to Analytics → Web Analytics
3. Select your site
4. View metrics:
   - Page views
   - Unique visitors
   - Top pages
   - Referrers
   - Countries
   - Browsers & Devices

---

## 2. Web Vitals Tracking

### What are Web Vitals?

Web Vitals are **Google's core metrics** for measuring website performance and user experience:

| Metric | Description | Good | Needs Improvement | Poor |
|--------|-------------|------|-------------------|------|
| **LCP** | Largest Contentful Paint | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **FID** | First Input Delay | ≤ 100ms | 100ms - 300ms | > 300ms |
| **CLS** | Cumulative Layout Shift | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| **FCP** | First Contentful Paint | ≤ 1.8s | 1.8s - 3.0s | > 3.0s |
| **TTFB** | Time to First Byte | ≤ 800ms | 800ms - 1.8s | > 1.8s |
| **INP** | Interaction to Next Paint | ≤ 200ms | 200ms - 500ms | > 500ms |

### Setup

**Good news:** Web Vitals tracking is **already enabled** and requires no configuration!

### How it Works

1. **Development**: Metrics are logged to the browser console
   ```
   [Web Vitals] LCP: { value: 1250, rating: 'good', id: 'v3-1234...' }
   [Web Vitals] CLS: { value: 45, rating: 'good', id: 'v3-5678...' }
   ```

2. **Production**: Metrics are automatically tracked by Cloudflare (if enabled)

### Custom Analytics Endpoint (Optional)

If you want to send Web Vitals to your own analytics service:

1. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://your-analytics-api.com/vitals
   ```

2. The metrics will be POSTed as JSON:
   ```json
   {
     "name": "LCP",
     "value": 1250,
     "rating": "good",
     "id": "v3-1234...",
     "timestamp": 1699999999999
   }
   ```

### Improving Web Vitals

#### LCP (Largest Contentful Paint)
- Optimize images (use Next.js Image component)
- Reduce server response time
- Preload critical resources
- Enable CDN caching

#### FID (First Input Delay)
- Minimize JavaScript execution
- Code split large bundles
- Use Web Workers for heavy tasks
- Defer non-critical JavaScript

#### CLS (Cumulative Layout Shift)
- Set explicit dimensions for images/videos
- Avoid inserting content above existing content
- Use CSS transform instead of layout properties
- Preload fonts

---

## 3. Error Boundaries

### What are they?

Error Boundaries are React components that **catch JavaScript errors** anywhere in their child component tree and display a fallback UI instead of crashing the entire app.

### How it Works

The website has two levels of error handling:

#### 1. Root Error Boundary

Wraps the entire app in `layout.tsx`. Catches any unhandled errors and displays a user-friendly error screen.

**Features:**
- Shows "Something went wrong" message
- Displays error details in development
- Provides "Refresh Page" button
- Logs errors to console (dev) or error tracking service (prod)

#### 2. Module Error Boundary

Can be used to wrap individual modules or components for isolated error handling.

**Usage:**
```tsx
import { ModuleErrorBoundary } from '@/components/ErrorBoundary';

<ModuleErrorBoundary>
  <YourComponent />
</ModuleErrorBoundary>
```

### Custom Error Handling

You can provide custom error handlers:

```tsx
<ErrorBoundary
  fallback={<CustomErrorUI />}
  onError={(error, errorInfo) => {
    // Send to your error tracking service
    console.error('Error caught:', error, errorInfo);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### Testing Error Boundaries

To test error boundaries in development:

```tsx
function TestError() {
  if (Math.random() > 0.5) {
    throw new Error('Test error!');
  }
  return <div>No error</div>;
}

// Use in your component
<ErrorBoundary>
  <TestError />
</ErrorBoundary>
```

---

## 4. Optional: Sentry Error Tracking

### What is Sentry?

Sentry is a comprehensive error tracking platform that provides:
- Real-time error alerts
- Stack traces with source maps
- User context and breadcrumbs
- Performance monitoring
- Release tracking

### Setup (Optional)

#### Step 1: Create Sentry Account

1. Visit https://sentry.io
2. Sign up for free account
3. Create a new project (select "Next.js")

#### Step 2: Get Your DSN

After creating project, you'll get a **DSN** (Data Source Name):
```
https://abc123@o123456.ingest.sentry.io/789012
```

#### Step 3: Install Sentry SDK

```bash
cd apps/web
pnpm add @sentry/nextjs
```

#### Step 4: Configure Sentry

Add to `.env.local`:
```env
NEXT_PUBLIC_SENTRY_DSN=your_dsn_here
```

#### Step 5: Update Error Boundary

In `components/ErrorBoundary.tsx`, uncomment the Sentry line:

```tsx
import * as Sentry from '@sentry/nextjs';

// In componentDidCatch:
if (process.env.NODE_ENV === 'production') {
  Sentry.captureException(error, { contexts: { react: errorInfo } });
}
```

---

## 5. Privacy & Compliance

### GDPR Compliance

All analytics services used are privacy-friendly:

1. **Cloudflare Web Analytics**
   - No cookies
   - No personal data collection
   - GDPR compliant by default

2. **Web Vitals**
   - Performance metrics only
   - No user identification
   - No personal data

3. **Error Tracking**
   - No personal data in errors
   - Stack traces only
   - Can be disabled

### Do Not Track (DNT)

The analytics system respects the **Do Not Track** browser setting by default.

To disable DNT respect (not recommended):

Edit `apps/web/lib/analytics/config.ts`:
```ts
privacy: {
  respectDNT: false, // Change to false
}
```

### Disabling Analytics

To completely disable analytics:

1. Remove all `NEXT_PUBLIC_*_ANALYTICS_*` environment variables
2. Analytics will be automatically disabled

---

## 6. Monitoring Dashboard (Production)

### Cloudflare Dashboard

After deploying to production with Cloudflare Analytics:

1. Visit https://dash.cloudflare.com
2. Go to Analytics → Web Analytics
3. Select your site
4. View real-time and historical data

### Metrics Available

- **Traffic**: Page views, unique visitors, visits
- **Geography**: Countries, regions
- **Sources**: Direct, referrers, search engines
- **Pages**: Top pages, page views per URL
- **Technology**: Browsers, OSes, devices

---

## 7. Troubleshooting

### Analytics Not Working

**Check 1: Environment Variable**
```bash
# In your terminal
echo $NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN
```
Should output your token. If empty, check `.env.local`.

**Check 2: Browser Console**
- Open DevTools → Console
- Look for analytics-related logs
- Check for errors

**Check 3: Network Tab**
- Open DevTools → Network tab
- Look for requests to `cloudflareinsights.com`
- If none, analytics isn't loaded

**Check 4: DNT Setting**
- Check if "Do Not Track" is enabled in your browser
- Analytics respects DNT by default

### Web Vitals Not Logging

**Check 1: Console**
- Open DevTools → Console
- Navigate around the site
- Look for `[Web Vitals]` logs

**Check 2: Node Environment**
- Web Vitals only log in development
- In production, they're sent to analytics services

### Error Boundary Not Catching

**Error Boundaries CANNOT catch:**
- Event handlers (use try/catch)
- Asynchronous code (setTimeout, promises)
- Server-side rendering errors
- Errors in the error boundary itself

**Error Boundaries CAN catch:**
- Render errors
- Lifecycle method errors
- Constructor errors in children

---

## 8. Best Practices

### Performance

1. **Use Cloudflare Analytics** - Zero performance impact
2. **Monitor Web Vitals** - Identify performance regressions early
3. **Lazy load analytics** - All analytics are loaded asynchronously

### Privacy

1. **No cookies** - All solutions are cookie-free
2. **Respect DNT** - Honor user privacy preferences
3. **Minimal data** - Only collect necessary metrics

### Error Handling

1. **User-friendly errors** - Show helpful messages, not stack traces
2. **Log everything** - Errors, warnings, and info in development
3. **Silent in production** - Don't expose errors to users

---

## Summary

### What's Enabled by Default

✅ **Error Boundaries** - Always active  
✅ **Web Vitals Tracking** - Always active  
⏳ **Cloudflare Analytics** - Requires token

### Setup Checklist

- [ ] Create Cloudflare account
- [ ] Add site to Web Analytics
- [ ] Copy beacon token
- [ ] Add `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` to `.env.local`
- [ ] Restart dev server
- [ ] Test analytics in browser DevTools
- [ ] Deploy to production with environment variable
- [ ] Verify analytics in Cloudflare Dashboard

---

## Additional Resources

- **Cloudflare Analytics**: https://www.cloudflare.com/web-analytics/
- **Web Vitals**: https://web.dev/vitals/
- **React Error Boundaries**: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
- **Sentry**: https://docs.sentry.io/platforms/javascript/guides/nextjs/

---

**Questions?** Check the Cloudflare or Next.js documentation, or open an issue!

