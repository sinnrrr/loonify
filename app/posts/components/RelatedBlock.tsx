import { usePaginatedQuery } from "@blitzjs/core"
import { Text, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import { Post } from "db"
import { FunctionComponent } from "react"
import getRelatedPosts from "../queries/getRelatedPosts"
import PostComponent from "./PostComponent"

const RelatedBlock: FunctionComponent<{ post: Post }> = ({ post }) => {
  const [relatedPosts] = usePaginatedQuery(getRelatedPosts, {
    title: post.title,
    description: post.description,
  })

  return (
    <VStack
      maxH="70vh"
      pr={theme.space[4]}
      spacing={theme.space[8]}
      align="flex-start"
      overflowY="auto"
    >
      <Text>Related</Text>
      {relatedPosts.map((post) => (
        <PostComponent post={post} />
      ))}
    </VStack>
  )
}

export default RelatedBlock
