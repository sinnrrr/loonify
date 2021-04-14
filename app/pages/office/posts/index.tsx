import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPosts from "app/posts/queries/getPosts"

const ITEMS_PER_PAGE = 100

export const PostsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ posts, hasMore }] = usePaginatedQuery(getPosts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const PostsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <div>
        <p>
          <Link href="/posts/new">
            <a>Create Post</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PostsList />
        </Suspense>
      </div>
    </>
  )
}

PostsPage.authenticate = true
PostsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PostsPage
