export const googleClientId = () => {
   return JSON.parse(localStorage.getItem('userData'))['google_client_id'];
}

export const googleDeveloperKey = () => {
   return JSON.parse(localStorage.getItem('userData'))['google_developer_key'];
}
