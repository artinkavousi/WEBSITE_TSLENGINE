"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

type MDXContentProps = {
  code: string;
};

const Anchor = ({ href = "", children, ...rest }: ComponentProps<"a">) => {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children as ReactNode}
    </Link>
  );
};

const components = {
  a: Anchor,
  pre: ({ className = "", ...rest }: ComponentProps<"pre">) => (
    <pre className={`mdx-pre ${className}`.trim()} {...rest} />
  ),
  code: ({ className = "", ...rest }: ComponentProps<"code">) => (
    <code className={`mdx-code ${className}`.trim()} {...rest} />
  ),
};

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx-content">
      <Component components={components} />
    </div>
  );
}
