import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, Text, useDisclosure
} from '@chakra-ui/react'
import {DeleteIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";
import {useBookmarksStore} from "../../store/Bookmarks";
import {InputModal} from "../InputModal";
import {DeleteModal} from "../DeleteModal";
import React from "react";
import "../../../css/Menu.css"
import {useShallow} from "zustand/react/shallow";

export const BookmarkItemMenu = ({ item }) => {
    const editDisclosure = useDisclosure()
    const deleteDisclosure = useDisclosure()
    const { updateBookmark, deleteBookmark } = useBookmarksStore(
      useShallow((state) => ({ updateBookmark: state.update, deleteBookmark: state.delete })),
    )


    return (
    <>
        <Menu colorScheme='teal' variant='ghost'>
          <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='ghost' colorScheme='teal' size='lg'>
          </MenuButton>
          <MenuList className='menu-list'>
            <MenuItem onClick={editDisclosure.onOpen} icon={<EditIcon />} className='menu-list-item'>Edit</MenuItem>
            <MenuItem onClick={deleteDisclosure.onOpen} icon={<DeleteIcon />} className='menu-list-item'>Delete</MenuItem>
          </MenuList>
        </Menu>

        <InputModal
            key={`bookmark-input-modal-${item.id}`}
            clickFunc={(input)=> updateBookmark(item.id, { title: input })}
            initialInput={item.title}
            isOpen={editDisclosure.isOpen}
            onClose={editDisclosure.onClose}
            header='Update Bookmark'
            formLabel='Name'
            buttonText='Edit'
        />
        <DeleteModal
            clickFunc={()=> deleteBookmark(item.id)}
            isOpen={deleteDisclosure.isOpen}
            onClose={deleteDisclosure.onClose}
            header='Delete Bookmark'
            body={<Text>{item.title}</Text>}
            buttonText='Delete'
        />
    </>
    );
}
