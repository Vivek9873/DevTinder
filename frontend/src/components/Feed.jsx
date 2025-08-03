import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Error from "./Error";

const Feed = () => {
    const dispatch = useDispatch();
    const users = useSelector(store=>store.feed); 
    const fetchFeed = async()=>{
        try{
            const result = await axios.get(BASE_URL+"/feed",{withCredentials:true});
            dispatch(addFeed(result?.data?.data));
        }
        catch (err){
        console.log(err);
        <Error/>
    }
        
    }
    useEffect(()=>{
        fetchFeed()
    },[])
    if(!users) return;
    if(users.length===0) return <h1 className="flex font-bold justify-center my-10">No User Found!</h1>
  return (
    <div className="flex justify-center my-10">
        { 
            users && <UserCard key={users[0]._id} user={users[0]}/>
        }
    </div>
  )
}

export default Feed