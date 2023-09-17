// Login.jsx
import axios from "axios";
import {useState} from "react";
import {Navigate} from 'react-router-dom';
import {API_LOGIN_URL} from "../constants/Urls";

export const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    let { username, password } = document.forms[0];

    axios.post(API_LOGIN_URL, { username: username.value, password: password.value }).
      then((response) => {
        localStorage.setItem('userData', JSON.stringify(response.data));
         setIsLoggedIn(true);
      }).catch((error) => {
        console.error('Error making post request:', error);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
      <div className="container-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name="username" required></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" required></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
  )
};
