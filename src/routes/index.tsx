import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/shared/container'
import { getPosts } from '@/server/blog'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  loader: () => getPosts(),
  component: HomePage,
})

function HomePage() {
  const posts = Route.useLoaderData()

  return (
    <Container>
      <section className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight mb-3 text-center">
          Haydar Amru Revanda
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-lg text-center">
          Software engineer. Building things for the web.
        </p>
      </section>

      <section className="mb-16">
        <p className="text-muted-foreground leading-relaxed max-w-lg">
          I'm a final-year B.Sc. student at Universitas Gadjah Mada with strong communication and collaborative problem-solving abilities. I thrive on solving complex challenges through clean, well-documented code and have a proven track record of leading collaborative projects.
        </p>
        <p>

          My focus on professional growth extends beyond academics through active involvement in tech communities and was recognized with multiple grants for innovative contributions.
        </p>
        <p>
          Let's connect! Reach out here.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Recent Writing</h2>
          <Link
            to="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
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
                  <span className="text-sm text-muted-foreground shrink-0 ml-4">
                    {post.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
