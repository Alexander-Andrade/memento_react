import React from 'react';
import {IconButton, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react'
import {DeleteIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";

export const BookmarkItemMenu = ({ item }) => {
  return (
  <Menu colorScheme='teal' variant='ghost'>
      <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='ghost' colorScheme='teal'>
      </MenuButton>
      <MenuList >
        <MenuItem color='teal' icon={<EditIcon />}>Edit</MenuItem>
        <MenuItem color='teal' icon={<DeleteIcon />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
