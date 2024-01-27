import {getAuthHeader} from "./AuthHeader";
import axios from "axios";

export const fetchNext = (url) => {
   const headers =  getAuthHeader()
   return axios.get(url, { headers })
}
