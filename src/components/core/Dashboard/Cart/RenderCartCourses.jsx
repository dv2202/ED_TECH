import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiStarSLine } from "react-icons/ri";
import { RiStarSFill } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';


const RenderCartCourses = () => {
    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
  return (
    <div>   
      {
        cart.map((course,index)=>(
            <div>
                <div>
                    <img src={course?.thumbnail} alt="course thumbnail" />
                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>
                        <div>
                            <span>4.8</span> //connect the api of average rating here 
                            <ReactStars 
                                count={5}
                                size={24}
                                value={4.8}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<RiStarSLine/>}
                                fullIcon={<RiStarSFill/>}
                            />
                            <span>{course?.ratingAndReviews?.length}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={()=>dispatch(removeFromCart(course._id))}>
                        <RiDeleteBin6Fill/> 
                        <span>Remove</span>
                    </button>
                    <p>Rs.{course?.price}</p>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
