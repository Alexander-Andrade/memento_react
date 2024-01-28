import { create } from 'zustand'
import {fetchBookmarks} from "../queries/Bookmarks";
import {fetchNext} from "../queries/Pagination";

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
  destroyAll: () => set({ bookmarks: [] }),
  setSelectedId: (id) => set({ selectedId: id }),
  resetSelectedId: () => set({ selectedId: null }),
}))
