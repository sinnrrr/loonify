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
import { COLUMN_BREAKPOINT, ROW_BREAKPOINT } from "app/posts/constants"

const ShowPostPage: BlitzPage = () => {
  // Post id from query
  const postId = useParam("postId", "number")

  // Resolving post and sparing
  const [postInfo] = useQuery(getPost, { id: postId })
  const { owner, ...post } = postInfo

  return (
    <>
      <Flex
        grow={1}
        justify={{ [COLUMN_BREAKPOINT]: "start", [ROW_BREAKPOINT]: "center" }}
        direction={{ [COLUMN_BREAKPOINT]: "column", [ROW_BREAKPOINT]: "row" }}
        my={theme.space[5]}
      >
        <Flex direction="column">
          <MediaBlock post={post} />
          <InformationBlock post={post} />
        </Flex>
        <Flex direction="column">
          <Container
            maxWidth={{
              [COLUMN_BREAKPOINT]: "100%",
              [ROW_BREAKPOINT]: theme.sizes.sm,
            }}
          >
            <AccountBlock post={post} account={owner} />
            <RelatedBlock post={post} />
          </Container>
        </Flex>
      </Flex>
    </>
  )
}

ShowPostPage.suppressFirstRenderFlicker = true
ShowPostPage.getLayout = (page) => (
  <Layout>
    <Suspense fallback={<div>Loading...</div>}>{page} </Suspense>
  </Layout>
)

export default ShowPostPage
