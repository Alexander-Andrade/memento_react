import axios from "axios";
import {API_LOGIN_URL} from "../constants/Urls";

export const login = () => {
   return axios.get(API_LOGIN_URL)
}