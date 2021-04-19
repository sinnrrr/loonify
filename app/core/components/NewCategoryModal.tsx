import { useMutation } from "@blitzjs/core"
import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { VStack } from "@chakra-ui/layout"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { Portal } from "@chakra-ui/portal"
import theme from "@chakra-ui/theme"
import { zodResolver } from "@hookform/resolvers/zod"
import { NAME_FORM_KEY, PARENT_FORM_KEY } from "app/categories/constants"
import createCategory from "app/categories/mutations/createCategory"
import { CreateCategory } from "app/categories/validations"
import { Category } from "db"
import { FunctionComponent } from "react"
import { useForm } from "react-hook-form"
import { ModalComponentProps } from "types"
import CategorySelectModal from "./CategorySelectModal"
import FormComponent from "./FormComponent"

const NewCategoryModal: FunctionComponent<ModalComponentProps<Category>> = ({
  isOpen,
  onClose,
  onFinish,
}) => {
  const {
    errors,
    trigger,
    register,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(CreateCategory),
  })

  const selectCategoryModal = useDisclosure()
  const [createCategoryMutation] = useMutation(createCategory)

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Створити нову категорію</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={theme.space[8]}>
              <FormComponent
                isRequired
                label="Назва"
                helperText="Оберіть назву категорії"
                getError={() => errors[NAME_FORM_KEY]}
                field={{
                  register,
                  formKey: NAME_FORM_KEY,
                  placeholder: "Назва категорії",
                }}
              />
              <FormComponent
                label="Залежність"
                getError={() => errors[PARENT_FORM_KEY]}
                helperText="Оберіть батьківську категорію (тобто якщо марка автомобілю, то батьківська категорія - автомобілі)"
              >
                <Button onClick={selectCategoryModal.onOpen}>Обрати</Button>
                <CategorySelectModal
                  canCreateNew
                  isOpen={selectCategoryModal.isOpen}
                  onClose={selectCategoryModal.onClose}
                  onFinish={(selectedCategory) => {
                    setValue(PARENT_FORM_KEY, selectedCategory.id)
                    trigger(PARENT_FORM_KEY)
                  }}
                />
              </FormComponent>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Відміна
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={!isValid}
              onClick={() => createCategoryMutation(getValues()).then(onFinish).then(onClose)}
            >
              Створити
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  )
}

export default NewCategoryModal
