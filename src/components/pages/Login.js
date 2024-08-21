// Login.jsx
import axios from "axios";
import {useState} from "react";
import {Navigate} from 'react-router-dom';
import {API_LOGIN_URL} from "../constants/Urls";
import {Box, Button, Flex, Input, Stack} from "@chakra-ui/react";

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
    <Flex justify="center" align="center" h="100vh">
      <Stack spacing={3}>
        <form onSubmit={handleSubmit}>
            <Input  size='lg' mb={3} variant='outline' type="email" placeholder='Email' name="username" required/>
            {/*<input type="email" className="form-control" name="username" required></input>*/}
            <Input size='lg' mb={5} variant='outline' type="password" placeholder='Password' name="password" required/>
            {/*<input type="password" className="form-control" name="password" required></input>*/}
            <Button size='lg' type="submit" className="btn btn-primary">Submit</Button>
        </form>
      </Stack>
    </Flex>
  )
};
