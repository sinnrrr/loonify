import React from "react"
import { BlitzPage, usePaginatedQuery } from "blitz"
import IndexLayout from "app/core/layouts/IndexLayout"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion"
import { Box, VStack } from "@chakra-ui/layout"
import MiddlePanel from "app/core/components/MiddlePanel"
import getCategories from "app/categories/queries/getCategories"
import { Button } from "@chakra-ui/button"
import { useList } from "react-use"
import { Category } from "db"

const Home: BlitzPage = () => {
  const [selectedCategories, { insertAt, removeAt }] = useList<string>()
  const [{ categories }] = usePaginatedQuery(getCategories, {})

  const selectCategory = (category: Category) => {
    if (selectedCategories[category.id]) removeAt(category.id)
    else insertAt(category.id, category.name)
  }

  console.log(selectedCategories)

  return (
    <VStack spacing={4} align="flex-start">
      <MiddlePanel heading="Categories" />
      <Accordion w="100%" allowMultiple>
        {categories.map(
          (category, index) =>
            category.parentId && (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton onClick={() => selectCategory(category)}>
                    <Box flex="1" textAlign="left">
                      {category.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {category.parentId && (
                  <AccordionPanel pb={4}>
                    <Button onClick={() => selectCategory(category)} variant="link">
                      {category.parent?.name}
                    </Button>
                  </AccordionPanel>
                )}
              </AccordionItem>
            )
        )}
      </Accordion>
    </VStack>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <IndexLayout title="Home">{page}</IndexLayout>

export default Home
