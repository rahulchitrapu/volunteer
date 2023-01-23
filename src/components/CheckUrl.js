export default function checkEnv(){
    if(process.env.NODE_ENV==="development"){
      
        return process.env.REACT_APP_API_LOCAL_BASE_URL
        
    }
    else if(process.env.NODE_ENV==="production"){
       
        return process.env.REACT_APP_API_LOCAL_BASE_URL
        
    }
}