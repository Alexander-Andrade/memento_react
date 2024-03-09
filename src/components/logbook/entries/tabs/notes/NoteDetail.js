import {
  Card,
  CardBody,
  Text,
  IconButton,
  useDisclosure,
  CardHeader,
  StackDivider,
  Box,
  Heading, Stack, HStack, Spacer, MenuItem
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import '../../EntryDetail.css';
import './NoteDetail.css'
import {formatDateTime} from "../../../../helpers/Time";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";

export const NoteDetail = ({note}) => {
  return (
    <HStack p={4} className='item-with-hidden-buttons'>
      <Box data-color-mode="dark">
        <MDEditor.Markdown source={note.description} />
        <Text class="timestamp">{formatDateTime(note.created_at)}</Text>
        <Box style={{width: '140px'}} className="hover-button">
          <IconButton mr={4} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<EditIcon />}/>
          <IconButton colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<DeleteIcon />}/>
        </Box>
      </Box>
    </HStack>
);
}