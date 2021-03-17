import React from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import { Avatar } from "@chakra-ui/avatar"
import { Button } from "@chakra-ui/button"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { useNextBreakpoint } from "app/core/hooks/useNextBreakpoint"
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton"

const RowLayout = () => {
  return (
    <Flex grow={1} position="sticky" top={0} maxHeight="100vh" direction="column" color="white">
      <Skeleton display="flex" flexGrow={0.5} m={theme.space[2]}>
        <Flex grow={1} bgColor="black"></Flex>
      </Skeleton>

      <Skeleton display="flex" flexGrow={0.5} minHeight={theme.sizes.sm} m={theme.space[2]}>
        <Flex grow={1} bgColor="black">
          Images
        </Flex>
      </Skeleton>
    </Flex>
  )
}

const ColumnLayout = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>
          <SkeletonText noOfLines={1}>Pictures</SkeletonText>
        </Tab>
        <Tab>
          <SkeletonText noOfLines={1}>Location</SkeletonText>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={theme.space[2]}>
          <p>one!</p>
        </TabPanel>
        <TabPanel p={theme.space[2]}>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

const CreatePost: BlitzPage = () => {
  const ROW_BREAKPOINT = "lg"
  const COLUMN_BREAKPOINT = "base"

  const layout = useBreakpointValue({
    [COLUMN_BREAKPOINT]: <ColumnLayout />,
    [ROW_BREAKPOINT]: <RowLayout />,
  })

  return (
    <Flex grow={1} direction={{ [COLUMN_BREAKPOINT]: "column", [ROW_BREAKPOINT]: "row" }}>
      {layout}

      <Flex
        grow={1}
        m={theme.space[2]}
        maxWidth={{
          [ROW_BREAKPOINT]: theme.sizes.container.sm,
          [useNextBreakpoint(ROW_BREAKPOINT)]: theme.sizes.container.md,
        }}
        direction="column"
        justify="space-between"
      >
        <Flex direction="column">
          <SkeletonText skeletonHeight={theme.fontSizes.xl} />
          {/* <Heading>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Heading> */}

          <SkeletonText my={theme.space[8]} noOfLines={24} spacing="4" />
          {/* <Text my={theme.space[8]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt omnis
            iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit, voluptatum
            dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem expedita?
            Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores illo,
            omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus quam incidunt
            omnis iure tenetur deleniti recusandae consequuntur nobis placeat numquam odit,
            voluptatum dolorum itaque temporibus. In illum quis quasi! Nam laborum repellat quidem
            expedita? Distinctio quam ullam at optio ipsum culpa odio modi saepe, non nihil maiores
            illo, omnis sunt aperiam beatae facilis possimus magni asperiores. Sed, magni tenetur!
            Possimus totam sequi vero laboriosam exercitationem debitis deleniti est alias. Tempore,
            accusantium sapiente saepe perferendis dolorum eum quos ad quae? Dolor quisquam
            repudiandae provident eum harum excepturi unde quod amet! Natus repudiandae pariatur
            officiis optio expedita animi labore dolorum aliquid non molestias voluptate cum,
            voluptatem minima sit possimus adipisci perferendis asperiores porro quia velit
            doloribus sint ratione! Autem, magnam aut? Officia vitae sint recusandae minus
            dignissimos. Sunt unde rem itaque cum fugit quam deleniti dolorum adipisci eos ullam
            commodi ea praesentium cupiditate facere repudiandae, rerum placeat aliquam nemo ut!
            Iste.
          </Text> */}
        </Flex>
        <Flex justify="space-between" direction={{ [COLUMN_BREAKPOINT]: "column", sm: "row" }}>
          <HStack>
            <Box>
              {/* <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" /> */}
              <SkeletonCircle size={theme.sizes[12]} />
            </Box>
            <Flex direction="column" justify="center" minWidth={theme.sizes["2xs"]}>
              {/* <Heading fontSize={theme.fontSizes["2xl"]}>Dmytro Soltusyuk</Heading> */}
              <SkeletonText skeletonHeight={theme.fontSizes["2xl"]} noOfLines={1} />

              {/* <Text fontSize={theme.fontSizes.sm}>On service since 17.06.2021</Text> */}
              <SkeletonText skeletonHeight={theme.fontSizes.sm} mt={theme.space[2]} noOfLines={1} />
            </Flex>
          </HStack>
          <Flex my={{ [COLUMN_BREAKPOINT]: theme.space[2] }}>
            <Skeleton>
              <Button isFullWidth>Click me</Button>
            </Skeleton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

CreatePost.suppressFirstRenderFlicker = true
CreatePost.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default CreatePost
