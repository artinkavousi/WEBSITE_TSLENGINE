/**
 * Giscus Configuration
 * 
 * To set up Giscus for your repository:
 * 
 * 1. Enable GitHub Discussions in your repo settings
 * 2. Create a "Comments" category (Announcements type) in Discussions
 * 3. Install the Giscus app: https://github.com/apps/giscus
 * 4. Visit https://giscus.app to get your configuration values
 * 5. Update the values below with your repo's details
 * 
 * Note: The values below are placeholders. Replace them with your actual
 * repository and discussion IDs from giscus.app
 */

export const giscusConfig = {
  // Your GitHub repository in the format "username/repo"
  // Example: "tslkit/website"
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO || 'your-username/your-repo',
  
  // Repository ID - get from giscus.app
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || 'R_placeholder',
  
  // Discussion category name
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Comments',
  
  // Category ID - get from giscus.app
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'DIC_placeholder',
  
  // Mapping between page and discussion
  mapping: 'pathname' as const,
  
  // Strict title matching
  strict: '0' as const,
  
  // Enable reactions on the main post
  reactionsEnabled: '1' as const,
  
  // Emit discussion metadata
  emitMetadata: '0' as const,
  
  // Comment input position
  inputPosition: 'bottom' as const,
  
  // Theme - can be 'light', 'dark', 'dark_dimmed', etc.
  // Or a URL to a custom CSS theme
  theme: 'dark' as const,
  
  // Language
  lang: 'en' as const,
  
  // Loading strategy
  loading: 'lazy' as const,
};

/**
 * Check if Giscus is properly configured
 */
export function isGiscusConfigured(): boolean {
  return (
    giscusConfig.repo !== 'your-username/your-repo' &&
    giscusConfig.repoId !== 'R_placeholder' &&
    giscusConfig.categoryId !== 'DIC_placeholder'
  );
}

