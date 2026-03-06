import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import matter from "gray-matter";
import { marked } from "marked";

const modules = import.meta.glob("../../content/projects/*.md", {
  query: "?raw",
  eager: true,
}) as Record<string, { default: string }>;

function parseAll() {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const id = path.split("/").pop()!.replace(/\.md$/, "");
      const { data, content } = matter(mod.default);
      if (!data.published) return null;
      return {
        id,
        title: data.title as string,
        description: data.description as string,
        tech: data.tech as string[],
        url: data.url as string | undefined,
        repo: data.repo as string | undefined,
        content: marked.parse(content) as string,
      };
    })
    .filter(Boolean) as {
    id: string;
    title: string;
    description: string;
    tech: string[];
    url?: string;
    repo?: string;
    content: string;
  }[];
}

export const getProject = createServerFn().handler(async () => {
  return parseAll().map(({ content: _, ...rest }) => rest);
});

export const getProjectById = createServerFn()
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const project = parseAll().find((p) => p.id === data.id);
    if (!project) throw new Error("Project not found");
    return project;
  });
