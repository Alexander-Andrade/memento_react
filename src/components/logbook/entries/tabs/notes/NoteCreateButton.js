import {
  Box,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import {useEntriesStore} from "../../../../store/Entries";
import {InputModal} from "../../../InputModal";
import {createNote, fetchNotes} from "../../../../queries/Notes";
import {useNotesStore} from "../../../../store/Notes";
import {NoteEditModal} from "./NoteEditModal";


export const NoteCreateButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Button onClick={onOpen} aria-label='Add Entry' w="full" size='lg' colorScheme='teal' variant='solid'>
        Add note
      </Button>

      <NoteEditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
}
