import { create } from 'zustand'
import {createTopic, deleteTopic, fetchTopics, updateTopic} from "../queries/Topics";
import {fetchNext} from "../queries/Pagination";
import {createItem, deleteItem, updateItem} from "../helpers/PaginatedCollectionManager";

export const useTopicsStore = create((set, get) => ({
  topics: [],
  selectedId: null,
  next: null,

  fetch: async (bookmarkId) => {
      const response = await fetchTopics(bookmarkId)
      set({ topics: response.data.results, next: response.data.next })
  },
  fetchNext: async () => {
      const response = await fetchNext(get().next)
      set((state)=> ({ topics: [...state.topics, ...response.data.results], next: response.data.next }))
  },
  create: async (bookmarkId, data) => {
    const response = await createTopic(bookmarkId, data)
    set((state)=> ({ topics: createItem(state.topics, response.data) }))
  },
  update: async (bookmarkId, id, data) => {
    debugger
    const response = await updateTopic(bookmarkId, id, data)
    set((state)=> ({ topics: updateItem(state.topics, response.data) }))
  },
  delete: async (bookmarkId, id) => {
      const response = await deleteTopic(bookmarkId, id)
      set((state)=> ({ topics: deleteItem(state.topics, id) }))
  },
  destroyAll: () => set({ topics: [] }),

  setSelectedId: (id) => set({ selectedId: id }),
  resetSelectedId: () => set({ selectedId: null }),
}))
