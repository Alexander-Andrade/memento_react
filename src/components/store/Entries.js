import { create } from 'zustand'
import {fetchEntries, fetchEntry} from "../queries/Entries";
import {fetchNext} from "../queries/Pagination";

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
  resetEntry: () => set({ entry: null }),
  resetEntries: () => set({ entries: [], selectedId: null, entry: null })
}))
