import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContextProvider";
import { db } from "../config/databases";
import { MdDeleteForever } from "react-icons/md";
import { client } from "../config/config";
import {toast} from "react-toastify"
import {Role,Permission} from "appwrite"

const Messages = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newmssg, setNewmssg] = useState("");

  const createMessages = async (e) => {
    e.preventDefault();
    const response = await db.messages.create(payload,permissions);
    //setMessages((prevState) => [response, ...prevState]);
  };

  let payload = {
    texts: newmssg,
    user_id: user.$id,
    username:user.name,
  };

  let permissions = [
    Permission.write(Role.user(user.$id))
  ]

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${
        import.meta.env.VITE_COLLECTION_ID_MESSAGES
      }.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prevState) => [response.payload, ...prevState]);
         
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setMessages((prevState) =>
            prevState.filter((i) => i.$id !== response.payload.$id)
          );
          toast.success("Message Deleted")
        }
  
      }
    );

    return () =>{
      unsubscribe();
    };

  }, []);

  const getMessages = async () => {
    try {
      const response = await db.messages.list();
      setMessages(response.documents);
    } catch (error) {
      console.error("Error fetching texts:", error);
    }
  };

  const deleteMssgs = async (mssg_id) => {
    const confirm = window.confirm("Are you Sure Want to delete Message")
    if(!confirm){
      return;
    }

    await db.messages.delete(mssg_id);
   
    //setMessages((prevState)=>prevState.filter((i)=>i.$id !== mssg_id))
  };

  return (
    <>
   <section className = " h-screen w-full overflow-y-scroll ">
   <div className="  flex justify-center mx-auto container items-center ">
      <div>
         <div className= "sticky top-0 z-20  flex flex-col space-y-6 text-center mb-6">
            <h1 className="text-5xl text-black font-extrabold mt-8">Ri Reborn</h1>
            <p className="text-lg text-black font-semibold border-b-4 "> Chat Room</p>
          </div>
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message, index) => (
          
              <div key={index} > 
              <div className = "flex justify-between items-center ">
                {message?.username ? (<h1 className = "text-lg font-semibold mb-2 text-black  ">{message.username}</h1>):(<p>anynoymous</p>)}
                 <p>{new Date(message.$createdAt).toLocaleString()}</p>
                 {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && ( <MdDeleteForever
                  onClick={(e) => deleteMssgs(message.$id)}
                  size={20} className = "text-red-600 "
                />)}
              </div>
                <h1 className="bg-blue-600 mb-4 text-lg rounded-lg text-white max-w-[180px] px-6 py-2 text- font-semibold hover:bg-blue-400">
                  {message.texts}
                </h1>
              </div>
            ))
          ) : (
            <p className = "text-black font-semibold text-3xl text-center">Start Chatting</p>
          )}
          <div className="flex flex-col space-x-4  md:flex-row items-center px-6 py-8 ">
            <textarea
              placeholder="message..."
              type="text"
              onChange={(e) => setNewmssg(e.target.value)}
              className=" px-4 py-6 border mx-4 mt-4 w-[350px]"
            ></textarea>
            <button
              onClick={createMessages}
              className=" hover:bg-red-700 text-white rounded-lg bg-red-500 px-6 py-2 mt-6 "
            >
              Send
            </button>
          </div>
        </div>
      </div>
   </section>
    </>
  );
};

export default Messages;