import { useMutation } from "@blitzjs/core"
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable"
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control"
import { Container, Heading, Text, VStack } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/tag"
import { Textarea } from "@chakra-ui/textarea"
import theme from "@chakra-ui/theme"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Post } from "db"
import { FunctionComponent } from "react"
import { useForm } from "react-hook-form"
import { DESCRIPTION_FORM_KEY, TITLE_FORM_KEY } from "../constants"
import { useAuthor } from "../hooks/useAuthor"
import updatePost from "../mutations/updatePost"
import { UpdatePost } from "../validations"

const InformationBlock: FunctionComponent<{ post: Post; category: Category }> = ({
  post,
  category,
}) => {
  // Editable if session user id is equal to post owner id
  const isEditable = useAuthor(post.ownerId)

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
      <VStack align="flex-start" mt={theme.space[6]}>
        <Tag>{category.name}</Tag>
        <FormControl isInvalid={!!errors[TITLE_FORM_KEY]}>
          <Editable
            as={Heading}
            selectAllOnFocus={false}
            isPreviewFocusable={isEditable}
            startWithEditView={startWithEdit}
            defaultValue={post[TITLE_FORM_KEY]}
            submitOnBlur={!!!errors[TITLE_FORM_KEY]}
            onSubmit={onCorrectSubmit}
            placeholder="Заголовок"
            wordBreak="break-word"
          >
            <EditablePreview />
            <EditableInput
              as={Textarea}
              isInvalid={!!errors[TITLE_FORM_KEY]}
              name={TITLE_FORM_KEY}
              ref={register}
            />
          </Editable>
          <FormErrorMessage mt={theme.space[0]} mb={theme.space[4]}>
            {errors[TITLE_FORM_KEY]?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors[DESCRIPTION_FORM_KEY]}>
          <Editable
            as={Text}
            selectAllOnFocus={false}
            isPreviewFocusable={isEditable}
            startWithEditView={startWithEdit}
            defaultValue={post[DESCRIPTION_FORM_KEY]}
            submitOnBlur={!!!errors[DESCRIPTION_FORM_KEY]}
            onSubmit={onCorrectSubmit}
            placeholder="Опис"
            wordBreak="break-word"
          >
            <EditablePreview />
            <EditableInput
              as={Textarea}
              rows="8"
              isInvalid={!!errors[DESCRIPTION_FORM_KEY]}
              name={DESCRIPTION_FORM_KEY}
              ref={register}
            />
          </Editable>
          <FormErrorMessage mt={theme.space[0]} mb={theme.space[4]}>
            {errors[DESCRIPTION_FORM_KEY]?.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
    </Container>
  )
}

export default InformationBlock
