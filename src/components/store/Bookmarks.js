import { create } from 'zustand'
import {fetchBookmarks, createBookmark, deleteBookmark, updateBookmark} from "../queries/Bookmarks";
import {fetchNext} from "../queries/Pagination";
import {createItem, deleteItem, updateItem} from "../helpers/PaginatedCollectionManager";

export const useBookmarksStore = create((set, get) => ({
  bookmarks: [],
  selectedId: null,
  next: null,

  fetch: async (page = 1) => {
      const response = await fetchBookmarks(page)
      set({ bookmarks: response.data.results, next: response.data.next })
  },
  fetchNext: async () => {
      const response = await fetchNext(get().next)
      set((state)=> ({ bookmarks: [...state.bookmarks, ...response.data.results], next: response.data.next }))
  },
  create: async (data) => {
    const response = await createBookmark(data)
    set((state)=> ({ bookmarks: createItem(state.bookmarks, response.data) }))
  },
  update: async (id, data) => {
      const response = await updateBookmark(id, data)
      set((state)=> ({ bookmarks: updateItem(state.bookmarks, response.data) }))
  },
  delete: async (id) => {
      const response = await deleteBookmark(id)
      set((state)=> ({ bookmarks: deleteItem(state.bookmarks, id) }))
  },
  destroyAll: () => set({ bookmarks: [] }),
  setSelectedId: (id) => set({ selectedId: id }),
  resetSelectedId: () => set({ selectedId: null }),
}))
