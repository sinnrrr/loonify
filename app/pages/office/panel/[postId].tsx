import { Alert, AlertIcon } from "@chakra-ui/alert"
import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { Box, Text, VStack } from "@chakra-ui/layout"
import MiddlePanel from "app/core/components/layout/MiddlePanel"
import { usePostRedirect } from "app/core/hooks/usePostRedirect"
import IndexLayout from "app/core/layouts/IndexLayout"
import getPost from "app/posts/queries/getPost"
import { BlitzPage, useParam, useQuery } from "blitz"
import { NextSeo } from "next-seo"
import { BiImage } from "react-icons/bi"

const Quick: BlitzPage = () => {
  const postRedirect = usePostRedirect()
  const [post] = useQuery(getPost, { id: useParam("postId", "number") })

  return (
    <>
      <NextSeo
        title={`${post.title} | Loonify`}
        description={"Оголошення на бюро знахідок"}
        openGraph={{
          url: window.location.href && window.location.href,
          title: `${post.title} | Loonify`,
          description: "Оголошення на бюро знахідок",
          images: post.images.map((image) => ({ url: image })),
          site_name: "Loonify",
        }}
      />
      <VStack align="flex-start">
        <MiddlePanel heading="Оголошення" />

        {post.images.length > 0 ? (
          <Image src={post.images[0]} alt="Post image" />
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
          <Text>
            Ви бачите скорочену версію оголошення. Щоб мати більше можливостей варто перейти до
            повної версії.
          </Text>
        </Alert>
        <Button onClick={() => postRedirect(post.id)} isFullWidth>
          Дивитись повне оголошення
        </Button>
      </VStack>
    </>
  )
}

Quick.suppressFirstRenderFlicker = true
Quick.getLayout = (page) => <IndexLayout>{page}</IndexLayout>

export default Quick
