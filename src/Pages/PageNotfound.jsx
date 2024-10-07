import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import {Link} from "react-router-dom"

const PageNotfound = () => {
  return (
   <>
    <section className = "mx-auto flex flex-col justify-center items-center container max-w-[1500px] text-center py-8">
          <FaExclamationTriangle className = "flex text-center mb-6 text-red-400" size = {60}/>
                <h1 className = "text-3xl text-blue-500">404 Not Found</h1>
                <p className = "mt-8">This Page does not Exist</p>
                <Link to = "/" className = "bg-blue-300 px-8 py-2 rounded-lg mt-6">Go Back</Link>
    </section>
   </>
  )
}

export default PageNotfound
