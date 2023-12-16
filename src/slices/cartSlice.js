import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "react-hot-toast";

const initialState = {
   totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
};

const cartSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setTotalItems(state,value){
            state.token = value.payload;
        },
        //add to cart
        //removefromcart
        //resetcart
        
    }
})

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;
