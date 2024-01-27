import React from 'react';
import {
    Button,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text
} from '@chakra-ui/react'

export const DeleteModal = ({ clickFunc, fetchCollection, isOpen, onClose, header, body, buttonText='Delete'}) => {
    const onClick = async () => {
        onClose()
        await clickFunc()
        fetchCollection()
      };

    return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Text>{body}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onClick}>
              {buttonText}
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
    );
}
