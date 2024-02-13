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
import {useEntriesStore} from "../../store/Entries";
import {COLOR_DARK, COLOR_DARKER, COLOR_LIGHTER} from "../../constants/Colors";
import MDEditor from "@uiw/react-md-editor";
import './EntryDetail.css';

export const EntityDetail = () => {
  const entry = useEntriesStore((state) => state.entry)

  if(!entry) {
    return null
  }

  return (
    <Card bg={COLOR_DARKER}>
      <CardHeader>
        <Heading size='md' color={COLOR_LIGHTER}>{entry.title}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='1'>
          <Box data-color-mode="dark">
            <MDEditor.Markdown source={entry.description} />
          </Box>
          <Box>
            <Text pt='2' fontSize='sm'>
              {entry.created_at}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}