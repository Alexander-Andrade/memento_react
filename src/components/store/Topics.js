import { create } from 'zustand'
import {fetchTopics} from "../queries/Topics";
import {fetchNext} from "../queries/Pagination";

export const useTopicsStore = create((set, get) => ({
  topics: [],
  next: null,

  fetch: async (bookmarkId) => {
      const response = await fetchTopics(bookmarkId)
      set({ topics: response.data.results, next: response.data.next })
  },
  fetchNext: async () => {
      const response = await fetchNext(get().next)
      set((state)=> ({ topics: [...state.topics, ...response.data.results], next: response.data.next }))
  },
  destroyAll: () => set({ topics: [] }),
}))
