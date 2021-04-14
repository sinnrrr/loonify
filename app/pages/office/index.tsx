import React from "react"
import { BlitzPage } from "blitz"
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

const Home: BlitzPage = () => {
  return (
    <VStack spacing={4} align="flex-start">
      <MiddlePanel heading="Categories" />
      <Accordion defaultIndex={[0]} w="100%" allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Category 1
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Category 2
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <IndexLayout title="Home">{page}</IndexLayout>

export default Home
