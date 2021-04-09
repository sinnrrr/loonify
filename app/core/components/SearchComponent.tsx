import { invoke, useQuery } from "@blitzjs/core"
import { Image } from "@chakra-ui/image"
import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import getSearchedPosts from "app/posts/queries/getSearchedPosts"
import { Post } from "db"
import { useEffect, useState } from "react"
import { usePanelStore } from "../stores/panel"

const SearchComponent = () => {
  const { searchQuery } = usePanelStore()
  const [matchedPosts, setMatchedPosts] = useState<Post[]>([])

  useEffect(() => {
    if (searchQuery) {
      invoke(getSearchedPosts, { query: searchQuery }).then((posts) => setMatchedPosts(posts))
    }
  }, [searchQuery])

  return (
    <VStack align="flex-start">
      <Text>Search query: {searchQuery}</Text>
      <VStack>
        {matchedPosts.map((post) => (
          <VStack>
            <Image src={post.images[0]} />
            <VStack align="flex-start">
              <Heading size="lg" wordBreak="break-word">
                {post.title}
              </Heading>
              <Text wordBreak="break-word" isTruncated>
                {post.description}
              </Text>
            </VStack>
          </VStack>
        ))}
      </VStack>
    </VStack>
  )
}

export default SearchComponent
