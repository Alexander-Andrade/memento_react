import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  Button
} from "@chakra-ui/react";
import {useEntriesStore} from "../../../../store/Entries";
import React, {useEffect, useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import '../../EntryEditModal.css';
import {useNotesStore} from "../../../../store/Notes";
import { useShallow } from 'zustand/react/shallow'

export const NoteEditModal = ({isOpen, onOpen, onClose, note= null}) => {
  const [noteDescription, setNoteDescription] = useState('');
  const entryId = useEntriesStore((state) => state.selectedId)
  // const updateNote = useNotesStore((state) => state.update)
  const { createNote, updateNote } = useNotesStore(
    useShallow((state) => ({ updateNote: state.update, createNote: state.create })),
  )

  useEffect(() => {
    if(note != null) {
      setNoteDescription(note.description)
    }
  }, [note]);

  const onClick = async () => {
      onClose()
      if(note == null){
        await createNote(entryId, { description: noteDescription })
      }
      else {
        await updateNote(entryId, note.id, { description: noteDescription })
      }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='80em' >
      <ModalOverlay />
        <ModalContent w="1900px" minH="100px" h='audo' className='note-edit-modal'>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton size='lg'/>
          <ModalBody>
            <FormControl data-color-mode="dark">
              <MDEditor height="100%" visibleDragbar={false} value={noteDescription} onChange={setNoteDescription} autoFocus={true}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} size='lg' mr={3}>Cancel</Button>
            <Button colorScheme='teal' size='lg' mr={3} onClick={onClick}>
              Save Note
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  );
}