import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/shared/container'
import { getPosts } from '@/server/blog'
import { getProject } from '@/server/project'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import {
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiBun,
  SiGo,
  SiPostgresql,
  SiDocker,
  SiGit,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [posts, projects] = await Promise.all([getPosts(), getProject()])
    return { posts, projects }
  },
  component: HomePage,
})

function HomePage() {
  const { posts, projects } = Route.useLoaderData()

  return (
    <Container>
      <section className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight mb-3">
          Hello, I'm Haydar
        </h1>
      </section>

      <section className="mb-10 space-y-4 text-base text-muted-foreground leading-relaxed">
        <p>
          learning through tinkering (and losing to rabbit holes) by diving into projects that solve "interesting" problems.
        </p>
        <p>
          i build clean things with code and lead teams when needed.
        </p>
        <p>
          i keep notes on what i'm building and breaking{' '}
          <Link to="/blog" className="underline hover:text-foreground transition-colors">here</Link>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Tools & Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {([
            ['TypeScript', SiTypescript],
            ['React', SiReact],
            ['Tailwind CSS', SiTailwindcss],
            ['Node.js', SiNodedotjs],
            ['Bun', SiBun],
            ['Go', SiGo],
            ['PostgreSQL', SiPostgresql],
            ['Docker', SiDocker],
            ['Git', SiGit],
          ] as [string, IconType][]).map(([tech, Icon]) => (
            <span
              key={tech}
              className="text-base text-muted-foreground bg-secondary px-3 py-1 rounded-full inline-flex items-center gap-1.5"
            >
              <Icon className="size-3.5" />
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Writing</h2>
          <Link
            to="/blog"
            className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            All posts <ArrowRight className="size-3" />
          </Link>
        </div>
        <ul className="space-y-6">
          {posts.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block"
              >
                <div className="flex items-baseline justify-between">
                  <p className="font-medium group-hover:underline">
                    {post.title}
                  </p>
                  <span className="text-base text-muted-foreground shrink-0 ml-4">
                    {post.date}
                  </span>
                </div>
                <p className="text-base text-muted-foreground mt-1">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Featured Projects</h2>
          <Link
            to="/projects"
            className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            All projects <ArrowRight className="size-3" />
          </Link>
        </div>
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-lg">{project.title}</p>
                  <p className="text-base text-muted-foreground mt-1">
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
                    className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
