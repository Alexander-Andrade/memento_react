import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import "./PreviewModal.css"

export const PreviewModal = ({isOpen, onClose, header, body}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='80em' >
      <ModalOverlay />
        <ModalContent w="1900px" data-color-mode="dark" className='preview-modal'>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton size='lg'/>
          <ModalBody>
            {body}
          </ModalBody>
        </ModalContent>
    </Modal>
  );
}