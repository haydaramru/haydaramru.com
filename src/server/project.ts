import { createServerFn } from "@tanstack/react-start";

export const getProject = createServerFn().handler(async () => {
  return [
    {
      id: "1",
      title: "My TanStack Site",
      description: "Website pribadi pakai TanStack Start",
      url: "https://github.com/johndoe/my-site",
      tech: ["TypeScript", "TanStack Start", "shadcn"],
    }
  ]
})
