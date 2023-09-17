import {useEffect} from "react";
import './LogbookPage.css';
import {useBookmarksStore} from "../store/Bookmarks";
import {BookmarksList} from "../logbook/bookmarks/BookmarksList";
import {Flex, Box, Divider, Stack, IconButton} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import {COLOR_DARK, COLOR_LIGHT} from "../constants/Colors";
import {BookmarkCreateButton} from "../logbook/bookmarks/BookmarkCreateButton";

export const LogbookPage = () => {
    const bookmarks = useBookmarksStore((state) => state.bookmarks)
    const fetchBookmarks = useBookmarksStore((state) => state.fetch)

    useEffect(() => {
        fetchBookmarks();
  }, []);

    return (
        <Flex justify="center" minHeight='100vh'  align="center" flexDirection='row' alignItems='stretch'
        >
            <Box flex='1'>
                <BookmarkCreateButton />
                <BookmarksList items={bookmarks}/>
            </Box>
            <Box>
                <Divider orientation='vertical' />
            </Box>
            <Box flex='1'>
              Column
            </Box>
            <Box>
                <Divider orientation='vertical' />
            </Box>
            <Box flex='1'>
              Column
            </Box>
        </Flex>
    )
}