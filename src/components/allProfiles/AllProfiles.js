
import React, { useState } from "react";
import "./AllProfiles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";



export default function AllProfiles() {
    const [search, setsearch] = useState("");
    const navigate=useNavigate()
    const searchHandler = () => {
        
    };
  return (
    <div className='all-profiles'>
        <div className="top-1">
                <div className="product-container-top-section1">
                    <div className="search-continer">
                        <label htmlFor="search">Search :</label>
                        <input
                        id="search"
                        value={search}
                        onChange={(e) => {
                            setsearch(e.target.value);
                        }}
                        placeholder="search here"
                        type="text"
                        ></input>

                        <FontAwesomeIcon
                        onClick={() => searchHandler()}
                        className="search-btn"
                        icon={faMagnifyingGlass}
                        />
                    </div>
                    
                </div>
                <div
                className="add-new"
                onClick={() => {
                    console.log("hh")
                    navigate({
                        pathname:"/home/all_profiles/newprofile",
                        search:""
                    })
                }}
                >
                <span className="add-new-text">+ Add New Profile</span>
                </div>
        </div>
        
    </div>
  )
}
