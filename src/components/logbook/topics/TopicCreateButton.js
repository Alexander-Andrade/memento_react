import React from 'react';
import {
    Flex,
    IconButton,
    useDisclosure
} from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons";
import {useTopicsStore} from "../../store/Topics";
import {InputModal} from "../InputModal";
import {useBookmarksStore} from "../../store/Bookmarks";


export const TopicCreateButton = ({isDisabled}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bookmarkId = useBookmarksStore((state) => state.selectedId)
  const createTopic = useTopicsStore((state) => state.create)

  return (
    <>
    <Flex flexDirection='row' alignItems='stretch'>
        <IconButton onClick={onOpen} flex='1' aria-label='Add Topic' size='lg' colorScheme='teal'  variant='ghost' icon={<AddIcon/>} isDisabled={isDisabled}/>
    </Flex>
    <InputModal
        key={`topic-input-modal`}
        clickFunc={(input) => createTopic(bookmarkId, { name: input }) }
        isOpen={isOpen}
        onClose={onClose}
        header='Create Topic'
        formLabel='Name'
        buttonText='Create'
    />
    </>
  );
}
