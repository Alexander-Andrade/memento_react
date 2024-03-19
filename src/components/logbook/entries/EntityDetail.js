import {
  Card,
  CardBody,
  Text,
  CardHeader,
  StackDivider,
  Box,
  Heading, Stack
} from "@chakra-ui/react";
import {useEntriesStore} from "../../store/Entries";
import {COLOR_DARKER, COLOR_LIGHT, COLOR_LIGHTER} from "../../constants/Colors";
import MDEditor from "@uiw/react-md-editor";
import './EntryDetail.css';
import {EntryTabs} from "./EntryTabs";
import {useEffect} from "react";
import {useNotesStore} from "../../store/Notes";
import {formatDateTime} from "../../helpers/Time";


export const EntityDetail = () => {
  const entry = useEntriesStore((state) => state.entry)
  const fetchNotes = useNotesStore((state) => state.fetch)


  useEffect(() => {
    if(entry != null) {
      fetchNotes(entry.id)
    }
  }, [entry]);

  if(!entry) {
    return null
  }

  return (
    <Card bg={COLOR_DARKER}>
      <CardHeader>
        <Heading fontSize='2xl' color={COLOR_LIGHTER}>{entry.title} <Text class='timestamp' color={COLOR_LIGHT}>{formatDateTime(entry.created_at)} </Text></Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='1'>
          <Box data-color-mode="dark">
            <MDEditor.Markdown source={entry.description} />
          </Box>
          <Box>
            <EntryTabs />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}