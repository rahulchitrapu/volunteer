import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, } from 'react-router-dom'
import "./Homepage.css";



export default function Homepage({component}) {
    // const [searchParams] = useSearchParams()
    const names=["All Profiles","Male","Female",]
    const [defaultState,setDefaultState]=useState(getDefaultState())
    const name=localStorage.getItem("userName")
    const navigate = useNavigate();
   
    const userId=localStorage.getItem("userId")?localStorage.getItem("userId"):null


    function getDefaultState(){
       if(window.location.pathname.includes("all_profiles")){
        return "All Profiles"
       }
       if(window.location.pathname.includes("male")){
        return "Male"
       }
       if(window.location.pathname.includes("female")){
        return "Female"
       }
        else{
            return "All Profiles"
        }
    }
    useEffect(()=>{
        if(userId===null){
            navigate({
                pathname:"/signin",
                search:""
            })
        }
    },[userId,navigate])

    const logOutClickHandler=()=>{
        navigate({
            pathname:"/signin",
            search:""
        })
    }
  return (
    <div>

        <div className='smytten-logo smytten-logo-container'>
            <span className='company-name'>{name?name:"Volunter"}</span>
            <div className='log-out-container' onClick={()=>{logOutClickHandler()}}>
                <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                <span className='log-out' >Log out</span>
            </div>
        </div>
        <div className='homepage-container'>
            <div className='homepage-left'>
                {names.map(name=>{
                   let path=`/home/${name.replaceAll(" ","_").toLowerCase()}`
                    if(name==="Log Out"){
                        path="/signin"
                    }
                    return <NavLink key={name} onClick={()=>{setDefaultState(name)}} to={path} style={{ textDecoration: "none" }}>
                        <div className={defaultState===name?'sub-category active-defalut':'sub-category'}>
                            {name.replaceAll("_"," ")}
                            
                        </div>
                    </NavLink>
                    })
                }
            </div>
            <div className='homepage-right'>
                {component}
            </div>
        </div>
        

    </div>
  )
}
