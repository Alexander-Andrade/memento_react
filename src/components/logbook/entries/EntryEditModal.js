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
import {useEntriesStore} from "../../store/Entries";
import React, {useEffect, useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import './EntryEditModal.css';
import {useShallow} from "zustand/react/shallow";
import {FilePanel} from "../google_drive_picker/FilePanel";
import {buildLinks} from "../../helpers/files/buildLinks";

export const EntryEditModal = ({isOpen, onOpen, onClose}) => {
  // const initialRef = React.useRef(null)

  const {
    entry,
    storeEntry,
    updateEntry,
  } = useEntriesStore(
    useShallow((state) => ({
      entry: state.entry,
      storeEntry: state.storeEntry,
      updateEntry: state.update,
    }))
  );

  const [entryDescription, setEntryDescription] = useState('');
  const [entryTitle, setEntryTitle] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if(entry != null) {
      setEntryDescription(entry.description)
      setEntryTitle(entry.title)
      setFiles(entry.files)
    }
  }, [entry]);

  const onClick = async () => {
      onClose()
      await updateEntry(entry.topic_id, entry.id, { title: entryTitle, description: entryDescription, files: JSON.stringify(files) })
      storeEntry(entry.topic_id, entry.id)
    };

  const onFilesSelected = (docs) => {
    setEntryDescription(entryDescription + buildLinks(docs))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='80em' trapFocus={false}>
      <ModalOverlay zIndex='10'/>
        <ModalContent w="1900px" containerProps={{zIndex: '20'}}>
          <ModalHeader>Edit {entry?.title}</ModalHeader>
          <ModalCloseButton size='lg'/>
          <ModalBody>
            <FormControl>
              <FormLabel color='memento.600'>Title</FormLabel>
              <Input value={entryTitle} onChange={setEntryTitle} size='lg'/>
            </FormControl>
            <FormControl mt={4} data-color-mode="dark">
              <FormLabel color='memento.600'>Description</FormLabel>
              <MDEditor height='100%' value={entryDescription} onChange={setEntryDescription} autoFocus={true}/>
            </FormControl>
            <FilePanel
              onFilesSelected={onFilesSelected}
              files={files}
              setFiles={setFiles}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} size='lg'>Cancel</Button>
            <Button colorScheme='teal' mr={3} onClick={onClick} size='lg'>
              Save Log Entry
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  );
}