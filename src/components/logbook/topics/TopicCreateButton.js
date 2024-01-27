import React, {useState} from 'react';
import {
    Flex,
    IconButton,
    useDisclosure
} from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons";
import {createTopic} from "../../queries/Topics";
import {useTopicsStore} from "../../store/Topics";
import {InputModal} from "../InputModal";
import {useParams} from "react-router-dom";


export const TopicCreateButton = ({isDisabled}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fetchTopics = useTopicsStore((state) => state.fetch)
  const { bookmarkId } = useParams();
  debugger
  return (
    <>
    <Flex flexDirection='row' alignItems='stretch'>
        <IconButton onClick={onOpen} flex='1' aria-label='Add Topic' size='lg' colorScheme='teal'  variant='ghost' icon={<AddIcon/>} isDisabled={isDisabled}/>
    </Flex>
    <InputModal
        key={`topic-input-modal`}
        clickFunc={(input) => createTopic(bookmarkId, input) }
        fetchCollection={()=> fetchTopics(bookmarkId) }
        isOpen={isOpen}
        onClose={onClose}
        header='Create Topic'
        formLabel='Name'
        buttonText='Create'
    />
    </>
  );
}
