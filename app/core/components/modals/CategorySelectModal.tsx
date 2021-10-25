import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion"
import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { AddIcon } from "@chakra-ui/icons"
import { Box, Text, VStack } from "@chakra-ui/layout"
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
import { Tag } from "@chakra-ui/tag"
import getCategories from "app/categories/queries/getCategories"
import { useBrandColor } from "app/core/hooks/useBrandColor"
import { useQuery } from "blitz"
import { Category } from "db"
import { FunctionComponent, useState } from "react"
import { ModalComponentProps } from "types"
import NewCategoryModal from "./NewCategoryModal"

export type CategorySelectModalProps = ModalComponentProps<Category> & { canCreateNew?: boolean }

const CategorySelectModal: FunctionComponent<CategorySelectModalProps> = ({
  isOpen,
  onClose,
  onFinish,
  canCreateNew = false,
}) => {
  const newCategoryModal = useDisclosure()
  const [result, { refetch }] = useQuery(getCategories, {})
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
                    onFinish={() => refetch()}
                  />
                </>
              )}
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="flex-start" spacing={8}>
              <Accordion w="100%" allowMultiple>
                {result.categories
                  .filter((category) => !!!category.parent)
                  .map((parentCategory, index) => (
                    <AccordionItem key={index}>
                      <h2>
                        <AccordionButton onClick={() => setSelectedCategory(parentCategory)}>
                          <Box flex="1" textAlign="left">
                            {parentCategory.name}
                          </Box>
                          {result.categories.filter(
                            (category) => category.parent?.id === parentCategory.id
                          ).length > 0 && <AccordionIcon />}
                        </AccordionButton>
                      </h2>
                      {result.categories
                        .filter((category) => category.parent?.id === parentCategory.id)
                        .map((childCategory, index) => (
                          <AccordionPanel key={index} pb={4}>
                            <Button
                              onClick={() => setSelectedCategory(childCategory)}
                              variant="link"
                            >
                              {childCategory.name}
                            </Button>
                          </AccordionPanel>
                        ))}
                    </AccordionItem>
                  ))}
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
              colorScheme={useBrandColor(true)}
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
