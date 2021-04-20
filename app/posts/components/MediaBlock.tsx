import { Container, Flex } from "@chakra-ui/layout"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import { Image } from "@chakra-ui/react"
import theme from "@chakra-ui/theme"
import Map from "../../core/components/map/Map"
import { Post } from "db"
import { FunctionComponent } from "react"
import { ROW_BREAKPOINT, TYPE_MATCHED_COLOR } from "../constants"

const MediaBlock: FunctionComponent<{ post: Post }> = ({ post }) => (
  <Container maxW={theme.sizes.container.md} minW={{ [ROW_BREAKPOINT]: theme.sizes.container.sm }}>
    <Tabs isFitted variant="enclosed">
      <TabList borderColor={TYPE_MATCHED_COLOR[post.type]}>
        {post.images.length > 0 && (
          <Tab fontSize={theme.fontSizes.xl} fontWeight={theme.fontWeights.bold}>
            Зображення
          </Tab>
        )}

        <Tab fontSize={theme.fontSizes.xl} fontWeight={theme.fontWeights.bold}>
          Місцезнаходження
        </Tab>
      </TabList>
      <TabPanels>
        {post.images.length > 0 && (
          <TabPanel
            display="flex"
            justifyContent="center"
            border={theme.borders["1px"]}
            borderColor={TYPE_MATCHED_COLOR[post.type]}
            borderBottomRadius={theme.radii.md}
          >
            <Image src={post.images[0]} />
            {/* <Carousel images={post.images} /> */}
          </TabPanel>
        )}
        <TabPanel
          border={theme.borders["1px"]}
          borderColor={TYPE_MATCHED_COLOR[post.type]}
          borderBottomRadius={theme.radii.md}
        >
          <Flex height="50vh" width="100%" maxWidth={theme.sizes.container.md}>
            <Map initial={[post]} />
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Container>
)

export default MediaBlock
