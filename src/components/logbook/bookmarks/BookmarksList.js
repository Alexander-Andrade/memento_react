import React from 'react';
import { VStack, Flex,Box,Center, StackDivider, Text } from '@chakra-ui/react'
import {BookmarkItem} from './BookmarkItem'

export const BookmarksList = ({ items }) => {
  return (
      <VStack
      divider={<StackDivider />}
      spacing={0}
      align='stretch'
      >
        {items.map((item) => (
          <BookmarkItem item={item} />
        ))}
      </VStack>
  );
}
