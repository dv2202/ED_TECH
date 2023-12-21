import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")) 
    : [],
    total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total")) 
    : 0,
    totalItems: localStorage.getItem("totalItems") 
    ? JSON.parse(localStorage.getItem("totalItems")) 
    : 0
};

const cartSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setTotalItems(state,value){
            state.token = value.payload;
        },
        //add to cart
        addToCart:(state,action) => {
            const course = action.payload;
            const index = state.cart.findIndex((item)=> item._id === course._id)

            if(index>=0){
                //if course id already in cart don't add it 
                toast.error("Course is already in cart");
                return
            }
            //if course isnot in the cart , add it to the cart 
            state.cart.push(course);
            //update the total quantity 
            state.totalItems++
            state.total += course.price
            //Update to local storage 
            localStorage.setItem("cart".JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
            //show toast
            toast.success("Course added to cart")
        },
        //removefromcart
        removeFromCart:(state,action)=>{
            const courseId = action.payload;
            const index = state.cart.findIndex((item)=> item._id ===courseId)
            if(index >= 0){
                //if the course is found in the cart , remove it 
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)
                //update to local storage 
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems",  JSON.stringify(state.totalItems))
                //show toast
                toast.success("Course removed from cart")
            }
        },

        //resetcart
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0 
            //Update to local storage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },
    },
})

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions;
export default cartSlice.reducer;
