import React, {useState} from 'react';
import { VStack, StackDivider } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useNotesStore} from "../../../../store/Notes";
import {NoteDetail} from "./NoteDetail";

export const NotesList = () => {
  const notes = useNotesStore((state) => state.notes)
  const fetchNextNotes = useNotesStore((state) => state.fetchNext)
  const nextUrl = useNotesStore((state) => state.next)

  return (
    <InfiniteScroll
      dataLength={notes.length}
      next={fetchNextNotes}
      hasMore={nextUrl != null}
    >
      <VStack
          divider={<StackDivider />}
          spacing={0}
          align='stretch'
          height='90vh'
          >
      {
        notes.map((note) => (
          <NoteDetail note={note} key={`notes-${note.id}`}/>
        ))
      }
      </VStack>
    </InfiniteScroll>
  );
}
