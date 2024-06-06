import { create } from 'zustand'
import {queryEvents} from "../queries/Calendar";

export const useCalendarStore = create((set, get) => ({
  events: [],
  from: null,
  to: null,

  fetch: async (from = null, to = null) => {
    const newFrom = from || get().from
    const newTo = to || get().to
    const response = await queryEvents(newFrom, newTo)
    set({ events: response.data.results, from: newFrom, to: newTo })
  },
  resetEvents: () => set({ events: [] }),
}))
