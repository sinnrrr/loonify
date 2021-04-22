import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { Category } from "db"
import dynamic from "next/dynamic"
import { useState } from "react"
import { UnregisteredFormFieldProps } from "types"

// Required, because without this map causes initialization error
const CategorySelectModal = dynamic(() => import("app/core/components/modals/CategorySelectModal"))

export type CategoryFieldProps = UnregisteredFormFieldProps & {
  onFinish: (data: Category) => void
  modal?: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
}

export const categoryFieldAsProps = ({
  modal,
  onFinish,
  getError,
  selectedCategory,
  setSelectedCategory,
}: CategoryFieldProps & {
  selectedCategory?: Category
  setSelectedCategory: (as?: Category) => void
}): FormComponentProps => ({
  isRequired: true,
  getError,
  label: "Категорія",
  helperText: "Категорії оголошень забезпечують швидкий пошук",
  children: (
    <>
      {selectedCategory ? (
        <Tag size="lg">
          <TagLabel>{selectedCategory.name}</TagLabel>
          <TagCloseButton onClick={() => setSelectedCategory!(undefined)} />
        </Tag>
      ) : (
        <Button onClick={modal!.onOpen} isFullWidth>
          Оберіть категорію
        </Button>
      )}
      <CategorySelectModal
        canCreateNew
        isOpen={modal!.isOpen}
        onClose={modal!.onClose}
        onFinish={(category) => {
          onFinish(category)
          setSelectedCategory!(category)
        }}
      />
    </>
  ),
})

const CategoryField = ({ getError, onFinish }: CategoryFieldProps) => {
  const modal = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>()
  const passwordFieldProps = categoryFieldAsProps({
    modal,
    getError,
    onFinish,
    selectedCategory,
    setSelectedCategory,
  })

  return <FormComponent {...passwordFieldProps} />
}

export default CategoryField
