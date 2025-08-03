import { BrowserRouter,Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Requests from "./components/Requests"
import Connections from "./components/Connections"
import Chat from "./components/Chat"
import Settings from "./components/Settings"

function App() {


  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/connections" element={<Connections/>}/>
          <Route path="/requests" element={<Requests/>}/>
          <Route path="/chat/:targetUserId" element={<Chat/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="*" element={<Feed/>}/>

        </Route>

      </Routes>
      </BrowserRouter>

    </Provider>
    </>
  )
}

export default App
