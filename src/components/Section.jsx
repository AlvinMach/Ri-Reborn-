import React from "react";
import { TiDelete } from "react-icons/ti";
import { useContext, useEffect ,useState} from "react";
import {db} from "../config/databases"
import { AuthContext } from "../utils/AuthContextProvider";
import { teams,account,storage ,client} from '../config/config'
import {toast} from "react-toastify"



const Section = () => {
  const { texts, getTexts,setTexts } = useContext(AuthContext);
  const [isadmin,setIsadmin] = useState(null)
  const {upload,setImagelist,imagelist,handleImageChange} = useContext(AuthContext)


  useEffect(()=>{
    const isadmin = async () =>{
      try{
        const user = await account.get();
        const userid = user.$id

        const memberships = await teams.listMemberships('66f81b3b002cda189895')
        const isadmin = memberships.memberships.some(
          (member) => member.userId === userid && member.roles.includes('admin'));

          setIsadmin(isadmin)
      }catch (error){
        console.error(error)
      }
    }

    isadmin();
  },[]);

  useEffect(() => {
    getTexts();

    
  const unsubscribe = client.subscribe(
    `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${
      import.meta.env.VITE_COLLECTION_ID
    }.documents`,
    (response) => {
      if (
        response.events.includes(
          "databases.*.collections.*.documents.*.create"
        )
      ) {
        setTexts((prevState) => [response.payload, ...prevState]);
       
        
      }

      if (
        response.events.includes(
          "databases.*.collections.*.documents.*.delete"
        )
      ) {
        setTexts((prevState) =>
          prevState.filter((i) => i.$id !== response.payload.$id)
        );
        toast.success("A Product was Removed ")
      }

    }
  );

  return () =>{
    unsubscribe();
  };
  }, []);

  const Removeproduct = async (item_id) =>{
    const confirm = window.confirm("Are You Sure You Want to Remove the Product")
    if(!confirm){
      return;

    }
    const response = await db.texts.delete(item_id)
    //setTexts((prevState)=>prevState.filter((i)=>i.$id !== item_id))
    //toast.success("delete success")



  }

  const deleteImage = async (e,image_id) =>{
    e.preventDefault();
    const confirm = window.confirm("Are You Sure You Want to Remove the Product")
    if(!confirm){
      return;

    }

    await storage.deleteFile('66f5ac5b003a8ec046e8',image_id);
    setImagelist((prevState) => prevState.filter((image) => image.$id !== image_id));
    toast.success("delete success")
  }







  return (
    <>
      <h1 className = "text-center text-3xl font-extrabold">Products</h1>
      <div className = "max-w-[1640px] lg:grid lg:grid-cols-3 flex flex-col space-y-4 gap-4 mx-auto container px-8 py-8 m-8 ">
        {imagelist &&
        imagelist.map((image) => (
          <div key={image.$id} className = "px-11 relative">
            {isadmin ?( <TiDelete  size = {20} className = " text-red-800 cursor-pointer absolute top-0 right-0 " onClick = {(e)=>deleteImage(e,image.$id)}/>):("")}
            
            <img className = " hover:scale-105 duration-300 h-[380px] rounded-lg  "
              src={storage.getFilePreview("66f5ac5b003a8ec046e8", image.$id)}
              alt="Preview"
             
            />
         
          </div>
          
        ))}
       
        {texts && texts.length > 0 ? (
          texts.map((item) => (
            <div key={item.$id} className = "bg-white  shadow-lg m-6 hover:scale-105 duration-300 text-center max-h-[800px] max-w-[800px] overflow-hidden relative ">
              <div className = "md:flex md:space-x-16 px-8 py-8 flex space-y-5 flex-col items-center text-center  ">
                <h1 className = "text-black font-semibold mt-6  ">{item.title}</h1>
                <h2 className = "text-sm max-w-sm  mx-auto px-4">{item.body}</h2>
                <p className = " text-red-600">{item.Location}</p>
              </div>
              {isadmin ? ( <TiDelete  size = {20} className = " text-red-500 cursor-pointer absolute top-0 right-6 " onClick = {()=>Removeproduct(item.$id)}/>):("")}
            </div>
          ))
        ) : (
          <p>No texts available</p>
        )}
      </div>
    </>
  );
};

export default Section;
