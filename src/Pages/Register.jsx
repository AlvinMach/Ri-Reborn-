import React from "react";
import {Link} from "react-router-dom"
import {useState,useContext} from "react"
import { AuthContext } from "../utils/AuthContextProvider";

const Register = () => {
    const {handleregister} = useContext(AuthContext)
    const [credentials,setCredentials] = useState({
        name:"",
        email:"",
        password1:"",
        password2:"",
    })

    const handleinput = (e) =>{
        let name = e.target.name
        let value = e.target.value 

        setCredentials({...credentials,[name]:value})
    }
  return (
    <>
       <form  onSubmit = {(e)=>{handleregister(e,credentials)}}
    className = "bg-white shadow-lg flex justify-center flex-col items-center  py-6 h-[800px] max-w-[800px] mt-11 mx-auto container">
        <h1 className = "text-black text-4xl font-extrabold mb-11">Ri Reborn</h1>
        <div>
            <label className = "block mt-10 mb-4">Name</label>
            <input type = "text" name = "name" placeholder = "Enter UserName"
            value = {credentials.name}
            onChange = {handleinput}
            className = "border p-3 w-[300px] rounded-sm"
            />
        </div>
        <div>
            <label className = "block mt-10 mb-4">Email</label>
            <input type = "text" name = "email" placeholder = "enter email"
            value = {credentials.email}
            onChange = {handleinput}
            className = "border p-3 w-[300px] rounded-sm"
            />
        </div>
        <div>
            <label className = "block mt-6 mb-4">Password1</label>
            <input type = "password" name = "password1" placeholder = "enter password"
             value = {credentials.password1}
             onChange = {handleinput}
             className = "border p-3 w-[300px] rounded-sm"
            />
        </div>
        <div>
            <label className = "block mt-6 mb-4">Password2</label>
            <input type = "password" name = "password2" placeholder = "Confirm Password"
             value = {credentials.password2}
             onChange = {handleinput}
             className = "border p-3 w-[300px] rounded-sm"
            />
            
        </div>
        <input type = "submit" value = "Register"  className = "bg-gray-300 mt-6 px-6 py-2 w-[300px] rounded-xl  font-semibold" />
        <p className = "text-lg mt-6">Already registered ?<Link className = "text-red-200 px-2" to = "/login">Sign up here</Link></p>
    </form>
    </>
  );
};

export default Register;
