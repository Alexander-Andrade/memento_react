import {
    Flex,
    IconButton,
    useDisclosure
} from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons";
import {useTopicsStore} from "../../store/Topics";
import {InputModal} from "../InputModal";
import {useEntriesStore} from "../../store/Entries";


export const EntryCreateButton = ({isDisabled}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const createEntry = useEntriesStore((state) => state.create)
  const topicId = useTopicsStore((state) => state.selectedId)

  return (
    <>
    <Flex flexDirection='row' alignItems='stretch'>
        <IconButton onClick={onOpen} flex='1' aria-label='Add Topic' size='lg' colorScheme='teal'  variant='ghost' icon={<AddIcon/>} isDisabled={isDisabled}/>
    </Flex>
    <InputModal
        key={`topic-input-modal`}
        clickFunc={(input) => createEntry(topicId, { title: input }) }
        isOpen={isOpen}
        onClose={onClose}
        header='Create Entry'
        formLabel='Title'
        buttonText='Create'
    />
    </>
  );
}
