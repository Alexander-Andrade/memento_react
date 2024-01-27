import React, {useState} from 'react';
import {
    Button,
    FormControl, FormLabel,
    Input,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react'

export const InputModal = ({ clickFunc, fetchCollection, isOpen, onClose, initialInput='', header, formLabel, buttonText}) => {
    const [input, setInput] = useState(initialInput)
    const initialRef = React.useRef(null)

    const onClick = async () => {
        onClose()
        await clickFunc(input)
        setInput('')
        fetchCollection()
      };

    const handleInputChange = (e) => setInput(e.target.value)

    return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <FormControl>
                  <FormLabel>{formLabel}</FormLabel>
                  <Input ref={initialRef} value={input} onChange={handleInputChange} size='lg'/>
              </FormControl>
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
