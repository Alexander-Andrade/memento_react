import React, {useState} from 'react';
import { VStack, StackDivider } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useEventsStore} from "../../../../store/Events";
import {EventDetail} from "./EventDetail";

export const EventsList = () => {
  const events = useEventsStore((state) => state.events)
  const fetchNextNotes = useEventsStore((state) => state.fetchNext)
  const nextUrl = useEventsStore((state) => state.next)

  return (
    <InfiniteScroll
      dataLength={events.length}
      next={fetchNextNotes}
      hasMore={nextUrl != null}
    >
      <VStack
          divider={<StackDivider />}
          spacing={0}
          align='stretch'
          maxHeight='100vh'
          pl={0}
          >
      {
        events.map((event) => (
          <EventDetail event={event} key={`events-${event.id}`}/>
        ))
      }
      </VStack>
    </InfiniteScroll>
  );
}
