import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import {useEntriesStore} from "../../../../store/Entries";
import React, {useEffect, useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import '../../EntryEditModal.css';
import "../../../../../css/Modal.css"
import {useNotesStore} from "../../../../store/Notes";
import { useShallow } from 'zustand/react/shallow'
import {FilePanel} from "../../../google_drive_picker/FilePanel";
import {buildLinks} from "../../../../helpers/files/buildLinks";

export const NoteEditModal = ({isOpen, onOpen, onClose, note= null}) => {
  const [noteDescription, setNoteDescription] = useState('');
  const [files, setFiles] = useState([]);
  const entryId = useEntriesStore((state) => state.selectedId)
  const { createNote, updateNote } = useNotesStore(
    useShallow((state) => ({ updateNote: state.update, createNote: state.create })),
  )

  useEffect(() => {
    if(note != null) {
      setNoteDescription(note.description)
      setFiles(note.files)
    }
  }, [note]);

  const onClick = async () => {
    onClose()

    const data = { description: noteDescription, files: JSON.stringify(files) }

    if(note == null){
        await createNote(entryId, data)
      }
      else {
        await updateNote(entryId, note.id, data)
      }
  };
  const onFilesSelected = (docs) => {
    setNoteDescription(noteDescription + buildLinks(docs))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='80em' trapFocus={false}>
      <ModalOverlay zIndex='10'/>
        <ModalContent w="1900px" minH="100px" h='audo' className='note-edit-modal' containerProps={{zIndex: '20'}} >
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton size='lg'/>
          <ModalBody>
            <FormControl data-color-mode="dark">
              <MDEditor height="100%" visibleDragbar={false} value={noteDescription} onChange={setNoteDescription} autoFocus={true}/>
            </FormControl>
            <FilePanel
              onFilesSelected={onFilesSelected}
              files={files}
              setFiles={setFiles}
            />
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