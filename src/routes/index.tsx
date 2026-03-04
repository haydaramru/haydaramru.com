import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/shared/container'
import { ScrambleText } from '@/components/shared/scramble-text'
import { MotionReveal } from '@/components/shared/motion-reveal'
import { getPosts } from '@/server/blog'
import { getProject } from '@/server/project'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
// import {
//   SiTypescript,
//   SiReact,
//   SiTailwindcss,
//   SiNodedotjs,
//   SiBun,
//   SiGo,
//   SiPostgresql,
//   SiDocker,
//   SiGit,
// } from 'react-icons/si'
// import type { IconType } from 'react-icons'

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
      <MotionReveal>
        <section className="mb-6">
          <p className="mb-2">Hello, my name is</p>
          <h1 className="text-4xl font-semibold tracking-tight mb-3">
            Haydar Amru
          </h1>
          <p>
            Building solutions that feel{' '}
            <ScrambleText words={['reliable', 'secure', 'seamless', 'scalable', 'intuitive']} />{' '}
          </p>
        </section>
      </MotionReveal>

      <MotionReveal delay={0.1}>
        <section className="mb-10 space-y-4 text-base text-muted-foreground leading-relaxed">
          <p>
            i enjoy learning through tinkering (and losing to rabbit holes) by diving into projects that solve "interesting" problems.
          </p>
          <p>
            i build clean things with code and keep notes on what i'm building or breaking{' '}
            <Link to="/blog" className="underline hover:text-foreground transition-colors">here</Link>.
          </p>
        </section>
      </MotionReveal>

      {/* <MotionReveal delay={0.2}>
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
      </MotionReveal> */}

      <section className="mb-10">
        <MotionReveal delay={0.4}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Featured Works</h2>
            <Link
              to="/projects"
              className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              All projects <ArrowRight className="size-3" />
            </Link>
          </div>
        </MotionReveal>
        <ul className="space-y-6">
          {projects.map((project, index) => (
            <MotionReveal key={project.id} delay={0.4 + index * 0.08}>
              <li>
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      to="/projects/$id"
                      params={{ id: project.id }}
                      className="font-medium text-lg hover:underline"
                    >
                      {project.title}
                    </Link>
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
            </MotionReveal>
          ))}
        </ul>
      </section>

      <section>
        <MotionReveal delay={0.3}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Writing</h2>
            <Link
              to="/blog"
              className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              All posts <ArrowRight className="size-3" />
            </Link>
          </div>
        </MotionReveal>
        <ul className="space-y-6">
          {posts.slice(0, 3).map((post, index) => (
            <MotionReveal key={post.slug} delay={0.3 + index * 0.08}>
              <li>
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
            </MotionReveal>
          ))}
        </ul>
      </section>
    </Container>
  )
}
