import { Image } from "@chakra-ui/image"
import { Heading, Text, VStack } from "@chakra-ui/layout"
import { usePostRedirect } from "app/core/hooks/usePostRedirect"
import { Post } from "db"
import { FunctionComponent } from "react"

const PostComponent: FunctionComponent<{ post: Post }> = ({ post }) => {
  const postRedirect = usePostRedirect()

  return (
    <VStack align="flex-start" cursor="pointer" onClick={() => postRedirect(post.id)}>
      <Image src={post.images[0]} />
      <VStack align="flex-start">
        <Heading size="lg" wordBreak="break-word">
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
