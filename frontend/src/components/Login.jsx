import  { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const dispatch = useDispatch();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [error,setError] = useState("");
    const [isLogin,setIsLogin] = useState(true);
    const navigate = useNavigate()
    const handleLogin = async()=>{
        try{
            setError("")
            const result = await axios.post(BASE_URL+"/login",{email,password},{withCredentials:true});
            dispatch(addUser(result?.data?.data));
            navigate("/")
        }
        catch(e){
            console.error(e);
            setError(e.response.data.message);
        }
    }
    const handleSignUp = async()=>{
        try{
            setError("")
            const result = await axios.post(BASE_URL+"/signup",{firstName,lastName,email,password},{withCredentials:true});
            dispatch(addUser(result?.data?.data));
            navigate("/profile");
            
        }
        catch(e){
            console.error(e);
            setError(e.response.data.message);
        }
    }
  return (
    <div className='flex justify-center my-10'>
        <div className="card card-border bg-base-300 w-96 ">
            <div className="card-body">
                <h2 className="card-title flex justify-center font-bold text-2xl ">{isLogin?"Login":"SignUp"}</h2>
                <div>
                    {!isLogin && <label className="form-control w-full max-w-xs ">
                        <div className="label my-2 ">
                            <span className="label-text">First Name:</span>
                        </div>
                        <input
                            type="text" 
                            value={firstName}
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setFirstName(e.target.value)}
                        />
                    </label>}
                    {!isLogin && 
                    <label className="form-control w-full max-w-xs ">
                        <div className="label my-2 ">
                            <span className="label-text">Last Name:</span>
                        </div>
                        <input
                            type="text" 
                            value={lastName}
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setLastName(e.target.value)}
                        />
                    </label>}
                    <label className="form-control w-full max-w-xs ">
                        <div className="label my-2 ">
                            <span className="label-text">Email ID:</span>
                        </div>
                        <input
                            type="text" 
                            value={email}
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label my-2">
                            <span className="label-text">Password:</span>
                        </div>
                        <input
                            type="password"
                            value={password}
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <p className="text-red-700">{error}</p>
                <div className="card-actions justify-center my-2">
                <button className="btn btn-primary" onClick={()=>isLogin?handleLogin():handleSignUp()}>{isLogin?"Login":"Sign Up"}</button>
                </div>
                <p onClick={()=>setIsLogin(!isLogin)} className='cursor-pointer'>{isLogin?"New User? Sign Up Now":"Already Registered? Login Now"}</p>
            </div>
        </div>
    </div>
  )
}

export default Login