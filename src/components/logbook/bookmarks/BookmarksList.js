import React, {useEffect, useState} from 'react';
import { VStack, StackDivider } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useBookmarksStore} from "../../store/Bookmarks";
import {BookmarkItem} from "./BookmarkItem";

export const BookmarksList = () => {
    const selectedId = useBookmarksStore((state) => state.selectedId)
    const setSelectedId = useBookmarksStore((state) => state.setSelectedId)

    const bookmarks = useBookmarksStore((state) => state.bookmarks)
    const fetchBookmarks = useBookmarksStore((state) => state.fetch)
    const fetchNextBookmarks = useBookmarksStore((state) => state.fetchNext)
    const nextUrl = useBookmarksStore((state) => state.next)

    useEffect(() => {
        fetchBookmarks();
  }, []);

  return (
    <InfiniteScroll
      dataLength={bookmarks.length}
      next={fetchNextBookmarks}
      hasMore={nextUrl != null}
    >
      <VStack
          // divider={<StackDivider />}
          spacing={0}
          align='stretch'
          height='95vh'
          >
      {
        bookmarks.map((item) => (
            <BookmarkItem item={item} key={`bookmark-item-${item.id}`} selected={selectedId} setSelected={setSelectedId}/>
        ))
      }
      </VStack>
    </InfiniteScroll>
  );
}
