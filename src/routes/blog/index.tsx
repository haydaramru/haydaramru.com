import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/shared/container'
import { MotionReveal } from '@/components/shared/motion-reveal'
import { getPosts } from '@/server/blog'

export const Route = createFileRoute('/blog/')({
  loader: () => getPosts(),
  component: BlogIndex,
})

function BlogIndex() {
  const posts = Route.useLoaderData()

  return (
    <Container>
      <MotionReveal>
        <h1 className="text-2xl font-semibold mb-8">Writing</h1>
      </MotionReveal>
      <ul className="space-y-8">
        {posts.map((post, index) => (
          <MotionReveal key={post.slug} delay={0.1 + index * 0.08}>
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
                  <span className="text-sm text-muted-foreground shrink-0 ml-4">
                    {post.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          </MotionReveal>
        ))}
      </ul>
    </Container>
  )
}
