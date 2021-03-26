import { Container, Flex } from "@chakra-ui/layout"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import theme from "@chakra-ui/theme"
import Map from "app/core/components/Map"
import { FunctionComponent } from "react"

const MediaBlock: FunctionComponent = () => {
  return (
    <Container maxWidth={theme.sizes.container.md}>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Picture</Tab>
          <Tab>Location</Tab>
        </TabList>
        <TabPanels>
          <TabPanel border={theme.borders["1px"]} borderColor={theme.colors.gray[200]}>
            <img
              src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg"
              alt=""
            />
          </TabPanel>
          <TabPanel border={theme.borders["1px"]} borderColor={theme.colors.gray[200]}>
            <Flex height="50vh" width="100%" maxWidth={theme.sizes.container.md}>
              <Map />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default MediaBlock
