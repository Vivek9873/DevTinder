import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name:"chat",
    initialState:null,
    reducers:{
        setSelectedUser:(state,action)=>{
            return action.payload;
        
        }
    }
})


export const {setSelectedUser} = chatSlice.actions;
export default chatSlice.reducer;