import { createServerFn } from "@tanstack/react-start";

export const getProject = createServerFn().handler(async () => {
  return [
    {
      id: "1",
      title: "EMOvest",
      description: "A Futuristic vest prototype as an epilepsy detector with airguard protection based on IoT.",
      url: "https://github.com/johndoe/my-site",
      repo: "https://github.com/johndoe/my-site",
      tech: ["C++", "Arduino"],
    },
    {
      id: "2",
      title: "GymLens",
      description: "A mobile app that categorizes gym equipment and provides detailed usage guides.",
      url: "https://github.com/johndoe/my-site",
      repo: "https://github.com/johndoe/my-site",
      tech: ["GCP", "Golang", "Flask", "Kotlin"],
    },
    {
      id: "3",
      title: "belokpelaga.com",
      description: "Profile website for Belok ke Pelaga community service in Pelaga Village, Bali.",
      url: "https://github.com/johndoe/my-site",
      repo: "https://github.com/johndoe/my-site",
      tech: ["TypeScript", "TanStack Start", "shadcn"],
    },
  ]
})
