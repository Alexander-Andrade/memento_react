import { create } from 'zustand'
import {fetchBookmarks} from "../queries/Bookmarks";

export const useBookmarksStore = create((set) => ({
  bookmarks: [],
  fetch: async (page = 1) => {
      const response = await fetchBookmarks(page)
      set({ bookmarks: response.data.results })
  },
  destroyAll: () => set({ bookmarks: [] }),
}))
