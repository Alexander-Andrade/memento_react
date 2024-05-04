import {
  Text,
  IconButton,
  useDisclosure,
  Box, HStack, Flex
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import '../../EntryDetail.css';
import './NoteDetail.css'
import {formatDateTime} from "../../../../helpers/Time";
import {DeleteIcon, EditIcon, QuestionIcon, QuestionOutlineIcon, ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {DeleteModal} from "../../../DeleteModal";
import {useNotesStore} from "../../../../store/Notes";
import {NoteEditModal} from "./NoteEditModal";
import {PreviewModal} from "../../../PreviewModal";
import {formatMinimized} from "../../../../helpers/TextMinimizer";
import {useShallow} from "zustand/react/shallow";

export const NoteDetail = ({note}) => {
  const editDisclosure = useDisclosure()
  const previewDisclosure = useDisclosure()
  const deleteDisclosure = useDisclosure()
  const { updateNote, deleteNote } = useNotesStore(
    useShallow((state) => ({ updateNote: state.update, deleteNote: state.delete })),
  )


  const minimize = async () => {
      await updateNote(note.entry_id, note.id, { minimized: !note.minimized })
  };

  return (
    <HStack pt={4} className='item-with-hidden-buttons'>
      <Box data-color-mode="dark" className='markdown-preview'>
        <MDEditor.Markdown source={note.minimized ? formatMinimized(note.description) : note.description } />
        <Text className="timestamp" mt={1}>{formatDateTime(note.created_at)}</Text>
        <Flex style={{width: '140px'}} justifyContent="flex-end" className="hover-buttons">
          <IconButton onClick={previewDisclosure.onOpen} mr={4} colorScheme='teal' variant='ghost' aria-label='View note' size='lg' icon={<QuestionIcon />}/>
          <IconButton
            icon={note.minimized ? <ViewOffIcon /> : <ViewIcon />}
            onClick={minimize}
            mr={4}
            colorScheme='teal'
            variant='ghost'
            aria-label='Minimize note'
            size='lg'
          />
          <IconButton onClick={editDisclosure.onOpen} mr={4} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<EditIcon />}/>
          <NoteEditModal isOpen={editDisclosure.isOpen} onOpen={editDisclosure.onOpen} onClose={editDisclosure.onClose} note={note}/>
          <IconButton onClick={deleteDisclosure.onOpen} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<DeleteIcon />}/>
          <DeleteModal
            key={`notes-delete-modal-${note.id}`}
            clickFunc={()=> deleteNote(note.entry_id, note.id)}
            isOpen={deleteDisclosure.isOpen}
            onClose={deleteDisclosure.onClose}
            header={`Delete Note`}
            body={<MDEditor.Markdown source={note.description} />}
            buttonText='Delete'
          />
          <PreviewModal
            key={`notes-preview-modal-${note.id}`}
            body={<MDEditor.Markdown source={note.description} />}
            isOpen={previewDisclosure.isOpen}
            onClose={previewDisclosure.onClose}
            header={'Preview'}
          />
        </Flex>
      </Box>
    </HStack>
);
}