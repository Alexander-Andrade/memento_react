export const getUserToken = () => {
   return JSON.parse(localStorage.getItem('userData'))['token'];
}