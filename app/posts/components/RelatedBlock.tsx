import { usePaginatedQuery } from "@blitzjs/core"
import { Heading, Text, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import { Post } from "db"
import { FunctionComponent } from "react"
import getRelatedPosts from "../queries/getRelatedPosts"
import PostComponent from "./PostComponent"

const RelatedBlock: FunctionComponent<{ post: Post }> = ({ post }) => {
  const [relatedPosts] = usePaginatedQuery(getRelatedPosts, {
    id: post.id,
    title: post.title,
    description: post.description,
  })

  return (
    <VStack align="flex-start" h="100%">
      <Heading>Related</Heading>
      <VStack spacing={theme.space[8]} align="flex-start" overflowY="auto">
        {relatedPosts.length > 0 ? (
          relatedPosts.map((post, index) => <PostComponent key={index} post={post} />)
        ) : (
          <Text>No related posts found</Text>
        )}
      </VStack>
    </VStack>
  )
}

export default RelatedBlock
