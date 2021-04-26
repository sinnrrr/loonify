import { usePaginatedQuery } from "@blitzjs/core"
import { Heading, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
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

  return relatedPosts.length > 0 ? (
    <VStack align="flex-start" h="100%">
      <Heading>Схоже</Heading>
      <SimpleGrid columns={3} spacing={8}>
        {relatedPosts.map((post, index) => (
          <PostComponent key={index} post={post} />
        ))}{" "}
      </SimpleGrid>
    </VStack>
  ) : null
}

export default RelatedBlock
