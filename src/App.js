
import { Routes, Route } from "react-router-dom";

import './App.css';
import AddNewClient from "./components/addnew/AddNewClient";
import AllProfiles from "./components/allProfiles/AllProfiles";
import Female from "./components/female/Female";
import Homepage from "./components/homepage/Homepage";
import Male from "./components/male/Male";
import SignIn from './components/signin/SignIn';
import SignUp from "./components/singup/SignUp";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/home" element={<Homepage component={<AllProfiles/>}/>}/>
        <Route path="/home/all_profiles" element={<Homepage component={<AllProfiles/>}/>}/>
        <Route path="/home/male" element={<Homepage component={<Male/>}/>}/>
        <Route path="/home/female" element={<Homepage component={<Female/>}/>}/>
        <Route path="/home/all_profiles/newprofile" element={<Homepage component={<AddNewClient/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
