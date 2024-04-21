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
import {useEventsStore} from "../../store/Events";
import {formatDateTime} from "../../helpers/Time";


export const EntityDetail = () => {
  const entry = useEntriesStore((state) => state.entry)
  const fetchNotes = useNotesStore((state) => state.fetch)
  const fetchEvents = useEventsStore((state) => state.fetch)

  useEffect(() => {
    if(entry != null) {
      fetchNotes(entry.id)
      fetchEvents(entry.id)
    }
  }, [entry]);

  if(!entry) {
    return null
  }

  return (
    <Card bg={COLOR_DARKER} width='30vw' height='96vh' className='scrollable'>
      <CardHeader>
        <Heading fontSize='2xl' color={COLOR_LIGHTER}>{entry.title} <Text class='timestamp' color={COLOR_LIGHT}>{formatDateTime(entry.created_at)} </Text></Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='1'>
          <Box data-color-mode="dark" className='markdown-preview'>
            <MDEditor.Markdown source={entry.description}/>
          </Box>
          <Box>
            <EntryTabs />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}