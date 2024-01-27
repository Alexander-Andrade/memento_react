import axios from "axios";
import {getAuthHeader} from "./AuthHeader";

export const fetchTopics = (bookmarkId) => {
   const headers =  getAuthHeader()
   return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/bookmarks/${bookmarkId}/topics/`, { headers })
}

export const createTopic = (bookmarkId, name) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/bookmarks/${bookmarkId}/topics/`, {name}, { headers })
}

export const updateTopic = (bookmarkId, id, name) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/bookmarks/${bookmarkId}/topics/${id}/`, {name}, { headers })
}

export const deleteTopic = (bookmarkId, id) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/bookmarks/${bookmarkId}/topics/${id}/`, { headers })
}
