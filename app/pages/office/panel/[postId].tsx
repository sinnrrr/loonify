import { BlitzPage, useParam } from "@blitzjs/core"
import IndexLayout from "app/core/layouts/IndexLayout"
import { useQuery } from "@blitzjs/core"
import { Alert, AlertIcon } from "@chakra-ui/alert"
import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { Box, Text, VStack } from "@chakra-ui/layout"
import getPost from "app/posts/queries/getPost"
import { BiImage } from "react-icons/bi"
import { usePostRedirect } from "app/core/hooks/usePostRedirect"
import MiddlePanel from "app/core/components/MiddlePanel"

const Quick: BlitzPage = () => {
  const [post] = useQuery(getPost, { id: useParam("postId", "number") })
  const postRedirect = usePostRedirect()

  return (
    <VStack align="flex-start">
      <MiddlePanel heading="View post" />

      {post.images.length > 0 ? (
        <Image src={post.images[0]} />
      ) : (
        <Box>
          <BiImage size="100%" />
        </Box>
      )}
      <Text fontWeight="bold" fontSize={30}>
        {post.title}
      </Text>
      <Text>{post.description}</Text>
      <Alert status="info">
        <AlertIcon />
        <Text>To have more abilities you should see the full version</Text>
      </Alert>
      <Button onClick={() => postRedirect(post.id)} isFullWidth>
        See full version
      </Button>
    </VStack>
  )
}

Quick.suppressFirstRenderFlicker = true
Quick.getLayout = (page) => <IndexLayout>{page}</IndexLayout>

export default Quick
