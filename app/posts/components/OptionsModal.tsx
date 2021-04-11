import { Button } from "@chakra-ui/button"
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"

const OptionsModal = () => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laboriosam quos doloribus
          repellendus beatae. Repellat, adipisci exercitationem ducimus officiis quam, eligendi,
          dolorem ad molestiae sapiente vero sint dignissimos aperiam necessitatibus?
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </>
  )
}

export default OptionsModal
