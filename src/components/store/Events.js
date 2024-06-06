import { create } from 'zustand'
import {queryEvents, createEvent, deleteEvent, updateEvent} from "../queries/Events";
import {fetchNext} from "../queries/Pagination";
import {createItem, deleteItem, updateItem} from "../helpers/PaginatedCollectionManager";

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
  create: async (entryId, data) => {
    const response = await createEvent(entryId, data)
    set((state)=> ({ events: createItem(state.events, response.data) }))
  },
  update: async (entryId, id, data) => {
      const response = await updateEvent(entryId, id, data)
      set((state)=> ({ events: updateItem(state.events, response.data) }))
  },
  delete: async (entryId, id) => {
      const response = await deleteEvent(entryId, id)
      set((state)=> ({ events: deleteItem(state.events, id) }))
  },
  resetEvents: () => set({ events: [] }),
}))
