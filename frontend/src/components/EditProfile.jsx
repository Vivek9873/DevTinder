import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const EditProfile = ({user}) => {
    
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
    const [about,setAbout] = useState(user.about);
    const [age,setAge] = useState(user.age || '');
    const [gender,setGender] = useState(user.gender||"");
    const [error,setError] = useState("")
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const saveProfile = async()=>{
        setError("");
        try{
            const data = await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,photoUrl,about,age,gender},{withCredentials:true});
            dispatch(addUser(data?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);

        }
        catch(e){
            console.log(e)
            setError(e.response.data.message)
        }
    }
  return (
    <>
    <div className="flex  my-10  flex-col md:flex-row justify-center ">
    <div className='flex justify-center mx-10'>
        <div className="card card-border bg-base-300 w-96 ">
            <div className="card-body">
                <h2 className="card-title flex justify-center font-bold text-2xl ">Edit Profile</h2>
                <div>
                    <label className="form-control w-full max-w-xs ">
                        <div className="label my-2 ">
                            <span className="label-text">First Name:</span>
                        </div>
                        <input
                            type="text" 
                            value={firstName}
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setFirstName(e.target.value)}
                            
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label my-2">
                            <span className="label-text">Last Name:</span>
                        </div>
                        <input
                            type="text"
                            value={lastName}
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setLastName(e.target.value)}
                           
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label my-2">
                            <span className="label-text">Photo Url:</span>
                        </div>
                        <input
                            type="text"
                            value={photoUrl}
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setPhotoUrl(e.target.value)}
                           
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label my-2">
                            <span className="label-text">About:</span>
                        </div>
                        <input
                            type="text"
                            value={about}
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setAbout(e.target.value)}
                           
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label my-2">
                            <span className="label-text">Age:</span>
                        </div>
                        <input
                            type="text"
                            value={age}
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setAge(e.target.value)}
                           
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label my-2">
                            <span className="label-text">Gender:</span>
                        </div>
                        <input
                            type="text"
                            value={gender}
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setGender(e.target.value)}
                           
                        />
                    </label>
                </div>
                <p className="text-red-700">{error}</p>
                <div className="card-actions justify-center my-2">
                    <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                </div>
            </div>
        </div>
                
    </div>
    <div className="flex justify-center my-10 mx-10 md:mx-0 md:my-0 md:block">
    <UserCard user={{firstName,lastName,photoUrl,about,age,gender}}/>

    </div>
    </div>
    {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  )
}

export default EditProfile