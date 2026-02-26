import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/shared/container'
import { getProject } from '@/server/project'
import { ExternalLink, Github } from 'lucide-react'

export const Route = createFileRoute('/projects/')({
  loader: () => getProject(),
  component: ProjectsIndex,
})

function ProjectsIndex() {
  const projects = Route.useLoaderData()

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-8">Projects</h1>
      <ul className="space-y-6">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub repository"
                  >
                    <Github className="size-4" />
                  </a>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Live site"
                >
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}
