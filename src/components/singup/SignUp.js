import React, { useEffect, useState } from "react";
import "../signin/SignIn.css";
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
    axios.post(`${url}/newuser`,{
        username:mail,
        password:password
    })
    .then(res=>{
        setMessage(res.data.message)
        setLoader(false)
        setMail('')
        setPassword('')
        navigate({
            pathname:"/signin",
            search:""
        })

    })
    .catch(err=>{
        setMessage(err.data.message)
        setMail('')
        setPassword('')
    })
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
              <h1>SingUp Page</h1>
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
                <div className={message === "Posted Succesfully" ? "success" : "error"}>
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
                 Sing Up
                </button>
                
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
