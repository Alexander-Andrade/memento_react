import { create } from 'zustand'
import {fetchNotes, updateNote, createNote, deleteNote} from "../queries/Notes";
import {fetchNext} from "../queries/Pagination";
import {updateItem, createItem, deleteItem} from "../helpers/PaginatedCollectionManager";

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
  create: async (entryId, id, data) => {
    const response = await createNote(entryId, id, data)
    set((state)=> ({ notes: createItem(state.notes, response.data) }))
  },
  update: async (entryId, id, data) => {
      const response = await updateNote(entryId, id, data)
      set((state)=> ({ notes: updateItem(state.notes, response.data) }))
  },
  delete: async (entryId, id) => {
      const response = await deleteNote(entryId, id)
      set((state)=> ({ notes: deleteItem(state.notes, id) }))
  },
  resetNotes: () => set({ notes: [] }),
}))
