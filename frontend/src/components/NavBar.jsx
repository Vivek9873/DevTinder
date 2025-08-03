import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { setTheme } from "../utils/themeSlice";


const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(store=>store.user);
  const handleLogout = async()=>{
    await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
    dispatch(removeUser());
    dispatch(setTheme("dark"));
  }
  return (
    <div className="navbar bg-base-300 shadow-sm sticky top-0">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        {user && 
        <div className="flex gap-2">
          <span className="items-center flex">Welcome {user.firstName}</span>
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="user Photo"
                  src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to={"/"}>Feed</Link></li>
              <li><Link to={"/connections"}>Connections</Link></li>
              <li><Link to={"/requests"}>Requests</Link></li>
              <li><Link to={"/settings"} >Settings</Link></li>
              <li><Link to={"/login"} onClick={handleLogout}>Logout</Link></li>
            </ul>
          </div>
        </div>}
      </div>
  )
}

export default NavBar