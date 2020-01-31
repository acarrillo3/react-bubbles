import React from "react";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form>
        <label htmlFor="username">Username: <input type="text" name="username" /> </label>
        <label htmlFor="password">Password: <input type="text" name="password" /> </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
