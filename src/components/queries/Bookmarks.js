import axios from "axios";
import {getAuthHeader} from "./AuthHeader";

export const fetchBookmarks = (page = 1) => {
   const headers =  getAuthHeader()
   return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/bookmarks/?page=${page}`, { headers })
}

export const createBookmark = (title) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/bookmarks/`, {title}, { headers })
}

export const updateBookmark = (id, title) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/bookmarks/${id}/`, {title}, { headers })
}

export const deleteBookmark = (id) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/bookmarks/${id}/`, { headers })
}
