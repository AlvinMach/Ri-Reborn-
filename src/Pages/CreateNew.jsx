import React from 'react'
import {useState,useContext,useEffect} from "react"
import { AuthContext } from '../utils/AuthContextProvider'

import React from 'react'

const CreateNew = () => {
  const {createTexts,setNewbody,setTitle} = useContext(AuthContext)
  return (
    <>
      <form  className = "flex justify-center flex-col mx-auto container items-center mt-10 bg-white shadow-lg h-[700px] w-[600px]">
        <h1 className = "font-bold text-3xl mb-8">Add New Product</h1>
        <div className = "m-4">
        <label className = "block mb-4 font-semibold">Title</label>
        <input type = "text" name = "title" placeholder = "title" className = "px-6 py-2 border w-[450px]" 
         onChange = {(e)=>setNewbody(e.target.value)}
        />
        </div>
        <div className = "m-4">
        <label className = "block mb-4 font-semibold">Title</label>
        <input type = "text" name = "title" placeholder = "title" className = "px-6 py-2 border w-[450px]" 
         onChange = {(e)=>setTitle(e.target.value)}
        />
        </div>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button onClick = {createTexts}>Send</button>
      </form>
    </>
  )
}

export default CreateNew



  
 
  

