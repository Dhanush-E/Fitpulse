import React, { useState } from "react";
import "./css-files/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = "http://localhost:3007";
  const [showOTPField, setShowOTPField] = useState(false);
  const [otpResponse, setOtpResponse] = useState(false);
  const [count,setCount] = useState(1);
  const [otp, setOTP] = useState("");
  const [resend,setResend] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3007/login",
        { email: email, password: password },
        { withCredentials: true }
      )
      .then(
        (response) => {
          console.log(response);
         checkblock();
        },
        (error) => {
          alert("Invalid details");
        }
      );
  };
 


  const initiateOTP = (event) => {
     axios({
       method: 'post',
       url: `${BASE_URL}/sendotplogin`,
       data: {
         emailuser:email,
       }
     }).then(response=>{
       setShowOTPField(true)
       setOtpResponse(response?.data)
     });
   };
 
const blockuser=()=>{
  axios({
    method:'post',
    url: `${BASE_URL}/blockuser`,
    data:{
      email:email
    }
  }).then(response=>{
    alert("You reached max attemepts you are blocked for 4 hrs")
    window.location.replace("/Login")
  })
}

const updateblocktime=()=>{
  axios({
    method:'post',
    url: `${BASE_URL}/updateblocktime`,
    data:{
      email:email
    }
  }).then(response=>{
    alert("Your blocked")
    window.location.replace("/Login")
  })
}


const verifyblock=()=>{
    axios({
      method:'post',
      url: `${BASE_URL}/verifyblock`,
      data:{
        email:email
      }
    }).then(response=>{
      blockuser();
    },error=>{
      updateblocktime();
    }
    )
}


const checkblock=()=>{
  axios({
    method:'post',
    url: `${BASE_URL}/checkblock`,
    data:{
      email:email
    }
  }).then(response=>{
   initiateOTP();
  },error=>{
    alert("Mail id is Blocked, try after some time")
  })
}




  const handleVerifyOTP = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: `${BASE_URL}/verifyotplogin`,
      data: {
        otp: otp,
        id : otpResponse?.id
      }
    }).then(response=>{
      window.location.replace("/");
    }, erro =>{
     
      if(erro?.response?.data?.mesg === "OTP expired"){
        setResend(resend+1)
        
        if(resend===3){
          alert("Resend OTP limit reached, Try again later")
          verifyblock()
        }else{
          alert("The old OTP is expired new otp will be sent now")
          setCount(1)
          initiateOTP()
        }
      
      }else{
        var stc1 = 3-count;
        var stc = stc1.toString();
        var msg = erro?.response?.data?.mesg.toString();
        var fimsg = msg+" "+stc+" attempts left"
        alert(fimsg);
      setCount(count+1)
      if(count===3){
        verifyblock();
      }
    }
    });
  };


  return (
    <div id="login-body">
      <div className="login-container">
      {!showOTPField && <form onSubmit={handleSubmit} id="login-form">
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
          <p id="login_forgot_password"><Link  to="/Forgotpassword" id="login_forgot_password_link">Forgot Password ?</Link></p>
          <button type="submit" className="btn-login">
            Login
          </button>
          <p id="signuplink-container">
            Don't have an account ?{" "}
            <Link to="/Signup" id="signuplink">
              Signup
            </Link>{" "}
          </p>
        </form>}
        {showOTPField &&<form onSubmit={handleVerifyOTP} className="form-signup">
      
          <div className="form-groupsignup">
            <input
            className="input-sigup"
              type="text"
              id="otp-signup"
              value={otp}
              placeholder="OTP"
              onChange={(event) => setOTP(event.target.value)}
              required
            />
            
          </div>
          <button type="submit" className="btn-signup">
            Verify OTP
          </button>
        </form>}
      </div>
    </div>
  );
}

export default Login;
