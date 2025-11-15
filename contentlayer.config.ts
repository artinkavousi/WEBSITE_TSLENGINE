import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const computedFields = {
  slug: {
    type: "string",
    resolve: (doc: { _raw: { flattenedPath: string } }) => doc._raw.flattenedPath.replace(/^labs\//, ""),
  },
  url: {
    type: "string",
    resolve: (doc: { slug: string }) => `/labs/${doc.slug}`,
  },
};

export const Lab = defineDocumentType(() => ({
  name: "Lab",
  filePathPattern: `labs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    status: { type: "string", required: true },
    templateId: { type: "string", required: true },
    styleTokens: { type: "list", of: { type: "string" }, required: true },
    modulePresets: { type: "list", of: { type: "string" }, required: true },
    featured: { type: "boolean", default: false },
    homeOrder: { type: "number", default: 0 },
    tags: { type: "list", of: { type: "string" } },
    seoTitle: { type: "string" },
    seoDescription: { type: "string" },
  },
  computedFields,
}));

const prettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
};

export default makeSource({
  contentDirPath: "apps/web/content",
  documentTypes: [Lab],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug],
  },
});
