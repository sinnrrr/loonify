import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import PostPage from "app/core/components/PostPage"

const NewPostPage: BlitzPage = () => {
  return <PostPage />
}

NewPostPage.authenticate = true
NewPostPage.getLayout = (page) => <Layout title={"Create New Post"}>{page}</Layout>

export default NewPostPage
