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
        debugger
        await createNote(entryId, noteDescription)
      }
      else {
          await updateNote(entryId, note.id, noteDescription)
      }

      fetchNotes(entryId)
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='80em' >
      <ModalOverlay />
        <ModalContent w="960px">
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <MDEditor height={600} value={noteDescription} onChange={setNoteDescription} autoFocus={true} preview={'edit'}/>
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