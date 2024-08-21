import {
  Card,
  CardBody,
  Text,
  CardHeader,
  StackDivider,
  Box,
  Heading, Stack, Flex, IconButton, useDisclosure
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
import {DeleteIcon, EditIcon, QuestionIcon, ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {NoteEditModal} from "./tabs/notes/NoteEditModal";
import {DeleteModal} from "../DeleteModal";
import {PreviewModal} from "../PreviewModal";
import {useShallow} from "zustand/react/shallow";
import {EntryEditModal} from "./EntryEditModal";
import {formatMinimized} from "../../helpers/TextMinimizer";


export const EntityDetail = () => {
  const {
    entry,
    updateEntry,
    deleteEntry
  } = useEntriesStore(
    useShallow((state) => ({
      entry: state.entry,
      updateEntry: state.update,
      deleteEntry: state.delete
    }))
  );

  const fetchNotes = useNotesStore((state) => state.fetch)
  const fetchEvents = useEventsStore((state) => state.fetch)

  const editDisclosure = useDisclosure()
  const previewDisclosure = useDisclosure()
  const deleteDisclosure = useDisclosure()

  const minimize = async () => {
    await updateEntry(entry.topic_id, entry.id, { minimized: !entry.minimized })
  };

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
      <CardHeader className='item-with-hidden-buttons'>
        <Heading fontSize='2xl' color={COLOR_LIGHTER}>{entry.title} <Text className='timestamp' color={COLOR_LIGHT}>{formatDateTime(entry.created_at)} </Text></Heading>

        <Flex style={{width: '140px'}} justifyContent="flex-end" className="hover-buttons">
              <IconButton onClick={previewDisclosure.onOpen} mr={4} colorScheme='teal' variant='ghost' aria-label='View entry' size='lg' icon={<QuestionIcon />}/>
              <IconButton
                icon={entry.minimized ? <ViewOffIcon /> : <ViewIcon />}
                onClick={minimize}
                mr={4}
                colorScheme='teal'
                variant='ghost'
                aria-label='Minimize note'
                size='lg'
              />
              <IconButton onClick={editDisclosure.onOpen} mr={4} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<EditIcon />}/>
              <EntryEditModal isOpen={editDisclosure.isOpen} onOpen={editDisclosure.onOpen} onClose={editDisclosure.onClose}/>
              <IconButton onClick={deleteDisclosure.onOpen} colorScheme='teal' variant='ghost' aria-label='Edit note' size='lg' icon={<DeleteIcon />}/>
              <DeleteModal
                key={`entries-delete-modal-${entry.id}`}
                clickFunc={()=> deleteEntry(entry.topic_id, entry.id)}
                isOpen={deleteDisclosure.isOpen}
                onClose={deleteDisclosure.onClose}
                header={`Delete Note`}
                body={<MDEditor.Markdown source={entry.description} />}
                buttonText='Delete'
              />
              <PreviewModal
                key={`entries-preview-modal-${entry.id}`}
                body={
                  <MDEditor.Markdown source={entry.description} />
                }
                isOpen={previewDisclosure.isOpen}
                onClose={previewDisclosure.onClose}
                header={entry.title}
              />
            </Flex>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='1'>
          <Box data-color-mode="dark" className='markdown-preview'>
            <MDEditor.Markdown source={entry.minimized ? formatMinimized(entry.description || '') : entry.description}/>
          </Box>
          <Box>
            <EntryTabs />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}