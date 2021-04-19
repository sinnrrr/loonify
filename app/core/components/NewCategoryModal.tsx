import { Button } from "@chakra-ui/button"
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
import { Category } from "db"
import { FunctionComponent } from "react"
import { ModalComponentProps } from "types"

const NewCategoryModal: FunctionComponent<ModalComponentProps<Category>> = ({
  isOpen,
  onClose,
  onFinish,
}) => (
  <Portal>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Створити нову категорію</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel totam sequi tempora nobis,
          necessitatibus enim quae error voluptatibus nulla, minus hic, nemo adipisci dolore
          incidunt blanditiis eaque consequuntur. Soluta, quod?
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Відміна
          </Button>
          <Button variant="ghost">Створити</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Portal>
)

export default NewCategoryModal
