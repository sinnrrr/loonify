import { useColorMode } from "@chakra-ui/color-mode"
import { Image } from "@chakra-ui/image"
import { Box, Flex, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/tag"
import theme from "@chakra-ui/theme"
import ContactOption from "app/core/components/layout/ContactOption"
import Map from "app/core/components/map/Map"
import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import { BlitzPage, useParam, useQuery } from "blitz"
import QRCode from "qrcode.react"
import { BiImage } from "react-icons/bi"

const PostPdfPage: BlitzPage = () => {
  const { setColorMode } = useColorMode()
  setColorMode("light")

  const id = useParam("postId", "number")
  const [post] = useQuery(getPost, { id })

  return (
    <Grid
      gap={8}
      p={theme.space[8]}
      width="21cm"
      height="29.6cm"
      templateColumns="7fr 4fr"
      templateRows="40% 1fr 1fr 40px"
    >
      <GridItem colSpan={2}>
        {post.images.length > 0 ? (
          <Image h="100%" src={post.images[0]} alt="Post image" />
        ) : (
          <BiImage size="100%" />
        )}
      </GridItem>
      <GridItem>
        <VStack align="flex-start">
          <Tag>{post.category.name}</Tag>
          <Heading>{post.title}</Heading>
          <Text>{post.description}</Text>
        </VStack>
      </GridItem>
      <GridItem>
        <VStack>
          <Heading>Знайшли чи бачили щось?</Heading>
          <VStack spacing={theme.space[2]}>
            <Text>Зв’яжіться зі мною за допомогою:</Text>
            <Box>
              <ContactOption variant="email" data={post.owner.email} />
              {post.owner.phone && <ContactOption variant="phone" data={post.owner.phone} />}
            </Box>
            <Text>..або дізнайтесь більше інформації за QR-кодом нижче</Text>
          </VStack>
        </VStack>
      </GridItem>
      <GridItem>
        <Flex h="100%">
          <Map
            isStatic
            properties={{
              center: [50.7472, 25.3254],
              zoom: 14,
              zoomControl: false,
              minZoom: 4,
            }}
          />
        </Flex>
      </GridItem>
      <GridItem>
        <QRCode
          renderAs="svg"
          height="100%"
          width="100%"
          value={window.location.href && window.location.href.replace("/pdf", "")}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <Flex justify="space-between">
          <Text fontWeight="bold">Loonify</Text>
          <Text>Lost and Found of the Future</Text>
        </Flex>
      </GridItem>
    </Grid>
  )
}

PostPdfPage.suppressFirstRenderFlicker = true
PostPdfPage.getLayout = (page) => <Layout>{page}</Layout>

export default PostPdfPage
