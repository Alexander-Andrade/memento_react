import { create } from 'zustand'
import {fetchNotes} from "../queries/Notes";
import {fetchNext} from "../queries/Pagination";

export const useNotesStore = create((set, get) => ({
  notes: [],
  next: null,

  fetch: async (entryId) => {
      const response = await fetchNotes(entryId)
      set({ notes: response.data.results, next: response.data.next })
  },
  fetchNext: async () => {
      const response = await fetchNext(get().next)
      set((state)=> ({ notes: [...state.notes, ...response.data.results], next: response.data.next }))
  },
  resetNotes: () => set({ notes: [] }),
}))
