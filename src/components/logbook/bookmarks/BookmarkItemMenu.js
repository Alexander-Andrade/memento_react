import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, Text, useDisclosure
} from '@chakra-ui/react'
import {DeleteIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";
import {useBookmarksStore} from "../../store/Bookmarks";
import {deleteBookmark, updateBookmark} from "../../queries/Bookmarks";
import {InputModal} from "../InputModal";
import {DeleteModal} from "../DeleteModal";
import React from "react";

export const BookmarkItemMenu = ({ item }) => {
    const editDisclosure = useDisclosure()
    const deleteDisclosure = useDisclosure()
    const fetchBookmarks = useBookmarksStore((state) => state.fetch)

    return (
    <>
        <Menu colorScheme='teal' variant='ghost'>
          <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='ghost' colorScheme='teal'>
          </MenuButton>
          <MenuList >
            <MenuItem onClick={editDisclosure.onOpen} color='teal' icon={<EditIcon />}>Edit</MenuItem>
            <MenuItem onClick={deleteDisclosure.onOpen} color='teal' icon={<DeleteIcon />}>Delete</MenuItem>
          </MenuList>
        </Menu>

        <InputModal
            key={`bookmark-input-modal-${item.id}`}
            clickFunc={(input)=> updateBookmark(item.id, input)}
            initialInput={item.title}
            fetchCollection={fetchBookmarks}
            isOpen={editDisclosure.isOpen}
            onClose={editDisclosure.onClose}
            header='Update Bookmark'
            formLabel='Name'
            buttonText='Edit'
        />
        <DeleteModal
            clickFunc={()=> deleteBookmark(item.id)}
            fetchCollection={fetchBookmarks}
            isOpen={deleteDisclosure.isOpen}
            onClose={deleteDisclosure.onClose}
            header='Delete Bookmark'
            body={<Text>item.title</Text>}
            buttonText='Delete'
        />
    </>
    );
}
