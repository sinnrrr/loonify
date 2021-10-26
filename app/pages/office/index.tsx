import React, { useState } from "react"
import { BlitzPage, usePaginatedQuery } from "blitz"
import IndexLayout from "app/core/layouts/IndexLayout"
import { Box, Text, VStack } from "@chakra-ui/layout"
import MiddlePanel from "app/core/components/layout/MiddlePanel"
import { Button } from "@chakra-ui/button"
import getPosts from "app/posts/queries/getPosts"
import PostComponent from "app/posts/components/PostComponent"
import { useDisclosure } from "@chakra-ui/hooks"
import CategorySelectModal from "app/core/components/modals/CategorySelectModal"
import { Category } from "db"
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag"
import { NextSeo } from "next-seo"

const Home: BlitzPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [{ posts }] = usePaginatedQuery(getPosts, {
    where: { category: selectedCategory },
    orderBy: { updatedAt: "desc" },
  })

  return (
    <>
      <NextSeo
        title={"Бюро зніхдок майбутнього | Loonify"}
        description={
          "Знаходь загублені речі та їх власників швидко та просто, не встаючи з дивану!"
        }
        canonical={window.location.href && window.location.href}
        openGraph={{
          url: window.location.href && window.location.href,
          title: "Бюро зніхдок майбутнього | Loonify",
          description: "Оголошення на бюро знахідок",
          // Array of arrays in single array
          images: [].concat.apply(
            [],
            // Foreach post
            posts.map(
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
      <VStack spacing={4} align="flex-start">
        <Box>
          <MiddlePanel heading="Оголошення" />
          {selectedCategory && (
            <Tag mr={2}>
              <TagLabel>{selectedCategory.name}</TagLabel>
              <TagCloseButton onClick={() => setSelectedCategory(undefined)} />
            </Tag>
          )}
          <Button onClick={onOpen} variant="link">
            Сортувати
          </Button>
        </Box>
        <CategorySelectModal
          canCreateNew
          isOpen={isOpen}
          onClose={onClose}
          onFinish={setSelectedCategory}
        />
        <VStack w="100%">
          {posts.length > 0 ? (
            posts.map((post, index) => <PostComponent key={index} post={post} />)
          ) : (
            <Text>Не знайшов жодного оголошення за заданими критеріями :(</Text>
          )}
        </VStack>
      </VStack>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <IndexLayout>{page}</IndexLayout>

export default Home
