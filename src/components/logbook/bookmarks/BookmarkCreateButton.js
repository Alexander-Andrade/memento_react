import React from 'react';
import {
    Flex,
    IconButton,
    useDisclosure
} from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons";
import {useBookmarksStore} from "../../store/Bookmarks";
import {InputModal} from "../InputModal";


export const BookmarkCreateButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const createBookmark = useBookmarksStore((state) => state.create)


  return (
    <>
    <Flex flexDirection='row' alignItems='stretch'>
        <IconButton onClick={onOpen} flex='1' aria-label='Add Bookmark' size='lg' colorScheme='teal' variant='ghost' icon={<AddIcon/>} />
    </Flex>
    <InputModal
        clickFunc={(input) => createBookmark({ title: input })}
        isOpen={isOpen}
        onClose={onClose}
        header='Create Bookmark'
        formLabel='Name'
        buttonText='Create'
    />
    </>
  );
}
