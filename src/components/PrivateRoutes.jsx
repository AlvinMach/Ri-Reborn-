import React from 'react'
import {Outlet,Navigate} from "react-router-dom"
import {useContext} from "react"
import {AuthContext} from "../utils/AuthContextProvider"



const PrivateRoutes = () => {
   const {user} = useContext(AuthContext)
 
  return (
    <>
       {user ? <Outlet/> : <Navigate to = "/login"/>}
    </>
  )
}

export default PrivateRoutes
