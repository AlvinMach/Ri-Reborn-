import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../utils/AuthContextProvider";
import { storage } from '../config/config';

const AddMine = ({ submit }) => {
  const {
    createTexts,
    setNewbody,
    setTitle,
    setLocation,
    upload,
    handleImageChange,
  } = useContext(AuthContext);

  return (
    <>
      <div className="flex justify-center flex-col mx-auto container items-center mt-10 bg-white shadow-lg h-[700px] w-[600px]">
        <h1 className="font-bold text-3xl mb-8">Add New Product</h1>
        <div className="m-4">
          <label className="block mb-4 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            placeholder="title"
            className="px-6 py-2 border w-[450px]"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="m-4">
          <label className="block mb-4 font-semibold">Body</label>
          <input
            type="text"
            name="title"
            placeholder="Body"
            className="px-6 py-2 border w-[450px]"
            onChange={(e) => setNewbody(e.target.value)}
          />
        </div>
        <div className="m-4">
          <label className="block mb-4 font-semibold">Location</label>
          <input
            type="text"
            name="title"
            placeholder="Location"
            className="px-6 py-2 border w-[450px]"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <form onSubmit={upload} className ="mb-11 px-11 mt-8">
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <button type="submit" className = "bg-blue-400 px-8 py-2">Upload</button>
        </form>
        <button
          onClick={createTexts}
          type="submit"
          className="bg-red-500 px-8 py-4 rounded-lg mt-10 mb-8 hover:bg-red-700 text-white font-semibold w-[450px] text-center"
        >
          Add Product
        </button>
      </div>
    
     
    </>
  );
};

export default AddMine;
