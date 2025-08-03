
import axios from 'axios';
import { Link } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Error = () => {
    const dispatch = useDispatch();
    const handleLogout = async()=>{
        await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
        dispatch(removeUser());
    }

  return (
    <div className='flex justify-center'>
        <h1 className='text-red-700 '>Something Went Wrong! Please Go to Login Page</h1>
        <Link
          className="btn btn-secondary mx-2 w-auto"
          to={"/login"} onClick={handleLogout}
        >
          Login Page
        </Link>
    </div>
  )
}

export default Error