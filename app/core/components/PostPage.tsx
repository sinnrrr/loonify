import { useSession, useQuery, useMutation, useParam, ErrorComponent } from "@blitzjs/core"
import { Avatar } from "@chakra-ui/avatar"
import { Button } from "@chakra-ui/button"
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable"
import { Box, Container, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import theme from "@chakra-ui/theme"
import getPost from "app/posts/queries/getPost"
import { Post, User } from "db"
import { FunctionComponent } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Map from "./Map"
import { UpdatePost } from "app/posts/validations"
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control"
import updatePost from "app/posts/mutations/updatePost"
import { Textarea } from "@chakra-ui/textarea"

const InformationBlock: FunctionComponent<{ post?: Post }> = ({ post }) => {
  // Editable if session user id is equal to post owner id
  const isEditable = useSession().userId === post.ownerId

  // Start with edit mode if post is undefined
  const startWithEdit = !!!post

  // Zod react hook form registering
  const {
    reset,
    errors,
    register,
    getValues,
    formState: { isDirty },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(UpdatePost),
  })

  // Helper keys
  const TITLE_KEY = "title"
  const DESCRIPTION_KEY = "description"

  // Mutation for updating
  const [updatePostMutation] = useMutation(updatePost)

  // Update post on correct input
  const onCorrectSubmit = async () => {
    if (isDirty) {
      await updatePostMutation({ ...getValues(), id: post.id })
      reset(undefined, { isDirty: false })
    }
  }

  return (
    <Container maxWidth={theme.sizes.container.md}>
      <VStack mt={theme.space[6]}>
        <FormControl isInvalid={!!errors[TITLE_KEY]}>
          <Editable
            as={Heading}
            selectAllOnFocus={false}
            isPreviewFocusable={isEditable}
            startWithEditView={startWithEdit}
            defaultValue={post[TITLE_KEY]}
            submitOnBlur={!!!errors[TITLE_KEY]}
            onSubmit={onCorrectSubmit}
            placeholder="Title"
            wordBreak="break-word"
          >
            <EditablePreview />
            <EditableInput
              as={Textarea}
              isInvalid={!!errors[TITLE_KEY]}
              name={TITLE_KEY}
              ref={register}
            />
          </Editable>
          <FormErrorMessage mt={theme.space[0]} mb={theme.space[4]}>
            {errors[TITLE_KEY]?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors[DESCRIPTION_KEY]}>
          <Editable
            as={Text}
            selectAllOnFocus={false}
            isPreviewFocusable={isEditable}
            startWithEditView={startWithEdit}
            defaultValue={post[DESCRIPTION_KEY]}
            submitOnBlur={!!!errors[DESCRIPTION_KEY]}
            onSubmit={onCorrectSubmit}
            placeholder="Description"
            wordBreak="break-word"
          >
            <EditablePreview />
            <EditableInput
              as={Textarea}
              isInvalid={!!errors[DESCRIPTION_KEY]}
              name={DESCRIPTION_KEY}
              ref={register}
            />
          </Editable>
          <FormErrorMessage mt={theme.space[0]} mb={theme.space[4]}>
            {errors[DESCRIPTION_KEY]?.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
    </Container>
  )
}

const AccountBlock: FunctionComponent<{ post?: Post; account?: User }> = ({ post, account }) => {
  const isCreating = !!!post

  return (
    <VStack
      mt={{ base: theme.space[8], md: theme.space[0] }}
      mb={{ base: theme.space[8], md: theme.space[8] }}
      align="start"
      spacing={theme.space[4]}
    >
      <HStack alignItems="start" spacing={theme.space[4]}>
        <Avatar size="lg" />
        <Box>
          <Heading size="lg">{account.name}</Heading>
          <Text>On service since 20.03.2021</Text>
        </Box>
      </HStack>
      <HStack width="100%">
        {isCreating ? (
          <Button>Save</Button>
        ) : (
          <>
            <Button isFullWidth size="lg">
              Contact
            </Button>
            <Button isFullWidth size="lg">
              Pdf
            </Button>
          </>
        )}
      </HStack>
    </VStack>
  )
}

const MediaBlock: FunctionComponent = () => {
  return (
    <Container maxWidth={theme.sizes.container.md}>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Picture</Tab>
          <Tab>Location</Tab>
        </TabList>
        <TabPanels>
          <TabPanel border={theme.borders["1px"]} borderColor={theme.colors.gray[200]}>
            <img
              src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg"
              alt=""
            />
          </TabPanel>
          <TabPanel border={theme.borders["1px"]} borderColor={theme.colors.gray[200]}>
            <Flex height="50vh" width="100%" maxWidth={theme.sizes.container.md}>
              <Map />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

const RelatedBlock: FunctionComponent = () => {
  return <Flex>Related</Flex>
}

const PostPage: FunctionComponent<{ post?: Post; user?: User; mode: "new" | "view" }> = ({
  post,
  user,
  mode,
}) => {
  const COLUMN_BREAKPOINT = "base"
  const ROW_BREAKPOINT = "md"

  return (
    <Flex
      grow={1}
      justify={{ [COLUMN_BREAKPOINT]: "start", [ROW_BREAKPOINT]: "center" }}
      direction={{ [COLUMN_BREAKPOINT]: "column", [ROW_BREAKPOINT]: "row" }}
      my={theme.space[5]}
    >
      <Flex direction="column">
        <MediaBlock />
        <InformationBlock post={post} />
      </Flex>
      <Flex direction="column">
        <Container
          maxWidth={{
            [COLUMN_BREAKPOINT]: "100%",
            [ROW_BREAKPOINT]: theme.sizes.container.sm,
          }}
        >
          <AccountBlock post={post} account={user} />
          <RelatedBlock />
        </Container>
      </Flex>
    </Flex>
  )
}

export default PostPage
