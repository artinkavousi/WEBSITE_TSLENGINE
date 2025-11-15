import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import Link from 'next/link';
import { getTemplateMetadata } from '@/templates';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title: 'Blog',
  description: 'Articles about WebGPU, TSL, and 3D graphics on the web. Learn about shader programming, creative coding, and modern web graphics.',
  path: '/blog',
});

export default function BlogPage() {
  // Sort posts by date (newest first)
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <main className="pointer-events-none flex min-h-screen flex-col items-center justify-start p-8">
      <div className="pointer-events-auto w-full max-w-4xl rounded-lg bg-black/50 p-8 text-white backdrop-blur-sm">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold">Blog</h1>
          <p className="mt-4 text-xl opacity-70">
            Exploring WebGPU, TSL, and 3D graphics on the web
          </p>
          <div className="mt-4 text-sm opacity-50">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => {
            const template = getTemplateMetadata(post.templateId);
            
            return (
              <Link
                key={post._id}
                href={post.url}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/30 p-6 transition-all hover:border-white/30 hover:bg-black/50"
              >
                {/* Template indicator */}
                {template && (
                  <div className="absolute right-4 top-4 rounded bg-white/10 px-2 py-1 text-xs opacity-50 group-hover:opacity-100">
                    {template.label}
                  </div>
                )}

                {/* Post content */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm opacity-70 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs opacity-50">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    
                    {post.author && <span>by {post.author}</span>}
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/10 px-2 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center gap-2 text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                  <span>Read more</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-12 opacity-50">
            <p>No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}

