import axios from "axios";
import {getAuthHeader} from "./AuthHeader";

export const queryEvents = (entryId) => {
   const headers =  getAuthHeader()
   return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/entries/${entryId}/events/`, { headers })
}

export const createEvent = (entryId, params) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   console.log(`${process.env.REACT_APP_API_BASE_URL}/api/entries/${entryId}/events/`)
   return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/entries/${entryId}/events/`, params, { headers })
}

export const updateEvent = (entryId, id, params) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/entries/${entryId}/events/${id}/`, params, { headers })
}

export const deleteEvent = (entryId, id) => {
   let authHeader =  getAuthHeader()
   const headers = { ...authHeader, 'Content-Type': 'multipart/form-data' }
   return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/entries/${entryId}/events/${id}/`, { headers })
}
