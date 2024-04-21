import {
  Box,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import {EventEditModal} from "./EventEditModal";


export const EventCreateButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Button onClick={onOpen} aria-label='Add Event' w="full" size='lg' colorScheme='teal' variant='solid'>
        Add Event
      </Button>

      <EventEditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
}
