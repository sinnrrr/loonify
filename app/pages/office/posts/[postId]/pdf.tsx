import { BlitzPage, useParam, useQuery, useRouter } from "@blitzjs/core"
import { Image } from "@chakra-ui/image"
import { Flex, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/tag"
import theme from "@chakra-ui/theme"
import Map from "app/core/components/Map"
import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import QRCode from "qrcode.react"
import { Suspense } from "react"
import { BiImage } from "react-icons/bi"

const PostPdfPage: BlitzPage = () => {
  const id = useParam("postId", "number")
  const [post] = useQuery(getPost, { id })

  return (
    <Grid
      gap={8}
      p={theme.space[8]}
      width="21cm"
      height="29.7cm"
      templateColumns="7fr 4fr"
      templateRows="40% 1fr 1fr 40px"
    >
      <GridItem colSpan={2}>
        {post.images.length > 0 ? <Image h="100%" src={post.images[0]} /> : <BiImage size="100%" />}
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
          <Heading>Have found or seen anything?</Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, tempora. Deleniti
            maxime at amet adipisci, corrupti placeat, impedit iure incidunt illum fugit unde
            inventore culpa dolorum delectus assumenda perspiciatis eum?
          </Text>
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
PostPdfPage.getLayout = (page) => (
  <Layout>
    <Suspense fallback={<div>Loading...</div>}>{page}</Suspense>
  </Layout>
)

export default PostPdfPage
