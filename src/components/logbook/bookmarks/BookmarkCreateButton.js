import React, {useState} from 'react';
import {
    Flex,
    IconButton,
    useDisclosure
} from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons";
import {createBookmark} from "../../queries/Bookmarks";
import {useBookmarksStore} from "../../store/Bookmarks";
import {InputModal} from "../InputModal";


export const BookmarkCreateButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fetchBookmarks = useBookmarksStore((state) => state.fetch)


  return (
    <>
    <Flex flexDirection='row' alignItems='stretch'>
        <IconButton onClick={onOpen} flex='1' aria-label='Add Bookmark' size='lg' colorScheme='teal'  variant='ghost' icon={<AddIcon/>} />
    </Flex>
    <InputModal
        clickFunc={(input) => createBookmark(input)}
        fetchCollection={fetchBookmarks}
        isOpen={isOpen}
        onClose={onClose}
        header='Create Bookmark'
        formLabel='Name'
        buttonText='Create'
    />
    </>
  );
}
