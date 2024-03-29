import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel, Input, ModalFooter, Button
} from "@chakra-ui/react";
import {useEntriesStore} from "../../../../store/Entries";
import React, {useEffect, useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import '../../EntryEditModal.css';
import {useNotesStore} from "../../../../store/Notes";
import {createNote, updateNote} from "../../../../queries/Notes";

export const NoteEditModal = ({isOpen, onOpen, onClose, note= null}) => {
  const [noteDescription, setNoteDescription] = useState('');
  const fetchNotes = useNotesStore((state) => state.fetch)
  const entryId = useEntriesStore((state) => state.selectedId)

  useEffect(() => {
    if(note != null) {
      setNoteDescription(note.description)
    }
  }, [note]);

  const onClick = async () => {
      onClose()
      if(note == null){
        await createNote(entryId, noteDescription)
      }
      else {
          await updateNote(entryId, note.id, noteDescription)
      }
      setNoteDescription('')
      fetchNotes(entryId)
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='80em' >
      <ModalOverlay />
        <ModalContent w="1800px" minH="100px" h='audo' className='note-edit-modal'>
          <ModalHeader color='memento.600'>Edit Note</ModalHeader>
          <ModalCloseButton />
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