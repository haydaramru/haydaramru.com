import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const projects = [
  {
    id: "1",
    title: "EMOvest",
    description: "A Futuristic vest prototype as an epilepsy detector with airguard protection based on IoT.",
    content: "EMOvest is a futuristic vest prototype designed as an epilepsy detector with airguard protection based on IoT. The vest monitors physiological signals to detect early signs of epileptic seizures and deploys protective airbags to prevent injury during a fall.",
    url: "https://github.com/haydaramru/EMOvest",
    repo: "https://github.com/haydaramru/EMOvest",
    tech: ["C++", "Arduino"],
  },
  {
    id: "2",
    title: "GymLens",
    description: "A mobile app that categorizes gym equipment and provides detailed usage guides.",
    content: "GymLens is a mobile application that uses image recognition to categorize gym equipment and provides detailed usage guides. Built as a capstone project, it leverages cloud computing with GCP, a Go backend, Flask-based ML model serving, and a Kotlin Android client.",
    url: "https://github.com/GymLens/",
    // repo: "https://github.com/GymLens/Cloud-Computing",
    tech: ["GCP", "Golang", "Flask", "Kotlin"],
  },
  {
    id: "3",
    title: "belokpelaga.com",
    description: "Profile website for Belok ke Pelaga community service in Pelaga Village, Bali.",
    content: "A profile website built for the Belok ke Pelaga community service program in Pelaga Village, Bali. The site showcases the community's activities, events, and impact in the local area. Built with Next.js and deployed via Docker.",
    // url: "https://www.belokpelaga.com",
    repo: "https://github.com/belokkepelaga/belokkepelaga",
    tech: ["NextJS", "React", "TailwindCSS", "Docker"],
  }
]

export const getProject = createServerFn().handler(async () => {
  return projects.map(({ content: _, ...rest }) => rest)
})

export const getProjectById = createServerFn()
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const project = projects.find((p) => p.id === data.id)
    if (!project) throw new Error("Project not found")
    return project
  })
