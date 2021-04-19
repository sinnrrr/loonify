import { Portal } from "@chakra-ui/portal"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { FunctionComponent, useState } from "react"
import { Button } from "@chakra-ui/button"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion"
import { useQuery } from "@blitzjs/core"
import getCategories from "app/categories/queries/getCategories"
import { Box, Text, VStack } from "@chakra-ui/layout"
import { Category } from "db"
import { Tag } from "@chakra-ui/tag"
import { ModalComponentProps } from "types"
import { AddIcon } from "@chakra-ui/icons"
import { useDisclosure } from "@chakra-ui/hooks"
import NewCategoryModal from "./NewCategoryModal"

export type CategorySelectModalProps = ModalComponentProps<Category> & { canCreateNew?: boolean }

const CategorySelectModal: FunctionComponent<CategorySelectModalProps> = ({
  isOpen,
  onClose,
  onFinish,
  canCreateNew = false,
}) => {
  const newCategoryModal = useDisclosure()
  const [{ categories }] = useQuery(getCategories, {})
  const [selectedCategory, setSelectedCategory] = useState<Category>()

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box>
              <Text>Обрати категорію</Text>
              {canCreateNew && (
                <>
                  <Button
                    leftIcon={<AddIcon h={2} w={2} />}
                    onClick={newCategoryModal.onOpen}
                    variant="link"
                  >
                    Створити нову
                  </Button>
                  <NewCategoryModal
                    isOpen={newCategoryModal.isOpen}
                    onClose={newCategoryModal.onClose}
                    onFinish={(data) => console.log(data)}
                  />
                </>
              )}
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="flex-start" spacing={8}>
              <Accordion w="100%" allowMultiple>
                {categories.map(
                  (category, index) =>
                    category.parentId && (
                      <AccordionItem key={index}>
                        <h2>
                          <AccordionButton onClick={() => setSelectedCategory(category)}>
                            <Box flex="1" textAlign="left">
                              {category.name}
                            </Box>
                            {!!category.parent && <AccordionIcon />}
                          </AccordionButton>
                        </h2>
                        {category.parent && (
                          <AccordionPanel pb={4}>
                            <Button
                              onClick={() => setSelectedCategory(category.parent!)}
                              variant="link"
                            >
                              {category.parent.name}
                            </Button>
                          </AccordionPanel>
                        )}
                      </AccordionItem>
                    )
                )}
              </Accordion>

              {!!selectedCategory && (
                <Text>
                  Обрано: <Tag>{selectedCategory.name}</Tag>
                </Text>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Закрити
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={!!!selectedCategory}
              onClick={() => {
                onFinish(selectedCategory!)
                onClose()
              }}
            >
              Підтвердити
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  )
}

export default CategorySelectModal
