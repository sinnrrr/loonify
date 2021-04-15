import { Image } from "@chakra-ui/image"
import { Box, Heading, Text, VStack } from "@chakra-ui/layout"
import { usePostRedirect } from "app/core/hooks/usePostRedirect"
import { Post } from "db"
import { FunctionComponent } from "react"
import { BiImage } from "react-icons/bi"

const PostComponent: FunctionComponent<{ post: Post }> = ({ post }) => {
  const postRedirect = usePostRedirect()

  return (
    <VStack align="flex-start" cursor="pointer" onClick={() => postRedirect(post.id)}>
      {post.images.length > 0 ? (
        <Image src={post.images[0]} />
      ) : (
        <Box>
          <BiImage size="100%" />
        </Box>
      )}
      <VStack align="flex-start">
        <Heading size="lg" wordBreak="break-word" isTruncated>
          {post.title}
        </Heading>
        <Text wordBreak="break-word" isTruncated>
          {post.description}
        </Text>
      </VStack>
    </VStack>
  )
}

export default PostComponent
