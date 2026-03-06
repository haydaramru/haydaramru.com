import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/shared/container'
import { getProjectById } from '@/server/project'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

export const Route = createFileRoute('/projects/$id')({
  loader: ({ params }) => getProjectById({ data: { id: params.id } }),
  component: ProjectDetail,
})

function ProjectDetail() {
  const project = Route.useLoaderData()

  return (
    <Container>
      <Link
        to="/projects"
        className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="size-3" /> Back to projects
      </Link>
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-semibold mb-3">{project.title}</h1>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
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
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Live site"
                >
                  <ExternalLink className="size-4" />
                </a>
              )}
            </div>
          </div>
        </header>
        <div className="prose prose-neutral">
          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>
      </article>
    </Container>
  )
}
