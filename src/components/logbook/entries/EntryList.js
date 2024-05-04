import React from 'react';
import { VStack, StackDivider } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useTopicsStore} from "../../store/Topics";
import {ListItem} from "../ListItem";
import {useEntriesStore} from "../../store/Entries";
import {useShallow} from "zustand/react/shallow";

export const EntriesList = () => {
  const topicId = useTopicsStore((state) => state.selectedId)

  const {
    entries,
    fetchNextEntries,
    nextUrl,
    selectedId,
    setSelectedId,
    storeEntry,
    updateEntry,
    deleteEntry
  } = useEntriesStore(
    useShallow((state) => ({
      entries: state.entries,
      fetchNextTopics: state.fetchNext,
      nextUrl: state.next,
      selectedId: state.selectedId,
      setSelectedId: state.setSelectedId,
      storeEntry: state.storeEntry,
      updateEntry: state.update,
      deleteEntry: state.delete
    }))
  );

  const onSelect = async (itemId) => {
    setSelectedId(itemId)
    storeEntry(topicId, itemId)
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
                key={`entry-item-${item.id}`}
                selected={selectedId}
                onSelect={() => onSelect(item.id)}
                collectionName='Entry'
                updateFunc={(input)=> updateEntry(topicId, item.id, { title: input })}
                deleteFunc={()=> deleteEntry(topicId, item.id)}
            />
        ))
      }
      </VStack>
    </InfiniteScroll>
  );
}
