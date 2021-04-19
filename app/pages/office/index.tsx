import React, { useState } from "react"
import { BlitzPage, usePaginatedQuery } from "blitz"
import IndexLayout from "app/core/layouts/IndexLayout"
import { Box, Text, VStack } from "@chakra-ui/layout"
import MiddlePanel from "app/core/components/MiddlePanel"
import { Button } from "@chakra-ui/button"
import getPosts from "app/posts/queries/getPosts"
import PostComponent from "app/posts/components/PostComponent"
import { useDisclosure } from "@chakra-ui/hooks"
import CategorySelectModal from "app/core/components/CategorySelectModal"
import { Category } from "db"
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag"

const Home: BlitzPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [{ posts }] = usePaginatedQuery(getPosts, { where: { category: selectedCategory } })

  return (
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
      <VStack>
        {posts.length > 0 ? (
          posts.map((post, index) => <PostComponent key={index} post={post} />)
        ) : (
          <Text>Не знайшов жодного оголошення за заданими критеріями :(</Text>
        )}
      </VStack>
    </VStack>
  )
}

Home.authenticate = false
Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <IndexLayout title="Home">{page}</IndexLayout>

export default Home
