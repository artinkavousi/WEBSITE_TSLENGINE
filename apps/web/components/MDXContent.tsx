'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';

interface MDXContentProps {
  code: string;
}

// Custom MDX components for styling
const mdxComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-8 mb-4 text-4xl font-bold text-white first:mt-0"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-8 mb-4 text-3xl font-bold text-white"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-6 mb-3 text-2xl font-bold text-white"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="my-4 text-base leading-relaxed text-white/90"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-4 list-disc space-y-2 pl-6 text-white/90"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 text-white/90"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-white/90" {...props}>
      {children}
    </li>
  ),
  a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-blue-400 underline transition-colors hover:text-blue-300"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code
    if (typeof children === 'string') {
      return (
        <code
          className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-blue-300"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Code block (handled by rehype-pretty-code)
    return <code {...props}>{children}</code>;
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-black/50 p-4 font-mono text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-blue-400 pl-4 italic text-white/70"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-white/20" {...props} />
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse border border-white/20 text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-white/20 bg-white/10 px-4 py-2 text-left font-bold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-white/20 px-4 py-2" {...props}>
      {children}
    </td>
  ),
};

export function MDXContent({ code }: MDXContentProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <div className="prose prose-invert max-w-none">
      <MDXContent components={mdxComponents} />
    </div>
  );
}

