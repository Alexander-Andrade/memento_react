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
import {updateEntry} from "../../queries/Entries";
import MDEditor from "@uiw/react-md-editor";
import './EntryEditModal.css';

export const EntryEditModal = ({isOpen, onOpen, onClose}) => {
  // const initialRef = React.useRef(null)
  const entry = useEntriesStore((state) => state.entry)
  const storeEntry = useEntriesStore((state) => state.storeEntry)
  const [entryDescription, setEntryDescription] = useState('');
  const [entryTitle, setEntryTitle] = useState('');

  useEffect(() => {
    if(entry != null) {
      setEntryDescription(entry.description)
      setEntryTitle(entry.title)
    }
  }, [entry]);

  const onClick = async () => {
      onClose()
      await updateEntry(entry.topic_id, entry.id, entryTitle, entryDescription)
      storeEntry(entry.topic_id, entry.id)
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='80em' >
      <ModalOverlay />
        <ModalContent w="960px">
          <ModalHeader>Edit {entry?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={entryTitle} onChange={setEntryTitle} size='lg'/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <MDEditor height={600} value={entryDescription} onChange={setEntryDescription} autoFocus={true} preview={'edit'}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>Cancel</Button>
            <Button colorScheme='teal' mr={3} onClick={onClick}>
              Save Log Entry
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  );
}