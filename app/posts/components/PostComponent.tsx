import { Image } from "@chakra-ui/image"
import { Box, Text, VStack } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/tag"
import theme from "@chakra-ui/theme"
import { usePostRedirect } from "app/core/hooks/usePostRedirect"
import { Category, Post } from "db"
import { FunctionComponent } from "react"
import { BiImage } from "react-icons/bi"
import { TYPE_MATCHED_COLOR } from "../constants"

const PostComponent: FunctionComponent<{ post: Post & { category: Category } }> = ({ post }) => {
  const postRedirect = usePostRedirect()

  return (
    <VStack
      w="100%"
      p={theme.space[4]}
      align="flex-start"
      border={theme.borders["1px"]}
      borderColor={TYPE_MATCHED_COLOR[post.type]}
      borderRadius={theme.radii.lg}
      cursor="pointer"
      onClick={() => postRedirect(post.id)}
    >
      {post.images.length > 0 ? (
        <Image src={post.images[0]} />
      ) : (
        <Box>
          <BiImage size="100%" />
        </Box>
      )}
      <VStack align="flex-start">
        <Tag>{post.category.name}</Tag>
        <Text
          fontSize={theme.fontSizes["3xl"]}
          fontWeight={theme.fontWeights.bold}
          wordBreak="break-word"
          whiteSpace="pre-wrap"
          isTruncated
        >
          {post.title}
        </Text>
      </VStack>
    </VStack>
  )
}

export default PostComponent
