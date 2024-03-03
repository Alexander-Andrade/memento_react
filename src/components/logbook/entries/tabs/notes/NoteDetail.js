import {
  Card,
  CardBody,
  Text,
  IconButton,
  useDisclosure,
  CardHeader,
  StackDivider,
  Box,
  Heading, Stack
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import '../../EntryDetail.css';
import moment from "moment";

export const NoteDetail = ({note}) => {
  const formatDateTime = (created_at) => {
    return moment(note.created_at).format('YYYY-MM-DD HH:mm');
  }
  debugger
  return (
    <Box>
      <MDEditor.Markdown source={note.description} />
    </Box>
  );
}