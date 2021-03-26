import { useParam, BlitzPage, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Container, Flex } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import getPost from "app/posts/queries/getPost"
import MediaBlock from "app/posts/components/MediaBlock"
import InformationBlock from "app/posts/components/InformationBlock"
import AccountBlock from "app/posts/components/AccountBlock"
import RelatedBlock from "app/posts/components/RelatedBlock"
import { Suspense } from "react"

const PostPage = () => {
  // Post id from query
  const postId = useParam("postId", "number")

  // Resolving post and sparing
  const [postInfo] = useQuery(getPost, { id: postId })
  const { owner, ...post } = postInfo

  // Helper constants
  const COLUMN_BREAKPOINT = "base"
  const ROW_BREAKPOINT = "md"

  return (
    <Flex
      grow={1}
      justify={{ [COLUMN_BREAKPOINT]: "start", [ROW_BREAKPOINT]: "center" }}
      direction={{ [COLUMN_BREAKPOINT]: "column", [ROW_BREAKPOINT]: "row" }}
      my={theme.space[5]}
    >
      <Flex direction="column">
        <MediaBlock />
        <InformationBlock post={post} />
      </Flex>
      <Flex direction="column">
        <Container
          maxWidth={{
            [COLUMN_BREAKPOINT]: "100%",
            [ROW_BREAKPOINT]: theme.sizes.container.sm,
          }}
        >
          <AccountBlock post={post} account={owner} />
          <RelatedBlock />
        </Container>
      </Flex>
    </Flex>
  )
}

const ShowPostPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostPage />
    </Suspense>
  )
}

ShowPostPage.suppressFirstRenderFlicker = true
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage
