import axios from "axios";
import {getAuthHeader} from "./AuthHeader";

export const queryEvents = (from, to) => {
   const headers =  getAuthHeader()
   return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/events/?from=${from}&to=${to}`, { headers })
}
