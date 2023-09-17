import React from 'react';
import {Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Select, Text} from '@chakra-ui/react'
import {COLOR_DARKER, COLOR_LIGHT, COLOR_LIGHTER} from "../../constants/Colors";
import {AddIcon, DeleteIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";

export const BookmarkItem = ({ item }) => {
  return (
        <Flex flexDirection='row' justifyContent='space-between' bg={COLOR_DARKER}>
            <Flex flexDirection='column' justifyContent='center' h='60px' fontWeight='bold'>
          <Text color={COLOR_LIGHTER} pl={3} fontSize='2xl' textAlign='left'>{item.title}</Text>
            </Flex>
             <Flex flexDirection='column' justifyContent='center' h='60px'>
          <Menu colorScheme='teal' variant='ghost'>
              <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='ghost' colorScheme='teal'>
              </MenuButton>
              <MenuList >
                <MenuItem color='teal' icon={<EditIcon />}>Edit</MenuItem>
                <MenuItem color='teal' icon={<DeleteIcon />}>Delete</MenuItem>
              </MenuList>
            </Menu>
          {/*       <IconButton aria-label='Add Bookmark' size='lg' colorScheme='teal'  variant='ghost' icon={<EditIcon/>}>*/}
          {/*<option value='option1'>Option 1</option>*/}
          {/*</IconButton>*/}
             </Flex>
      </Flex>
  );
}
