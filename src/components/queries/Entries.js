import axios from "axios";
import {getAuthHeader} from "./AuthHeader";

export const fetchEntries = (topicId) => {
   const headers =  getAuthHeader()
   return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/topics/${topicId}/entries/`, { headers })
}

export const fetchEntry = (topicId, id) => {
   const headers =  getAuthHeader()
   return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/topics/${topicId}/entries/${id}/`, { headers })
}

export const createEntry = (topicId, data) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/topics/${topicId}/entries/`, data, { headers })
}

export const updateEntry = (topicId, id, data) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/topics/${topicId}/entries/${id}/`, data, { headers })
}

export const deleteEntry = (topicId, id) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/topics/${topicId}/entries/${id}/`, { headers })
}
