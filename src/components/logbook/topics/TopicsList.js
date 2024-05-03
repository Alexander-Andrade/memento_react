import { VStack, StackDivider } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useTopicsStore} from "../../store/Topics";
import {ListItem} from "../ListItem";
import {useBookmarksStore} from "../../store/Bookmarks";
import {useEntriesStore} from "../../store/Entries";
import {useShallow} from "zustand/react/shallow";

export const TopicsList = () => {
  const {
    topics,
    fetchNextTopics,
    nextUrl,
    selectedId,
    setSelectedId,
    updateTopic,
    deleteTopic
  } = useTopicsStore(
    useShallow((state) => ({
      topics: state.topics,
      fetchNextTopics: state.fetchNext,
      nextUrl: state.next,
      selectedId: state.selectedId,
      setSelectedId: state.setSelectedId,
      updateTopic: state.update,
      deleteTopic: state.delete
    }))
  );


  const bookmarkId = useBookmarksStore((state) => state.selectedId)

  const {
      fetchEntries,
      resetSelectedEntryId,
      resetEntry
  } = useEntriesStore(
    useShallow((state) => ({
      fetchEntries: state.fetch,
      resetSelectedEntryId: state.resetSelectedId,
      resetEntry: state.resetEntry
    }))
  )

  const onSelect = async (itemId) => {
    setSelectedId(itemId)
    resetSelectedEntryId()
    resetEntry()
    fetchEntries(itemId)
  };

  return (
    <InfiniteScroll
      dataLength={topics.length}
      next={fetchNextTopics}
      hasMore={nextUrl != null}
    >
      <VStack
          divider={<StackDivider />}
          spacing={0}
          align='stretch'
          height='95vh'
          >
      {
        topics.map((item) => (
            <ListItem
                itemId={item.id}
                field={item.name}
                key={`topic-item-${item.id}`}
                selected={selectedId}
                onSelect={() => onSelect(item.id)}
                collectionName='Topic'
                updateFunc={(input)=> updateTopic(bookmarkId, item.id, { name: input })}
                deleteFunc={()=> deleteTopic(bookmarkId, item.id)}
            />
        ))
      }
      </VStack>
    </InfiniteScroll>
  );
}
