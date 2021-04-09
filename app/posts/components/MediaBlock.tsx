import { Container, Flex } from "@chakra-ui/layout"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import { Image } from "@chakra-ui/react"
import theme from "@chakra-ui/theme"
import Map from "../../core/components/Map"
import { Post } from "db"
import { FunctionComponent } from "react"
import Carousel from "app/core/components/Carousel"

const MediaBlock: FunctionComponent<{ post: Post }> = ({ post }) => {
  return (
    <Container maxWidth={theme.sizes.container.md}>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Picture</Tab>
          <Tab>Location</Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            display="flex"
            justifyContent="center"
            border={theme.borders["1px"]}
            borderColor={theme.colors.gray[200]}
          >
            {/* <Carousel images={post.images} /> */}
            <Image src={post.images[0]} alt="Post image" />
          </TabPanel>
          <TabPanel border={theme.borders["1px"]} borderColor={theme.colors.gray[200]}>
            <Flex height="50vh" width="100%" maxWidth={theme.sizes.container.md}>
              <Map initial={[post]} />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default MediaBlock
