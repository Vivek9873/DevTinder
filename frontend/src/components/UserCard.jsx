import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import Error from "./Error";


const UserCard = ({user}) => {
    const dispatch = useDispatch();
    const {_id,firstName,lastName,photoUrl,about,age,gender} = user;

    const handleSendRequest = async(status,id)=>{
        try{
            await axios.post(BASE_URL+"/request/send/"+status+"/"+id,{},{withCredentials:true});
            dispatch(removeUserFromFeed(id))
        }
        catch (err){
            console.log(err);
            <Error/>
        }
    }

return (
    <div className="card bg-base-300 w-96 shadow-xl">
        <figure >
            <img className="w-full"
            src={photoUrl}
            alt="Profile Photo" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + " " + gender}</p>}
            <p>{about}</p>
            <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard