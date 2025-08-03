import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
import themeReducer from "./themeSlice"
import chatReducer from "./chatSlice"

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectionReducer,
        requests:requestReducer,
        theme:themeReducer,
        chat:chatReducer,
        
    },

})

export default appStore;