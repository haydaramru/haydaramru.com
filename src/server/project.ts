import { createServerFn } from "@tanstack/react-start";

export const getProject = createServerFn().handler(async () => {
  return [
    {
      id: "1",
      title: "EMOvest",
      description: "A Futuristic vest prototype as an epilepsy detector with airguard protection based on IoT.",
      url: "https://github.com/haydaramru/EMOvest",
      repo: "https://github.com/haydaramru/EMOvest",
      tech: ["C++", "Arduino"],
    },
    {
      id: "2",
      title: "GymLens",
      description: "A mobile app that categorizes gym equipment and provides detailed usage guides.",
      url: "https://github.com/GymLens/",
      repo: "https://github.com/GymLens/Cloud-Computing",
      tech: ["GCP", "Golang", "Flask", "Kotlin"],
    },
    {
      id: "3",
      title: "belokpelaga.com",
      description: "Profile website for Belok ke Pelaga community service in Pelaga Village, Bali.",
      url: "https://www.belokpelaga.com",
      repo: "https://github.com/belokkepelaga/belokkepelaga",
      tech: ["NextJS", "React", "TailwindCSS", "Docker"],
    },
  ]
})
