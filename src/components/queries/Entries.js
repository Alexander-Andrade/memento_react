import axios from "axios";
import {getAuthHeader} from "./AuthHeader";

export const fetchEntries = (topicId) => {
   const headers =  getAuthHeader()
   return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/topics/${topicId}/entries/`, { headers })
}

export const createEntry = (topicId, title) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/topics/${topicId}/entries/`, {title}, { headers })
}

export const updateEntry = (topicId, id, title, description) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/topics/${topicId}/entries/${id}/`, {title, description}, { headers })
}

export const deleteEntry = (topicId, id) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/topics/${topicId}/entries/${id}/`, { headers })
}
