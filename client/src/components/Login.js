import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  const [userCreds, setUserCreds] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setUserCreds({
      ...userCreds,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = e => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/login", userCreds)
      .then(res => {
        //console.log(res.data)
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble");
      })
      .catch(err => {
        console.log(err.message);
        props.history.push('/');
        // if (err.message === "Request failed with status code 403") {
        //   alert("Login failed");
        // }
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={e => handleLogin(e)}>
        <h2>Login</h2>
        <label htmlFor="username">
          Username:{" "}
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={userCreds.username}
          />
        </label>
        <label htmlFor="password">
          Password:{" "}
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={userCreds.password}
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
