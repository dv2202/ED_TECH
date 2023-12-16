import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,

};

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.user = value.payload;
        }
    }
})

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;
