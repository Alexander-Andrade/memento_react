import {
  IconButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import {useEntriesStore} from "../../store/Entries";
import {EditIcon} from "@chakra-ui/icons";
import './EntryEditModal.css';
import {EntryEditModal} from "./EntryEditModal";

export const EntryEditButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const entry = useEntriesStore((state) => state.entry)

  return (
    <>
      <Flex flexDirection='row' alignItems='stretch' width='30vw'>
          <IconButton flex='1' onClick={onOpen} aria-label='Add Topic' size='lg' colorScheme='teal'  variant='ghost' icon={<EditIcon/>} isDisabled={!entry}/>
      </Flex>

      <EntryEditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}