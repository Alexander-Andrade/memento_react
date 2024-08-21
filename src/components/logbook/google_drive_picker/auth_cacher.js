import moment from "moment";

export default class GoogleAuthCacher {
  //   {
  //     "access_token": "...",
  //     "token_type": "Bearer",
  //     "expires_in": 3599,
  //     "scope": "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly"
  // }
  constructor(authResponse = null) {
    this.authResponse = authResponse
    this.storedAuth = JSON.parse(localStorage.getItem('googleAuth'))
  }

  call() {
    this.removeExpired()
    this.cache()
  }

  cache() {
    if(this.authResponse === null) { return }
    this.authResponse.created_at = moment().unix()

    localStorage.setItem('googleAuth', JSON.stringify(this.authResponse));
  }

  removeExpired() {
    if (this.storedAuth === null ) { return }
    const expiration_timestamp = this.storedAuth.created_at + this.storedAuth.expires_in
    const current_timestamp  = moment().unix()
    if (expiration_timestamp > current_timestamp) {
      return
    }

    localStorage.removeItem('googleAuth')
  }
}
