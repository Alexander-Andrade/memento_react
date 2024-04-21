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
import {useEventsStore} from "../../../../store/Events";
import {createEvent, updateEvent} from "../../../../queries/Events";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../../../../css/ReactDatepicker.css'

export const EventEditModal = ({isOpen, onOpen, onClose, event= null}) => {
  const [eventDescription, setEventDescription] = useState('');
  const fetchEvents = useEventsStore((state) => state.fetch)
  const entryId = useEntriesStore((state) => state.selectedId)
  const [startsAt, setStartsAtAt] = useState(new Date());

  useEffect(() => {
    if(event != null) {
      setEventDescription(event.description)
      setStartsAtAt(new Date(event.starts_at))
    }
  }, [event]);

  const onClick = async () => {
      onClose()
      let params = { description: eventDescription, starts_at: startsAt }

      if(event == null){
        await createEvent(entryId, params)
      }
      else {
          await updateEvent(entryId, event.id, params)
      }
      setEventDescription('')
      fetchEvents(entryId)
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='80em' >
      <ModalOverlay />
        <ModalContent w="1900px" minH="100px" h='audo'>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton size='lg'/>
          <ModalBody>
            <FormControl mb={6} size='lg'>
              <DatePicker
                selected={startsAt}
                onChange={(date) => setStartsAtAt(date)}
                locale="pt-BR"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                monthsShown={2}
                showMonthDropdown
                dateFormat="Pp"
              />
            </FormControl>
            <FormControl data-color-mode="dark">
              <MDEditor height="100%" visibleDragbar={false} value={eventDescription} onChange={setEventDescription} autoFocus={true}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} size='lg' mr={3}>Cancel</Button>
            <Button colorScheme='teal' size='lg' mr={3} onClick={onClick}>
              Save Event
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  );
}