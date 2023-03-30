import React, { useState } from "react";
import "./css-files/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = "http://localhost:3007";

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3007/login",
        { email: email, password: password },
        { withCredentials: true }
      )
      // axios({
      //   method: 'post',
      //   url: `${BASE_URL}/login`,

      //   data: {
      //     email: email,
      //     password: password,
      //   }
      // })
      .then(
        (response) => {
          // setShowOTPField(true)
          //alert('Login sucessfull')
          console.log(response);
          window.location.replace("/");
          //setOtpResponse(response)
        },
        (error) => {
          alert("Invalid details");
        }
      );
    //
    // console.log(`Email: ${email}, Password: ${password}`);
  };
  /*<label htmlFor="email" className="label-login">Email:</label>

 <label htmlFor="password" className="label-login">Password:</label>
*/
  return (
    <div id="login-body">
      <div className="login-container">
        <form onSubmit={handleSubmit} id="login-form">
          <h2 id="loginheading">Login</h2>
          <div className="form-group-login">
            <input
              className="input-login"
              type="email"
              id="email-login"
              value={email}
              placeholder="Email id"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-group-login">
            <input
              className="input-login"
              type="password"
              id="password-login"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
          <p id="signuplink-container">
            Don't have an account ?{" "}
            <Link to="/Signup" id="signuplink">
              Signup
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
