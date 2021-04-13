import { useQuery } from "@blitzjs/core"
import { Image } from "@chakra-ui/image"
import { Heading, Text, VStack } from "@chakra-ui/layout"
import getPost from "app/posts/queries/getPost"
import { usePanelStore } from "../stores/panel"

const ViewPanel = () => {
  const { selectedPost } = usePanelStore()
  const [post] = useQuery(getPost, { id: selectedPost })

  return (
    <VStack align="flex-start">
      <Image src={post.images[0]} />
      <Heading>{post.title}</Heading>
      <Text>{post.description}</Text>
    </VStack>
  )
}

export default ViewPanel
