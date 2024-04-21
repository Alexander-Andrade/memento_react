import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

export const PreviewModal = ({isOpen, onClose, modalHeader, modalBody}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='80em' >
      <ModalOverlay />
        <ModalContent w="960px">
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton size='lg'/>
          <ModalBody>
            {modalBody}
          </ModalBody>
        </ModalContent>
    </Modal>
  );
}