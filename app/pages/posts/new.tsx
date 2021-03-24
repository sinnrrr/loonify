import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import PostPage from "app/core/components/PostPage"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewPostPage: BlitzPage = () => {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <PostPage mode="new" user={useCurrentUser()} />
      </Suspense>
    </ErrorBoundary>
  )
}

NewPostPage.authenticate = true
NewPostPage.getLayout = (page) => <Layout title={"Create New Post"}>{page}</Layout>

export default NewPostPage
