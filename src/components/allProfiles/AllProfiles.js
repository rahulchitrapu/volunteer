
import React, { useEffect, useState } from "react";
import "./AllProfiles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Table } from "react-bootstrap";
import axios from "axios";
import checkEnv from "../CheckUrl";
import moment from "moment";




export default function AllProfiles() {
    const [search, setsearch] = useState("");
    const navigate=useNavigate();
    const [data,setData]=useState([])
    const [searchedData,setSearchedData]=useState([])
    const [searchParams]=useSearchParams()
    const url=checkEnv()
    const id=localStorage.getItem('userId')

    const searchHandler = () => {
        console.log(search)
        let arr= data.filter(e=>{
            return e.Name.toLowerCase().includes(search.toLowerCase())
        })
        setSearchedData(arr)
    };

    useEffect(()=>{
        setSearchedData(data.filter(e=>{
            return e.name.toLowerCase().includes(search.toLowerCase())||
            e.surname.toLowerCase().includes(search.toLowerCase())||
            e.gender.toLowerCase().startsWith(search.toLowerCase())||
            e.mobile.includes(search)

        }))
        
    },[search,data])


    useEffect(()=>{
        axios.get(`${url}/allClients/?id=${id}`,)
        .then(res=>{
            console.log(res.data)
            setData(res.data)
            setSearchedData(res.data)
        })
    },[url,searchParams,id])


    const getAge=(str)=>{
        let byear=str.split("-")[0]
        const d = new Date();
        let year = d.getFullYear();
        return (year-byear)
    }


    const deleteUser=(pid)=>{
     
        axios.delete(`${url}/delete/?personId=${pid}`,{headers:{
            id:id,
        }})
        .then(res=>{
            axios.get(`${url}/allClients/?id=${id}`,)
            .then(res=>{
                console.log(res.data)
                setData(res.data)
                setSearchedData(res.data)
            })
        })
    }
    
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
                    navigate({
                        pathname:"/home/all_profiles/newprofile",
                        search:""
                    })
                }}
                >
                <span className="add-new-text">+ Add New Profile</span>
                </div>
        </div>
        <div className="table-container">
        <Table className="table-container1" striped bordered hover>
          <thead>
            <tr className="table-header">
              <th>S.No</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th className="width-200px">Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          {searchedData.length!==0 ? (
            <tbody>
                {searchedData.map((e,i)=>{
                    // console.log(`/uploads/${e?.image}`)
                    return  <tr key={i} className={i%2===0?"table-body-odd":"table-body-even"}>
                        <td className="table-body-name">{i+1}</td>
                        <td className="table-body-name" onClick={()=>{navigate(`/home/all_profiles/newprofile/?id=${e.id}`)}}>{e?.name}</td>
                        <td className="table-body-name">{e?.surname}</td>
                        <td className="table-body-name">{e?.mobile}</td>
                        <td className="table-body-name">{e?.gender}</td>
                        <td className="table-body-name space-around width-200px"><span className="mr-10">{moment(e?.date_of_birth).format("DD-MM-YYYY")}</span> &nbsp; &nbsp; <span className="ml-3">({getAge(e?.date_of_birth)} Years)</span></td>
                        <td className="table-body-name " >
                           <span className="delete-btn" onClick={()=>deleteUser(e.id)}>delete</span> 
                        </td>
                        {/* <td className="table-body-name"><img src={`/uploads/${e?.image}`} alt=''/></td> */}
                    </tr>
                })}
               
            </tbody>
          ) : (
            <tbody>
              <tr className="table-body-even">
                <td className="table-body-name">loading...</td>
                <td className="table-body-name">loading...</td>
                <td className="table-body-name">loading...</td>
                <td className="table-body-name">loading...</td>
                <td className="table-body-name">loading...</td>
                <td className="table-body-name">loading...</td>
                <td className="table-body-name">loading...</td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>
        
    </div>
  )
}
