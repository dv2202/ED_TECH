import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmout from './RenderTotalAmout';

export default function Cart(){
    const {total,totalItems} = useSelector((state)=>state.cart);

    return (
        <div className='text-white h-[100vh]'>
            <h1>Your Cart</h1>
            <p>{totalItems} Course in cart</p>

            {
                total > 0 
                ? (<div>
                    <RenderCartCourses/>
                    <RenderTotalAmout/>
                </div>)
                : (<p>Your cart is empty</p>)
            }
        </div>
    )
}
