import {
  Text,
  IconButton,
  useDisclosure,
  Box,
  HStack
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import '../../EntryDetail.css';
import './EventDetail.css'
import {formatDateTime} from "../../../../helpers/Time";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {DeleteModal} from "../../../DeleteModal";
import {deleteEvent} from "../../../../queries/Events";
import {useEventsStore} from "../../../../store/Events";
import {EventEditModal} from "./EventEditModal";

export const EventDetail = ({event}) => {
  const editDisclosure = useDisclosure()
  const deleteDisclosure = useDisclosure()
  const fetchNotes = useEventsStore((state) => state.fetch)

  return (
    <HStack p={4} className='item-with-hidden-buttons'>
      <Box data-color-mode="dark" className='markdown-preview'>
        <Text mb={3} fontSize='2xl'>{formatDateTime(event.starts_at)}</Text>
        <MDEditor.Markdown source={event.description} />
        <Text className="timestamp" mt={1}>{formatDateTime(event.created_at)}</Text>
        <Box style={{width: '140px'}} className="hover-buttons">
          <IconButton onClick={editDisclosure.onOpen} mr={4} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<EditIcon />}/>
          <EventEditModal isOpen={editDisclosure.isOpen} onOpen={editDisclosure.onOpen} onClose={editDisclosure.onClose} event={event}/>
          <IconButton onClick={deleteDisclosure.onOpen} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<DeleteIcon />}/>
          <DeleteModal
            key={`events-delete-modal-${event.id}`}
            clickFunc={()=> deleteEvent(event.entry_id, event.id)}
            fetchCollection={() => fetchNotes(event.entry_id)}
            isOpen={deleteDisclosure.isOpen}
            onClose={deleteDisclosure.onClose}
            header={`Delete Note`}
            body={<MDEditor.Markdown source={event.description} />}
            buttonText='Delete'
          />
        </Box>
      </Box>
    </HStack>
);
}