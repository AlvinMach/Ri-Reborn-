import React from 'react'
import {useState,useContext,useEffect} from "react"
import {AuthContext} from "../utils/AuthContextProvider"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"

const Login = () => {

    const {handlelogin,user} = useContext(AuthContext)
    const navigate = useNavigate();
    const [credentials,setCredentials] = useState({
        email:"",
        password:"",
    })
    console.log(user)

    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[])

    const handleinput = (e) =>{
        let name = e.target.name 
        let value = e.target.value 

        setCredentials({...credentials,[name]:value})
    }

  
  return (
   <>
    <form  onSubmit = {(e)=>{handlelogin(e,credentials)}}
    className = "bg-white shadow-lg flex justify-center flex-col items-center py-6 max-h-[600px] max-w-[500px] mt-8 mx-auto container">
        <h1 className = "text-black text-4xl font-extrabold mb-11">Ri Reborn</h1>
        <div>
            <label className = "block  mb-4">Email</label>
            <input type = "text" name = "email" placeholder = "enter email"
            value = {credentials.email}
            onChange = {handleinput}
            className = "border p-3 w-[300px] rounded-sm"
            />
        </div>
        <div>
            <label className = "block mt-6 mb-4">Password</label>
            <input type = "password" name = "password" placeholder = "enter password"
             value = {credentials.password}
             onChange = {handleinput}
             className = "border p-3 w-[300px] rounded-sm"
            />
        </div>
        <input type = "submit" value = "Login"  className = "bg-gray-400 mt-6 mb-4 px-6 py-2 w-[300px] rounded-lg  font-semibold" />
        <p className = "text-lg">Not yet registered?<Link to = "/Register" className = "text-red-400 px-2 cursor-pointer" >Sign up here</Link></p>
    </form>
   </>
  )
}

export default Login
