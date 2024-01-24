import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,

};

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload
        }
    }
})

export const {setUser,setLoading} = profileSlice.actions;
export default profileSlice.reducer;
