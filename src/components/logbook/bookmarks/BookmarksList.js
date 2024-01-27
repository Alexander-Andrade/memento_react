import React, {useEffect, useState} from 'react';
import { VStack, StackDivider } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useBookmarksStore} from "../../store/Bookmarks";
import {BookmarkItem} from "./BookmarkItem";
import { useNavigate } from 'react-router-dom';

export const BookmarksList = () => {
    const [selected, setSelected] = useState(null)

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
          divider={<StackDivider />}
          spacing={0}
          align='stretch'
          height='95vh'
          >
      {
        bookmarks.map((item) => (
            <BookmarkItem item={item} key={`bookmark-item-${item.id}`} selected={selected} setSelected={setSelected}/>
        ))
      }
      </VStack>
    </InfiniteScroll>
  );
}
