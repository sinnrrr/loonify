import { Text, VStack } from "@chakra-ui/layout"
import MiddlePanel from "app/core/components/layout/MiddlePanel"
import IndexLayout from "app/core/layouts/IndexLayout"
import PostComponent from "app/posts/components/PostComponent"
import getSearchedPosts from "app/posts/queries/getSearchedPosts"
import { BlitzPage, invoke, useParam } from "blitz"
import { Category, Post } from "db"
import { NextSeo } from "next-seo"
import { ReactNode, useEffect, useState } from "react"
import theme from "theme"

const Search: BlitzPage = () => {
  const query = useParam("query", "string") || ""

  const [isSearching, setIsSearching] = useState<boolean>(true)
  const [matchedPosts, setMatchedPosts] = useState<(Post & { category: Category })[]>([])
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
    <>
      <NextSeo
        title={`${query} - пошук | Loonify`}
        description={"Пошук оголошень на сучсному бюро знахідок Loonify"}
        canonical={window.location.href && window.location.href}
        openGraph={{
          url: window.location.href && window.location.href,
          title: `${query} - пошук | Loonify`,
          description: "Пошук оголошень на сучсному бюро знахідок Loonify",
          images: [].concat.apply(
            [],
            // Foreach post
            matchedPosts.map(
              // Select post
              (post) =>
                post.images.map(
                  // Foreach image
                  (image) =>
                    // Return seo object
                    ({ url: image })
                )
            )
          ),
          site_name: "Loonify",
        }}
      />
      <VStack align="flex-start">
        <MiddlePanel heading="Пошук" />
        <VStack spacing={theme.space[8]}>{renderedComponent}</VStack>
      </VStack>
    </>
  )
}

Search.suppressFirstRenderFlicker = true
Search.getLayout = (page) => <IndexLayout>{page}</IndexLayout>

export default Search
