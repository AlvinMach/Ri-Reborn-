import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContextProvider";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa"
import {Link} from "react-router-dom"


const Footer = () => {
  const { handlelogout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchmines = async () => {
      try {
        const res = await fetch("http://localhost:8000/mines");
        const data = await res.json();
        setMines(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchmines();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      const res = await fetch("http://localhost:8000/mines");
      const data = await res.json();
      setMines(data);
    } else {
      
      const res = await fetch(
        `http://localhost:8000/mines?title_like=${searchQuery}`
      );
      const data = await res.json();
      setMines(data);
    }
  };
  return (
    <>
      <footer className=" container mx-auto w-full bg-gray-200 duration-200 py-10 px-6 text-center mt-11">
        <div className="flex md:flex-row  flex-col-reverse mt-2 mb-10 space-y-32 md:space-y-0 justify-between items-center">
          <div classsName="flex flex-col-reverse md:flex-row space-y-8">
          <div className = ""> 
               <h1 className="font-bold mb-11 text-3xl mt-8">Ri Reborn</h1>
               <h2 className = "border-b-2 border-black text-red-400 text-2xl mb-6">Follow Us</h2>
               <ul className="flex items-start md:flex md:justify-center text-center space-x-4 ">
              <a href="">
                <FaWhatsappSquare  size = {30}  className = "hover:scale-105 duration-200" />
              </a>
              <a href="">
                <FaXTwitter size = {30} className = "hover:scale-105 duration-200"  />
              </a>
              <a href="">
                <FaFacebook size = {30}   className = "hover:scale-105 duration-200" />
              </a>
              <a href="https://www.instagram.com/teslamotors/" target = "blank">
                < FaSquareInstagram size = {30}   className = "hover:scale-105" />
              </a>
              <a href="">
                < FaPinterest size = {30}  className = "hover:scale-105 duration-200" />
              </a>
            </ul>
            </div>
          </div>
          <div className = "flex justify-around space-x-32">
          <ul className="font-bold flex flex-col space-y-4 items-center md:items-start" >
              <li className="hover:text-red-300">Home</li>
              <Link to = "/About">About</Link>
              <Link to = "/Message">Message</Link>
              //<li className="hover:text-red-300">Terms of Services</li>
            </ul>
          <ul className =  " font-bold flex flex-col space-y-4 md:items-start ">
              <Link to = "/contact" >Contact</Link>
              //<li className="hover:text-red-300">Privacy Policy</li>
            </ul>
          </div>
          <div className = " hidden lg:block mr-11">Copyright &copy; 2024, Allrights Reserved</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
