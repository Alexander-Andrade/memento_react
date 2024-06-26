// import {useEffect} from "react";
import './LogbookPage.css';
// import {useBookmarksStore} from "../store/Bookmarks";
import {BookmarksList} from "../logbook/bookmarks/BookmarksList";
import {Flex, Box, Divider, Text } from '@chakra-ui/react'

import {BookmarkCreateButton} from "../logbook/bookmarks/BookmarkCreateButton";
import {TopicCreateButton} from "../logbook/topics/TopicCreateButton";
import {TopicsList} from "../logbook/topics/TopicsList";
import {useBookmarksStore} from "../store/Bookmarks";
import {EntryCreateButton} from "../logbook/entries/EntryCreateButton";
import {EntriesList} from "../logbook/entries/EntryList";
import {useTopicsStore} from "../store/Topics";
import {EntityDetail} from "../logbook/entries/EntityDetail";
import {EntryEditButton} from "../logbook/entries/EntryEditButton";
import {CalendarDetail} from "../logbook/calendar/Detail";

export const LogbookPage = () => {
    const selectedBookmarkId = useBookmarksStore((state) => state.selectedId)
    const selectedTopicId = useTopicsStore((state) => state.selectedId)

    return (
        <Flex justify="center" minHeight='100vh'  align="center" flexDirection='row' alignItems='stretch'
        >
            <Box flex='1'>
                <BookmarkCreateButton/>
                <BookmarksList/>
            </Box>
            <Box>
                <Divider orientation='vertical' />
            </Box>
            <Box flex='1'>
                <TopicCreateButton isDisabled={!selectedBookmarkId}/>
                <TopicsList/>
            </Box>
            <Box>
                <Divider orientation='vertical' />
            </Box>
            <Box flex='1'>
                <EntryCreateButton isDisabled={!selectedTopicId}/>
                <EntriesList/>
            </Box>
            <Box>
                <Divider orientation='vertical' />
            </Box>
            <Box flex='1'>
                <EntryEditButton />
                <EntityDetail/>
            </Box>
            <Box>
                <Divider orientation='vertical' />
            </Box>
            <Box flex='1'>
                {/*<Text width={'40vw'}>Calendar Here</Text>*/}
                <CalendarDetail />
            </Box>
        </Flex>
    )
}