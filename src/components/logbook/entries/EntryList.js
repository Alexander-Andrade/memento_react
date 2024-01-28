import React, {useState} from 'react';
import { VStack, StackDivider } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useTopicsStore} from "../../store/Topics";
import {ListItem} from "../ListItem";
import {useEntriesStore} from "../../store/Entries";
import {deleteEntry, updateEntry} from "../../queries/Entries";

export const EntriesList = () => {
  const entries = useEntriesStore((state) => state.entries)
  const fetchEntries = useEntriesStore((state) => state.fetch)
  const fetchNextEntries = useEntriesStore((state) => state.fetchNext)
  const nextUrl = useEntriesStore((state) => state.next)
  const selectedId = useEntriesStore((state) => state.selectedId)
  const setSelectedId = useEntriesStore((state) => state.setSelectedId)
  const topicId = useTopicsStore((state) => state.selectedId)

  const onSelect = async (itemId) => {
    setSelectedId(itemId)
    // fetchEntries(itemId)
  };

  return (
    <InfiniteScroll
      dataLength={entries.length}
      next={fetchNextEntries}
      hasMore={nextUrl != null}
    >
      <VStack
          divider={<StackDivider />}
          spacing={0}
          align='stretch'
          height='95vh'
          >
      {
        entries.map((item) => (
            <ListItem
                itemId={item.id}
                field={item.title}
                fetchList={() => fetchEntries(topicId)}
                key={`entry-item-${item.id}`}
                selected={selectedId}
                onSelect={() => onSelect(item.id)}
                collectionName='Entry'
                updateFunc={(input)=> updateEntry(topicId, item.id, input)}
                deleteFunc={()=> deleteEntry(topicId, item.id)}
            />
        ))
      }
      </VStack>
    </InfiniteScroll>
  );
}
