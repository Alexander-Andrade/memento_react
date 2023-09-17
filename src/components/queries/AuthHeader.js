import {getUserToken} from "./User";

export const getAuthHeader = () => {
   return {
      'Authorization': `Token ${getUserToken()}`
   }
}