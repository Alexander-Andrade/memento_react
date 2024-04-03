import React from 'react';
import {Flex, Text} from '@chakra-ui/react'
import {COLOR_DARK, COLOR_DARKER, COLOR_LIGHTER} from "../constants/Colors";
import {ListItemMenu} from "./ListItemMenu";

export const ListItem = ({ itemId, field, selected, onSelect, fetchList, collectionName, updateFunc, deleteFunc, navigatePath }) => {
  const color = (selected === itemId) ? COLOR_DARK : COLOR_DARKER

  return (
    <Flex flexDirection='row' justifyContent='space-between' bg={color} onClick={onSelect} borderRadius="md">
    <Flex flexDirection='column' justifyContent='center' h='60px' fontWeight='bold'>
        <Text color={COLOR_LIGHTER} pl={3} fontSize='2xl' textAlign='left' className='category-item'>{field}</Text>
    </Flex>
     <Flex flexDirection='column' justifyContent='center' h='60px'>
        <ListItemMenu
            itemId={itemId}
            field={field}
            fetchList={fetchList}
            collectionName={collectionName}
            updateFunc={updateFunc}
            deleteFunc={deleteFunc}
        />
     </Flex>
    </Flex>
  );
}
