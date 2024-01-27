// import {useEffect} from "react";
import './LogbookPage.css';
// import {useBookmarksStore} from "../store/Bookmarks";
import {BookmarksList} from "../logbook/bookmarks/BookmarksList";
import {Flex, Box, Divider} from '@chakra-ui/react'

import {BookmarkCreateButton} from "../logbook/bookmarks/BookmarkCreateButton";
import {TopicCreateButton} from "../logbook/topics/TopicCreateButton";
import {TopicsList} from "../logbook/topics/TopicsList";
import {useParams} from "react-router-dom";

export const LogbookPage = () => {
    const { bookmarkId } = useParams();
    const topicCreateDisabled = !bookmarkId
    debugger
    return (
        <Flex justify="center" minHeight='100vh'  align="center" flexDirection='row' alignItems='stretch'
        >
            <Box flex='1'>
                <BookmarkCreateButton />
                <BookmarksList/>
            </Box>
            <Box>
                <Divider orientation='vertical' />
            </Box>
            <Box flex='1'>
                <TopicCreateButton isDisabled={topicCreateDisabled}/>
                <TopicsList/>
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