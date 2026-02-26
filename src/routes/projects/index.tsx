import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/shared/container'
import { getProject } from '@/server/project'
import { ExternalLink } from 'lucide-react'

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
          <li key={project.id} className="group">
            <div className="flex items-start justify-between">
              <div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium inline-flex items-center gap-1.5 group-hover:underline"
                >
                  {project.title}
                  <ExternalLink className="size-3 text-muted-foreground" />
                </a>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
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
