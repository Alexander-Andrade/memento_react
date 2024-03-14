import axios from "axios";
import {getAuthHeader} from "./AuthHeader";

export const fetchNotes = (entryId) => {
   const headers =  getAuthHeader()
   return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/entries/${entryId}/notes/`, { headers })
}

export const createNote = (entryId, description) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   console.log(`${process.env.REACT_APP_API_BASE_URL}/api/entries/${entryId}/notes/`)
   return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/entries/${entryId}/notes/`, {description}, { headers })
}

export const updateNote = (entryId, id, title, description) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/entries/${entryId}/entries/${id}/`, {title, description}, { headers })
}

export const deleteNote = (entryId, id) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/entries/${entryId}/notes/${id}/`, { headers })
}
