import { invoke } from "@blitzjs/core"
import { Text, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import PostComponent from "app/posts/components/PostComponent"
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
      <VStack spacing={theme.space[8]}>
        {matchedPosts.map((post) => (
          <PostComponent post={post} />
        ))}
      </VStack>
    </VStack>
  )
}

export default SearchComponent
