import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/shared/container'
import { getPosts } from '@/server/blog'

export const Route = createFileRoute('/blog/')({
  loader: () => getPosts(),
  component: BlogIndex,
})

function BlogIndex() {
  const posts = Route.useLoaderData()

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-8">Writing</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
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
    </Container>
  )
}
