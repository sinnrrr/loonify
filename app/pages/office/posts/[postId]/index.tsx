import { useParam, BlitzPage, useQuery, dynamic } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Container, Flex, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import getPost from "app/posts/queries/getPost"
import MediaBlock from "app/posts/components/MediaBlock"
import InformationBlock from "app/posts/components/InformationBlock"
import AccountBlock from "app/posts/components/AccountBlock"
import { COLUMN_BREAKPOINT, ROW_BREAKPOINT } from "app/posts/constants"
import { ArticleJsonLd, NextSeo } from "next-seo"
import LogoBlock from "app/core/components/layout/LogoBlock"

const QrBlock = dynamic(() => import("app/posts/components/QrBlock"), { ssr: false })

const ShowPostPage: BlitzPage = () => {
  // Post id from query
  const postId = useParam("postId", "number")

  // Resolving post and sparing
  const [postInfo] = useQuery(getPost, { id: postId })
  const { owner, category, ...post } = postInfo

  return (
    <>
      <NextSeo
        title={`${post.title} | Loonify`}
        description={"Оголошення на бюро знахідок"}
        canonical={window.location.href && window.location.href}
        openGraph={{
          url: window.location.href && window.location.href,
          title: `${post.title} | Loonify`,
          description: "Оголошення на бюро знахідок",
          images: post.images.map((image) => ({ url: image })),
          site_name: "Loonify",
        }}
      />
      <ArticleJsonLd
        url={window.location.href && window.location.href}
        title={post.title}
        images={post.images}
        datePublished={post.createdAt.toISOString()}
        dateModified={post.updatedAt.toISOString()}
        authorName={[`${owner.firstName} ${owner.lastName}`]}
        publisherName="Loonify"
        publisherLogo="https://www.example.com/photos/logo.jpg"
        description={post.description}
      />
      <Flex
        grow={1}
        justify={{ [COLUMN_BREAKPOINT]: "start", [ROW_BREAKPOINT]: "center" }}
        direction={{ [COLUMN_BREAKPOINT]: "column", [ROW_BREAKPOINT]: "row" }}
        my={theme.space[5]}
      >
        <Flex direction="column">
          <VStack spacing={4}>
            <LogoBlock canRedirectBack />
            <MediaBlock post={post} />
            <InformationBlock category={category} post={post} />
            {/* <RelatedBlock post={post} /> */}
          </VStack>
        </Flex>
        <Flex direction="column">
          <Container
            maxWidth={{
              [COLUMN_BREAKPOINT]: "100%",
              [ROW_BREAKPOINT]: theme.sizes.sm,
            }}
          >
            <VStack align="flex-start" spacing={8}>
              <AccountBlock post={post} account={owner} />
              <QrBlock />
            </VStack>
          </Container>
        </Flex>
      </Flex>
    </>
  )
}

ShowPostPage.suppressFirstRenderFlicker = true
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage
