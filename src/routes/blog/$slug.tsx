import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/shared/container'
import { getPost } from '@/server/blog'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => getPost({ data: { slug: params.slug } }),
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()

  return (
    <Container>
      <Link
        to="/blog"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="size-3" /> Back to writing
      </Link>
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
          <time className="text-sm text-muted-foreground">{post.date}</time>
        </header>
        <div className="prose prose-neutral">
          <p>{post.content}</p>
        </div>
      </article>
    </Container>
  )
}
