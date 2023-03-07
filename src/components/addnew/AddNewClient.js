import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import checkEnv from '../CheckUrl'
// import ImageUpload from '../imageupload/ImageUpload'
import moment from 'moment'

export default function AddNewClient() {
    let obj={
        spouce_name:"",
        children:[],
        name:"",
        surname:"",
        gender:"male",
        date_of_birth:"",
        marital_status:"UnMarried",
        image:"",
        mobile:'',
        aadhar:'',  
        aadharlink:'',
        panlink:'',
        banklink:'',
        rationcardlink:'',
        volunteerid:localStorage.getItem("userId")
    }
    const [data,setData]=useState(obj)
    const [child,setChild]=useState('')
    const url=checkEnv()
    const [searchParams]=useSearchParams()
    const id=localStorage.getItem('userId')
    const personid=searchParams.get("id")
    const navigate=useNavigate();

    useEffect(()=>{
        if(personid){
            axios.get(`${url}/allClients/getuser/?id=${id}&personid=${personid}`)
            .then(res=>{
                console.log(res.data[0])
                setData({...res.data[0],
                    children:JSON.parse(res.data[0].children),
                    date_of_birth:moment(res.data[0].date_of_birth).format("YYYY-MM-DD")
                })
            })
        }
    },[id,personid,url])


    const checkBedoreSaving=()=>{
        let keys=Object.keys(data)
    //    console.log("chee",keys)
        let exceptArr=['volunteerId','image','aadharlink','panlink','banklink','rationcardlink']
        let res=''
        keys.forEach(e=>{
            if(!exceptArr.includes(e)){
                
                if(data['marital_status']==='UnMarried' && (e==='spouce_name'||e==='children')){
                    res=''
                }
                else if(data[e].length===0){
                    res=e
                }
                if(data['mobile'].length!==10){
                    res=e
                }
            }
            
            
        })
        return res
    }


    const saveClickHandler=()=>{
        console.log(checkBedoreSaving())
        if(checkBedoreSaving()===''){
           if(!personid){
            axios.post(`${url}/addClient`,{
                // name,surname,gender,date_of_birth,image,spouce_name,marital_status,children,mobile,aadhar,volunteerid
                // "name":data.name,
                // "surname":data.surname,
                // "gender":data.gender,
                // "date_of_birth":data.date_of_birth,
                // "image":data.image,
                // "spouce_name":data.spouce_name,
                // "marital_status":data.marital_status,
                // "children":data.children,
                // "mobile":data.mobile,
                // "aadhar":data.aadhar,
                // "volunteerid":data.volunteerId
                ...data
            })
            .then(res=>{
                navigate("/home/all_profiles")
                setData(obj)
                
            })
           }
           else{
            axios.put(`${url}/addClient/edit`,{
                // name,surname,gender,date_of_birth,image,spouce_name,marital_status,children,mobile,aadhar,volunteerid
                "name":data.name,
                "surname":data.surname,
                "gender":data.gender,
                "date_of_birth":data.date_of_birth,
                "image":data.image,
                "spouce_name":data.spouce_name,
                "marital_status":data.marital_status,
                "children":data.children,
                "mobile":data.mobile,
                "aadhar":data.aadhar,
                "volunteerid":data.volunteerId
            })
            .then(res=>{
                navigate("/home/all_profiles")
                setData(obj)
            })
           }
            
        }
        else{
            window.alert(`please fill deatils properly ${checkBedoreSaving()}`)
        }
        
    }

    const onChangeHandler=(e,param)=>{
        data[param]=e.target.value
        setData({...data})
    }
    const addclick=(e)=>{
        e.preventDefault()
       setData({
        ...data,
        children:[...data.children,child]
       })
       setChild('')
    }

    // const saveImage=(imageFile)=>{
    //     console.log(imageFile)
    //     setData({
    //         ...data,
    //         image:imageFile
    //     })
    // }

    const removeClickHandler=(ind)=>{
       let arr=data.children.filter((e,i)=>i!==ind)
       setData({...data,children:arr})
    }

    // console.log(data.aadharlink)
  
  return (
    <div>
        <div>
            <h1 className='add-new-person'>Add new Person</h1>
        </div>
        <div className='main-container'>
            <div className='form-container'>
                <div className='flex'>
                    <label htmlFor='name'>Name</label>
                    <div>:<input onChange={(e)=>{onChangeHandler(e,'name')}} value={data.name} type='text' id='name'></input><br/></div>
                </div>
                <div className='flex'>
                    <label htmlFor='surname'>Surname</label>
                    <div>:<input onChange={(e)=>{onChangeHandler(e,'surname')}} value={data.surname} type='text' id='surname'></input><br/></div>
                </div>
                <div className='flex'>
                    <label>Gender</label>
                    {/* onClick={()=>setData({...data,gender:"male"})} */}
                    <div>:<input onChange={(e)=>{onChangeHandler(e,'gender')}} checked={data.gender==='male'?true:false}  value={"male"} type='radio' name='gender' id='male'></input><label htmlFor='male'>male</label>
                    <input onChange={(e)=>{onChangeHandler(e,'gender')}} checked={data.gender==='female'?true:false}   type='radio' name='gender' value={"female"} id='female'></input><label htmlFor='female'>female</label><br/>
                    </div>
                </div>
                <div className='flex'>
                    <label htmlFor='dob' >Date_of_birth</label>
                    <div>:<input onChange={(e)=>onChangeHandler(e,'date_of_birth')} value={data.date_of_birth} type='date'></input><br/></div>
                </div>
                <div className='flex'>
                    <label>Marital Status</label>
                    <div>:<select onChange={(e)=>onChangeHandler(e,'marital_status')} value={data.marital_status}>
                        <option value={'Married'}>Married</option>
                        <option value={'UnMarried'}>Unmarried</option>
                    </select><br/>
                    </div>
                </div>
                {data.marital_status==='Married' && <div className='flex'>
                    <label  htmlFor='spoucename'>Spouce Name</label>
                    <div>
                        :<input onChange={(e)=>{onChangeHandler(e,'spouce_name')}} value={data.spouce_name} type='text' id='spoucename'></input><br/>
                    </div>
                </div>}
                {data.marital_status!=='UnMarried' && <div className='flex'>
                    <label htmlFor='aadhar'>Children</label>
                    <div >:
                                <form className='form-container1' onSubmit={addclick}>
                                    <input id='child' value={child} onChange={(e)=>{setChild(e.target.value)}} type='text'></input>
                                    <button className='add' onClick={(e)=>addclick(e)}> +add</button>
                                </form>
                    </div>
                </div>}
                {data.marital_status!=='UnMarried' && <div className='flex1'>
                    {/* width-41 flex1 */}
                        {data.children.map((e,i)=>{
                            return <div key={i} className='children'>{e} <span onClick={()=>removeClickHandler(i)} className='remove'>x</span></div>
                        })}
                    </div>
            
                }
                
                <div className='flex'>
                    <label htmlFor='mobile' >Mobile</label>
                    <div>:<input id='mobile' onChange={(e)=>{onChangeHandler(e,'mobile')}} value={data.mobile} type='number'></input><br/></div>
                </div>
                <div className='flex'>
                    <label htmlFor='aadhar'>Aadhar</label>
                    <div>:<input id='aadhar' onChange={(e)=>{onChangeHandler(e,'aadhar')}} value={data.aadhar} type='number'></input><br/></div>
                </div>
                <div className='flex'>
                    <label htmlFor='aadharlink'>Aadhar link</label>
                    <div>:<input id='aadharlink' onChange={(e)=>{onChangeHandler(e,'aadharlink')}} value={data.aadharlink} type='text'></input><br/></div>
                </div>
                <div className='flex'>
                    <label htmlFor='panlink'>Pan link</label>
                    <div>:<input id='panlink' onChange={(e)=>{onChangeHandler(e,'panlink')}} value={data.panlink} type='text'></input><br/></div>
                </div>
                <div className='flex'>
                    <label htmlFor='banklink'>Bank link</label>
                    <div>:<input id='banklink' onChange={(e)=>{onChangeHandler(e,'banklink')}} value={data.banklink} type='text'></input><br/></div>
                </div>
                <div className='flex'>
                    <label htmlFor='rationcard'>Ration Card link</label>
                    <div>:<input id='rationcard' onChange={(e)=>{onChangeHandler(e,'rationcardlink')}} value={data.rationcardlink} type='text'></input><br/></div>
                </div>

                
            </div>
            <div className='image-main-container'>
                {(data.aadharlink!==null && data.aadharlink!=='')&&<div className='image-container'>
                    <img src={data.aadharlink} alt={'aadhar'}/>
                </div>}
                {(data.panlink!==null&&data.panlink!=='')&&<div className='image-container'>
                    <img src={data.panlink} alt='pancard'/>
                </div>}
                {(data.banklink!==null && data.banklink!=='')&&<div className='image-container'>
                    <img src={data.banklink} alt='bankbook'/>
                </div>}
                {(data.rationcardlink!==null && data.rationcardlink!=='')&&<div className='image-container'>
                    <img src={data.rationcardlink} alt='rationcard'/>
                </div>}
            </div>
        </div>
        
        
        {/* <ImageUpload saveImage={saveImage}/> */}
        
        <div className='save' onClick={saveClickHandler}>Save</div>
    </div>
  )
}
