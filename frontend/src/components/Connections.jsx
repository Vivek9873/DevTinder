import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

import Error from "./Error";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import NoChatSelected from "./NoChatSelected";


const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store=>store.connections);
    const selectedUser = useSelector(store=>store.chat);
    console.log("Selected User hai ",selectedUser)
    const fetchConnections = async()=>{
        try{
            const apiResponse = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
            // console.log(apiResponse?.data?.data)
            dispatch(addConnections(apiResponse?.data?.data));

        }
        catch (err){
        console.log(err);
        <Error/>
    }
    }
    useEffect(()=>{
        fetchConnections();
    },[])
    if(!connections) return 
    if(connections.length===0) return <h1 className="font-bold text-3xl flex justify-center my-5">No Connections Found!</h1>
  return (
    // <div className="text-center my-10 w-4/6 mx-auto">
    //   <h1 className="text-bold  text-3xl">Connections</h1>

    //   {connections.map((connection) => {
    //     const { _id, firstName, lastName, photoUrl, age, gender, about } =
    //       connection;

    //     return (
    //       <div
    //         key={_id}
    //         className=" flex justify-evenly items-center m-4 p-4 rounded-lg bg-base-300  mx-auto "
    //       >
    //         <div className="w-auto">
    //           <img
    //             alt="photo"
    //             className="w-40 md:w-20 h-20 rounded-full"
    //             src={photoUrl}
    //           />
    //         </div>
    //         <div className="text-left mx-4 w-auto">
    //           <h2 className="font-bold text-xl">
    //             {firstName + " " + lastName}
    //           </h2>
    //           {age && gender && <p>{age + ", " + gender}</p>}
    //           <p className="hidden md:block">{about}</p>
    //         </div>
    //         <div>
    //           <Link to={`/chat/${_id}`}
    //             className="btn btn-primary mx-2 my-2 md:my-0 w-auto"
                
    //           >
    //             Chat
    //           </Link>
    //           {/* <button
    //             className="btn btn-secondary mx-2 w-auto"
    //             onClick={() => reviewRequest("accepted", request._id)}
    //           >
    //             Accept
    //           </button> */}
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-10 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar connections={connections}/>
              {!selectedUser?<NoChatSelected/>:<Chat/>}
             
          </div>
        </div>
      </div>
    </div>

  )
}

export default Connections