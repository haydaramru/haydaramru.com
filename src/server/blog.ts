import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getPosts = createServerFn().handler(async () => {
  const posts = [
    { slug: "hello-world", title: "Hello World", date: "2025-01-01", excerpt: "bla bla bla..." },
    { slug: "effect-ts", title: "Belajar Effect.ts", date: "2025-02-01", excerpt: "..." },
    { slug: "hello-world", title: "Hello World", date: "2025-01-01", excerpt: "bla bla bla..." },
  ];
  return posts;
});

export const getPost = createServerFn().inputValidator(z.object({ slug: z.string() })).handler(async ({ data }) => {
  return {
    slug: data.slug,
    title: "Hello World",
    content: "Isi artikel...",
    date: "2025-01-01",
  };
});
