import { create } from 'zustand'
import {queryEvents} from "../queries/Events";
import {fetchNext} from "../queries/Pagination";

export const useEventsStore = create((set, get) => ({
  events: [],
  next: null,

  fetch: async (entryId) => {
      const response = await queryEvents(entryId)
      set({ events: response.data.results, next: response.data.next })
  },
  fetchNext: async () => {
      const response = await fetchNext(get().next)
      set((state)=> ({ events: [...state.events, ...response.data.results], next: response.data.next }))
  },
  resetEvents: () => set({ events: [] }),
}))
