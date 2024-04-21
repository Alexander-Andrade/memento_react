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

    const onClick = async (event) => {
        event.preventDefault()
        event.stopPropagation()
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
        <ModalCloseButton size='lg'/>
        <form onSubmit={onClick}>
          <ModalBody>
            <FormControl>
              <FormLabel color='memento.600'>{formLabel}</FormLabel>
              <Input ref={initialRef} value={input} onChange={handleInputChange} size='lg'/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' size='lg' colorScheme='teal' mr={3}>
              {buttonText}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
);
}
