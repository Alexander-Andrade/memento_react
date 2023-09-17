import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Flex, FormControl, FormLabel,
    IconButton, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react'
import {AddIcon, EditIcon} from "@chakra-ui/icons";
import * as PropTypes from "prop-types";
import {createBookmark} from "../../queries/Bookmarks";
import {useBookmarksStore} from "../../store/Bookmarks";


export const BookmarkCreateButton = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [input, setInput] = useState('')
  const fetchBookmarks = useBookmarksStore((state) => state.fetch)

  const initialRef = React.useRef(null)

  const onCreate = async () => {
    onClose()
    await createBookmark(input)
    setInput('')
    fetchBookmarks()
  };

  const handleInputChange = (e) => setInput(e.target.value)

  return (
    <>
    <Flex flexDirection='row' alignItems='stretch'>
        <IconButton onClick={onOpen} flex='1' aria-label='Add Bookmark' size='lg' colorScheme='teal'  variant='ghost' icon={<AddIcon/>} />
    </Flex>

    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Bookmark</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input ref={initialRef} value={input} onChange={handleInputChange} />
              </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onCreate}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
    </>
  );
}
