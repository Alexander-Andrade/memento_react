import {
  Card,
  CardBody,
  Text,
  IconButton,
  useDisclosure,
  CardHeader,
  StackDivider,
  Box,
  Heading, Stack, HStack, Spacer, MenuItem
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import '../../EntryDetail.css';
import './NoteDetail.css'
import {formatDateTime} from "../../../../helpers/Time";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {DeleteModal} from "../../../DeleteModal";
import {deleteNote} from "../../../../queries/Notes";
import {useNotesStore} from "../../../../store/Notes";
import {NoteEditModal} from "./NoteEditModal";

export const NoteDetail = ({note}) => {
  const editDisclosure = useDisclosure()
  const deleteDisclosure = useDisclosure()
  const fetchNotes = useNotesStore((state) => state.fetch)

  return (
    <HStack p={4} className='item-with-hidden-buttons'>
      <Box data-color-mode="dark">
        <MDEditor.Markdown source={note.description} />
        <Text class="timestamp">{formatDateTime(note.created_at)}</Text>
        <Box style={{width: '140px'}} className="hover-button">
          <IconButton onClick={editDisclosure.onOpen} mr={4} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<EditIcon />}/>
          <NoteEditModal isOpen={editDisclosure.isOpen} onOpen={editDisclosure.onOpen} onClose={editDisclosure.onClose} note={note}/>
          <IconButton onClick={deleteDisclosure.onOpen} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<DeleteIcon />}/>
          <DeleteModal
            key={`notes-delete-modal-${note.id}`}
            clickFunc={()=> deleteNote(note.entry_id, note.id)}
            fetchCollection={() => fetchNotes(note.entry_id)}
            isOpen={deleteDisclosure.isOpen}
            onClose={deleteDisclosure.onClose}
            header={`Delete Note`}
            body={<MDEditor.Markdown source={note.description} />}
            buttonText='Delete'
          />
        </Box>
      </Box>
    </HStack>
);
}