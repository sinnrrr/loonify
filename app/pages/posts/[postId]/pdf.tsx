import { BlitzPage } from "@blitzjs/core"
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import Layout from "app/core/layouts/Layout"

const PostPdfPage: BlitzPage = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxWidth={theme.sizes.container.lg}
      p={theme.space[8]}
    >
      <Flex maxH="40vh">
        <img
          width="auto"
          src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg"
          alt=""
        />
      </Flex>
      <Flex>
        <Box>
          <Heading>Lorem ipsum, dolor sit amet consectetur adipisicing elit</Heading>
          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et odio animi culpa dolore
            blanditiis, ullam quaerat cumque voluptate pariatur. Iusto ut at id est natus laudantium
            quae reprehenderit expedita molestiae! Neque natus similique vel atque maiores quas.
            Quos doloremque laudantium voluptatem quisquam nulla alias aperiam debitis sequi omnis
            a, ipsa temporibus totam aut inventore atque id ea voluptates suscipit reiciendis!
            Inventore nobis eaque culpa, quasi amet debitis eveniet ipsum beatae nulla iure
            praesentium possimus laudantium non reprehenderit quam quia cumque nostrum soluta
            libero, aut delectus deserunt officia, maiores omnis? Ex. Sint repellendus neque tempora
            voluptatum porro facere eos reiciendis officiis illo deleniti maxime, asperiores,
            nesciunt, voluptates repellat qui praesentium ad omnis! Obcaecati nulla tempora dicta
            nostrum consectetur cum nam autem? Nam, quis! Quasi asperiores dolor repellat eaque
            numquam at porro ducimus voluptatum nisi nihil dolore officiis quas error quae facere
            totam, vero natus nesciunt, dolorem, veritatis perferendis commodi nostrum laudantium?
          </Text>
        </Box>
      </Flex>
      <Flex>
        <Box height="300px">asd</Box>
      </Flex>
      <Flex>asd</Flex>
    </Container>
  )
}

PostPdfPage.suppressFirstRenderFlicker = true
PostPdfPage.getLayout = (page) => <Layout>{page}</Layout>

export default PostPdfPage
