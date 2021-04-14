import { BlitzPage, invoke, useParam } from "@blitzjs/core"
import { Text, VStack } from "@chakra-ui/layout"
import IndexLayout from "app/core/layouts/IndexLayout"
import PostComponent from "app/posts/components/PostComponent"
import getSearchedPosts from "app/posts/queries/getSearchedPosts"
import { Post } from "db"
import { ReactNode, useEffect, useState } from "react"
import theme from "theme"

const Search: BlitzPage = () => {
  const query = useParam("query", "string") || ""

  const [isSearching, setIsSearching] = useState<boolean>(true)
  const [matchedPosts, setMatchedPosts] = useState<Post[]>([])
  const [renderedComponent, setRenderedComponent] = useState<ReactNode>(null)

  useEffect(() => {
    if (query) {
      setIsSearching(true)
      invoke(getSearchedPosts, { query }).then((posts) => {
        setMatchedPosts(posts)
        setIsSearching(false)
      })
    }
  }, [query, setIsSearching])

  useEffect(() => {
    if (query) {
      if (isSearching) setRenderedComponent(<Text>Searching...</Text>)
      else {
        if (matchedPosts.length === 0) setRenderedComponent(<Text>No posts have been found</Text>)
        else
          setRenderedComponent(
            matchedPosts.map((post, index) => <PostComponent key={index} post={post} />)
          )
      }
    }
  }, [query, isSearching, matchedPosts])

  return (
    <VStack align="flex-start" spacing={theme.space[8]}>
      {renderedComponent}
    </VStack>
  )
}

Search.suppressFirstRenderFlicker = true
Search.getLayout = (page) => <IndexLayout title="Home">{page}</IndexLayout>

export default Search
