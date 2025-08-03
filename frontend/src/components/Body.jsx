
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useSelector(store=>store.theme);
    document.documentElement.setAttribute("data-theme", theme);
    const fetchUser = async()=>{
        try{
            const result = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
            dispatch(addUser(result?.data?.data));

        }
        catch(e){
          if(e.status===400) navigate("/login");
          console.error(e)
        }
    }
    useEffect(()=>{
        fetchUser();
    },[])
    
  return (
    <div  >
    <NavBar/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Body