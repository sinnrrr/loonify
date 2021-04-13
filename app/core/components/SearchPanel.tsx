import { invoke } from "@blitzjs/core"
import { Text, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import PostComponent from "app/posts/components/PostComponent"
import getSearchedPosts from "app/posts/queries/getSearchedPosts"
import { Post } from "db"
import { ReactNode, useEffect, useState } from "react"
import { usePanelStore } from "../stores/panel"

const SearchPanel = () => {
  const { searchQuery, isSearching, setIsSearching } = usePanelStore()
  const [matchedPosts, setMatchedPosts] = useState<Post[]>([])
  const [renderedComponent, setRenderedComponent] = useState<ReactNode>(null)

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true)
      invoke(getSearchedPosts, { query: searchQuery }).then((posts) => {
        setMatchedPosts(posts)
        setIsSearching(false)
      })
    }
  }, [searchQuery, setIsSearching])

  useEffect(() => {
    if (searchQuery) {
      if (isSearching) setRenderedComponent(<Text>Searching...</Text>)
      else {
        if (matchedPosts.length === 0) setRenderedComponent(<Text>No posts have been found</Text>)
        else
          setRenderedComponent(
            matchedPosts.map((post, index) => <PostComponent key={index} post={post} />)
          )
      }
    }
  }, [searchQuery, isSearching, matchedPosts])

  return (
    <VStack align="flex-start" spacing={theme.space[8]}>
      {renderedComponent}
    </VStack>
  )
}

export default SearchPanel
