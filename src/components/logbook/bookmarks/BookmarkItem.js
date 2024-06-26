import React from 'react';
import {Flex, Text} from '@chakra-ui/react'
import {COLOR_DARK, COLOR_DARKER, COLOR_LIGHTER} from "../../constants/Colors";
import {BookmarkItemMenu} from "./BookmarkItemMenu";
import {useTopicsStore} from "../../store/Topics";
import {useEntriesStore} from "../../store/Entries";
import '../LineItem.css'

export const BookmarkItem = ({ item, selected, setSelected }) => {
  const fetchTopics = useTopicsStore((state) => state.fetch)
  const color = (selected === item.id) ? COLOR_DARK : COLOR_DARKER
  const resetSelectedTopicId = useTopicsStore((state) => state.resetSelectedId)
  const resetEntries = useEntriesStore((state) => state.resetEntries)

  const onSelect = async () => {
    setSelected(item.id)
    resetSelectedTopicId()
    resetEntries()
    fetchTopics(item.id)
  };

  return (
    <Flex flexDirection='row' justifyContent='space-between' bg={color} onClick={onSelect} borderRadius="md" className='category-item'>
    <Flex flexDirection='column' justifyContent='center' h='60px' fontWeight='bold'>
        <Text color={COLOR_LIGHTER} pl={3} fontSize='2xl' textAlign='left'>{item.title}</Text>
    </Flex>
     <Flex flexDirection='column' justifyContent='center' h='60px'>
        <BookmarkItemMenu item={item}/>
     </Flex>
    </Flex>
  );
}
