import React, {useState} from 'react';
import { VStack, StackDivider } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useTopicsStore} from "../../store/Topics";
import {useParams} from 'react-router-dom';
import {ListItem} from "../ListItem";
import {deleteTopic, updateTopic} from "../../queries/Topics";

export const TopicsList = () => {
    const topics = useTopicsStore((state) => state.topics)
    const fetchTopics = useTopicsStore((state) => state.fetch)
    const fetchNextTopics = useTopicsStore((state) => state.fetchNext)
    const nextUrl = useTopicsStore((state) => state.next)
    const selectedId = useTopicsStore((state) => state.selectedId)
    const setSelectedId = useTopicsStore((state) => state.setSelectedId)
    const { bookmarkId } = useParams();

  return (
    <InfiniteScroll
      dataLength={topics.length}
      next={fetchNextTopics}
      hasMore={nextUrl != null}
    >
      <VStack
          divider={<StackDivider />}
          spacing={0}
          align='stretch'
          height='95vh'
          >
      {
        topics.map((item) => (
            <ListItem
                itemId={item.id}
                field={item.name}
                fetchList={() => fetchTopics(bookmarkId)}
                key={`topic-item-${item.id}`}
                selected={selectedId}
                setSelected={setSelectedId}
                collectionName='Topic'
                updateFunc={(input)=> updateTopic(bookmarkId, item.id, input)}
                deleteFunc={()=> deleteTopic(bookmarkId, item.id)}
                navigatePath={`../bookmarks/${bookmarkId}/topics\\${item.id}`}
            />
        ))
      }
      </VStack>
    </InfiniteScroll>
  );
}
