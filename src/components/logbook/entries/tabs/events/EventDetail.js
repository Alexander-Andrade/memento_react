import {
  Text,
  IconButton,
  useDisclosure,
  Box,
  HStack, Flex
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import '../../EntryDetail.css';
import './EventDetail.css'
import {formatDateTime} from "../../../../helpers/Time";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {DeleteModal} from "../../../DeleteModal";
import {useEventsStore} from "../../../../store/Events";
import {EventEditModal} from "./EventEditModal";
import {useShallow} from "zustand/react/shallow";
import {useCalendarStore} from "../../../../store/Calendar";

export const EventDetail = ({event}) => {
  const editDisclosure = useDisclosure()
  const deleteDisclosure = useDisclosure()
  const { updateEvent, deleteEvent } = useEventsStore(
    useShallow((state) => ({ updateEvent: state.update, deleteEvent: state.delete })),
  )
  const fetchCalendarEvents = useCalendarStore((state) => state.fetch)
  const destroyEvent = async () => {
    await deleteEvent(event.entry_id, event.id)
    fetchCalendarEvents()
  };

  return (
    <HStack pt={4} className='item-with-hidden-buttons'>
      <Box data-color-mode="dark" className='markdown-preview'>
        <Text mb={3} fontSize='2xl'>{formatDateTime(event.starts_at)}</Text>
        <MDEditor.Markdown source={event.description} />
        <Text className="timestamp" mt={1}>{formatDateTime(event.created_at)}</Text>
        <Flex style={{width: '140px'}} justifyContent="flex-end" className="hover-buttons">
          <IconButton onClick={editDisclosure.onOpen} mr={4} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<EditIcon />}/>
          <EventEditModal isOpen={editDisclosure.isOpen} onOpen={editDisclosure.onOpen} onClose={editDisclosure.onClose} event={event}/>
          <IconButton onClick={deleteDisclosure.onOpen} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<DeleteIcon />}/>
          <DeleteModal
            key={`events-delete-modal-${event.id}`}
            clickFunc={()=> destroyEvent()}
            isOpen={deleteDisclosure.isOpen}
            onClose={deleteDisclosure.onClose}
            header={`Delete Note`}
            body={<MDEditor.Markdown source={event.description} />}
            buttonText='Delete'
          />
        </Flex>
      </Box>
    </HStack>
);
}