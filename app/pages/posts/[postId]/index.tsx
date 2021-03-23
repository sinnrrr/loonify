import { Suspense } from "react"
import { useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import PostPage from "app/core/components/PostPage"

const ShowPostPage: BlitzPage = () => {
  const postId = useParam("postId", "number")

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostPage postId={postId} />
    </Suspense>
  )
}

ShowPostPage.suppressFirstRenderFlicker = true
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage
