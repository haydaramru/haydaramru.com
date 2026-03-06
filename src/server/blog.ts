import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import matter from "gray-matter";
import { marked } from "marked";

const modules = import.meta.glob("../../content/blog/*.md", {
  query: "?raw",
  eager: true,
}) as Record<string, { default: string }>;

function parseAll() {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const slug = path.split("/").pop()!.replace(/\.md$/, "");
      const { data, content } = matter(mod.default);
      if (!data.published) return null;
      const date = data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : String(data.date);
      return {
        slug,
        title: data.title as string,
        date,
        excerpt: data.excerpt as string,
        content: marked.parse(content) as string,
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
  }[];
}

export const getPosts = createServerFn().handler(async () => {
  return parseAll().map(({ content: _, ...rest }) => rest);
});

export const getPost = createServerFn()
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const post = parseAll().find((p) => p.slug === data.slug);
    if (!post) throw new Error("Post not found");
    return post;
  });
