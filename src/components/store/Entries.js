import { create } from 'zustand'
import {fetchEntries, fetchEntry, deleteEntry, updateEntry, createEntry} from "../queries/Entries";
import {fetchNext} from "../queries/Pagination";
import {createItem, deleteItem, updateItem} from "../helpers/PaginatedCollectionManager";

export const useEntriesStore = create((set, get) => ({
  entries: [],
  selectedId: null,
  entry: null,
  next: null,

  fetch: async (topicId) => {
      const response = await fetchEntries(topicId)
      set({ entries: response.data.results, next: response.data.next })
  },
  fetchNext: async () => {
      const response = await fetchNext(get().next)
      set((state)=> ({ entries: [...state.entries, ...response.data.results], next: response.data.next }))
  },
  destroyAll: () => set({ entries: [] }),

  setSelectedId: (id) => set({ selectedId: id }),
  resetSelectedId: () => set({ selectedId: null }),
  storeEntry: async (topicId, id) => {
    const response = await fetchEntry(topicId, id)
    set({ entry: response.data })
  },
  create: async (topicId, data) => {
    const response = await createEntry(topicId, data)
    set((state)=> ({ entries: createItem(state.entries, response.data) }))
  },
  update: async (topicId, id, data) => {
    const response = await updateEntry(topicId, id, data)
    set((state)=> ({ entries: updateItem(state.entries, response.data) }))
    set({ entry: response.data })
  },
  delete: async (topicId, id) => {
      const response = await deleteEntry(topicId, id)
      set((state)=> ({ entries: deleteItem(state.entries, id) }))
  },
  resetEntry: () => set({ entry: null }),
  resetEntries: () => set({ entries: [], selectedId: null, entry: null })
}))
