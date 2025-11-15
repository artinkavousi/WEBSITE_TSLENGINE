import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXContent } from '@/components/MDXContent';
import PostTemplate from '@/components/PostTemplate';
import ReadingProgress from '@/components/ReadingProgress';
import Comments from '@/components/Comments';
import { generatePostMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/metadata';
import { giscusConfig, isGiscusConfigured } from '@/lib/giscus.config';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all posts
export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return generatePostMetadata(post);
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post || !post.published) {
    notFound();
  }

  // Generate JSON-LD structured data
  const articleJsonLd = generateArticleJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: post.url },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* 3D Template Background */}
      <PostTemplate
        templateId={post.templateId}
        styleId={post.styleId}
        sceneProps={post.sceneProps}
      />

      {/* Post Content */}
      <main className="pointer-events-none relative z-10 flex min-h-screen flex-col items-center justify-start">
        {/* Hero Section */}
        <div className="w-full px-8 pt-24 pb-12 text-center">
          <div className="pointer-events-auto mx-auto max-w-3xl rounded-lg bg-black/50 p-8 backdrop-blur-sm">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {post.title}
            </h1>

            {/* Description */}
            <p className="mt-4 text-xl text-white/70">{post.description}</p>

            {/* Meta */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/50">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.author && (
                <>
                  <span>•</span>
                  <span>by {post.author}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="w-full px-8 pb-12">
          <div className="pointer-events-auto mx-auto max-w-3xl rounded-lg bg-black/50 p-8 text-white backdrop-blur-sm md:p-12">
            <MDXContent code={post.body.code} />
          </div>
        </article>

        {/* Comments Section */}
        {isGiscusConfigured() && (
          <div className="w-full px-8 pb-12">
            <div className="pointer-events-auto mx-auto max-w-3xl rounded-lg bg-black/50 p-8 backdrop-blur-sm">
              <h2 className="mb-6 text-2xl font-bold text-white">Comments</h2>
              <Comments
                repo={giscusConfig.repo}
                repoId={giscusConfig.repoId}
                category={giscusConfig.category}
                categoryId={giscusConfig.categoryId}
                mapping={giscusConfig.mapping}
                strict={giscusConfig.strict}
                reactionsEnabled={giscusConfig.reactionsEnabled}
                emitMetadata={giscusConfig.emitMetadata}
                inputPosition={giscusConfig.inputPosition}
                theme={giscusConfig.theme}
                lang={giscusConfig.lang}
                loading={giscusConfig.loading}
              />
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="w-full px-8 pb-12">
          <div className="pointer-events-auto mx-auto max-w-3xl text-center">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-white transition-all hover:bg-white/20"
            >
              <span>←</span>
              <span>Back to Blog</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

