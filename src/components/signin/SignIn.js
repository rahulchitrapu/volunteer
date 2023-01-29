import React, { useEffect, useState } from "react";
import "./SignIn.css";
import profile from "../images/download.png";
import email from "../images/mail.jpeg";
import pass from "../images/lock.webp";
import axios from "axios";

import Spinner from 'react-bootstrap/Spinner';
import checkEnv from "../CheckUrl";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loader,setLoader]=useState(true)
  const navigate = useNavigate();
  const url=checkEnv()

  const signInHandler = (e) => {
    e.preventDefault();
    setLoader(true)
    console.log(mail,password)
    console.log(url)
    axios.post(`${url}/signin`,{
        username:mail,
        password:password
    })
    .then(res=>{
        console.log(res.data.message)
        setMessage(res.data.message)
        if(res.data.userId){
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("userName",res.data.username)
            navigate({
                pathname:"/home",
                search:""
            })
        } 
        
    })
    .catch(err=>console.log(err))
  };

  useEffect(()=>{
    localStorage.clear()
  },[])
  return (
    <form>
      <div className="main">
        <div className="sub-main">
          <div>
            <div className="imgs">
              <div className="container-image">
                <img src={profile} alt="profile" className="profile" />
              </div>
            </div>
            <div>
              <h1>Login Page</h1>
              <div>
                <img src={email} alt="email" className="email" />
                <input
                  value={mail}
                  onChange={(e) => {
                    setMail(e.target.value);
                    setMessage("");
                  }}
                  type="text"
                  placeholder="user name"
                  className="name input1"
                />
              </div>
              <div className="second-input">
                <img src={pass} alt="pass" className="email" />
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                  type="password"
                  placeholder="user name"
                  className="name input1"
                />
              </div>
              {message !== "" && (
                <div className={message === "loging in" ? "success" : "error"}>
                  <span>{message}</span>
                </div>
              )}
              <div className="login-button" onClick={(e) => signInHandler(e)}>
                <button className="signIn" type="submit">
                  {loader && <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  />}
                  Login
                </button>
                
              </div>
              <div className="Sign-up-container" 
              onClick={()=>navigate({
                pathname:"/signup",
                search:""
              })}
              >
                   <span className="Sign-up">Sign Up</span> 
                </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
