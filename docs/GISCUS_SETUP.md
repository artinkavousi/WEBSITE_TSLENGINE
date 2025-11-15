# Giscus Comments Setup Guide

This guide will help you set up Giscus comments for your blog posts.

---

## What is Giscus?

Giscus is a comments system powered by GitHub Discussions. It allows visitors to leave comments on your blog posts using their GitHub accounts. All comments are stored in your repository's GitHub Discussions.

---

## Prerequisites

1. A **public** GitHub repository
2. Admin access to the repository
3. GitHub Discussions enabled in the repository

---

## Step-by-Step Setup

### 1. Enable GitHub Discussions

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll down to **Features**
4. Check **Discussions**
5. Click **Set up discussions**

### 2. Create a "Comments" Category

1. Go to the **Discussions** tab in your repository
2. Click **Categories** (or the pencil icon next to it)
3. Click **New category**
4. Set the following:
   - **Name**: `Comments` (or any name you prefer)
   - **Description**: `Comments from blog posts`
   - **Discussion Format**: Select **Announcement** (important!)
5. Click **Create**

### 3. Install the Giscus App

1. Visit https://github.com/apps/giscus
2. Click **Install**
3. Choose your repository
4. Grant the necessary permissions

### 4. Get Your Giscus Configuration

1. Visit https://giscus.app
2. Fill in the form:
   - **Repository**: Enter your repository in the format `username/repo`
   - **Page ↔️ Discussions Mapping**: Select `pathname` (recommended)
   - **Discussion Category**: Select the `Comments` category you created
   - **Theme**: Select `dark` (or your preferred theme)

3. Scroll down to the **Enable giscus** section
4. You'll see a script tag with several `data-` attributes. Copy these values:
   - `data-repo`
   - `data-repo-id`
   - `data-category`
   - `data-category-id`

### 5. Configure Your Application

Create a `.env.local` file in the `apps/web` directory (if it doesn't exist) and add:

```env
# Giscus Configuration
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_your_category_id
```

**Example:**
```env
NEXT_PUBLIC_GISCUS_REPO=tslkit/website
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOH1234567
NEXT_PUBLIC_GISCUS_CATEGORY=Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOH1234567890
```

### 6. Restart Your Development Server

```bash
cd apps/web
pnpm dev
```

### 7. Test the Comments

1. Navigate to any blog post (e.g., http://localhost:3000/blog/getting-started-with-webgpu)
2. Scroll to the bottom
3. You should see the Giscus comments section
4. Try leaving a test comment using your GitHub account

---

## Configuration Options

You can customize Giscus behavior by editing `apps/web/lib/giscus.config.ts`:

### Available Options

- **`mapping`**: How to map pages to discussions
  - `pathname` (recommended): Uses the URL path
  - `url`: Uses the full URL
  - `title`: Uses the page title
  - `og:title`: Uses the OpenGraph title
  
- **`theme`**: Visual theme
  - `dark` (default): Dark theme
  - `light`: Light theme
  - `dark_dimmed`: Dimmed dark theme
  - `preferred_color_scheme`: Matches user's system preference
  - Custom CSS URL: You can provide a URL to a custom theme
  
- **`inputPosition`**: Where to place the comment input box
  - `bottom` (default): Below comments
  - `top`: Above comments
  
- **`reactionsEnabled`**: Enable/disable reactions on the main post
  - `1` (default): Enabled
  - `0`: Disabled
  
- **`lang`**: Language for the UI
  - `en` (default): English
  - Many other languages supported (see giscus.app)

### Example Custom Configuration

```typescript
export const giscusConfig = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO || 'tslkit/website',
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || 'R_kgDOH1234567',
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Comments',
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'DIC_kwDOH1234567890',
  mapping: 'pathname' as const,
  strict: '0' as const,
  reactionsEnabled: '1' as const,
  emitMetadata: '0' as const,
  inputPosition: 'top' as const, // Changed to top
  theme: 'light' as const, // Changed to light theme
  lang: 'en' as const,
  loading: 'eager' as const, // Changed to eager loading
};
```

---

## Disabling Comments

If you want to temporarily disable comments without removing the code:

1. Remove the Giscus environment variables from `.env.local`
2. Or set placeholder values in `apps/web/lib/giscus.config.ts`

The comments section will automatically be hidden when `isGiscusConfigured()` returns `false`.

---

## Troubleshooting

### Comments Don't Appear

1. **Check the browser console** for errors
2. **Verify the repository is public** - Giscus doesn't work with private repos
3. **Check GitHub Discussions are enabled**
4. **Verify the Giscus app is installed** on your repository
5. **Check environment variables** are set correctly
6. **Try visiting the discussions** tab in your repo to see if they're being created

### Comments Appear But Can't Post

1. **Make sure you're logged in to GitHub**
2. **Check the category type** - it must be "Announcement" type
3. **Verify permissions** - the Giscus app needs write access to discussions

### Theme Doesn't Match

- The theme is set in `giscusConfig.theme`
- You can use a custom CSS theme by providing a URL
- Make sure your custom theme is accessible and uses HTTPS

---

## Production Deployment

When deploying to production, make sure to:

1. Set the environment variables in your hosting platform (e.g., Vercel, Netlify, Cloudflare Pages)
2. Use your production repository (not a test repo)
3. Test comments in production to ensure everything works

### Cloudflare Pages Example

1. Go to your Cloudflare Pages project
2. Navigate to **Settings** > **Environment variables**
3. Add the four Giscus variables:
   - `NEXT_PUBLIC_GISCUS_REPO`
   - `NEXT_PUBLIC_GISCUS_REPO_ID`
   - `NEXT_PUBLIC_GISCUS_CATEGORY`
   - `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
4. Redeploy your site

---

## Additional Resources

- **Giscus Website**: https://giscus.app
- **Giscus GitHub**: https://github.com/giscus/giscus
- **Giscus Documentation**: https://github.com/giscus/giscus/tree/main/ADVANCED-USAGE.md
- **GitHub Discussions**: https://docs.github.com/en/discussions

---

## Benefits of Using Giscus

✅ **Free and open-source**  
✅ **No database required** - comments stored in GitHub  
✅ **Spam protection** - requires GitHub account  
✅ **Markdown support** - full GitHub-flavored markdown  
✅ **Reactions and threading** - rich interaction  
✅ **Moderation** - use GitHub's moderation tools  
✅ **SEO-friendly** - comments are indexed  
✅ **Privacy-friendly** - no tracking

---

**Questions?** Open an issue or discussion in your repository!

