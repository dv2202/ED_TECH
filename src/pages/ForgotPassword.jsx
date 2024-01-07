import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { Loader } from 'rsuite';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { IoIosArrowRoundBack } from "react-icons/io";
import ShapesComponent from '../components/core/homepage/common/ShapesComponent'
const ForgotPassword = () => {
    const {loading} = useSelector((state)=> state.auth)
    const [emailSent , setEmailSent ] = useState(false);
    const [email,setEmail] = useState("")
    const dispatch = useDispatch();
    
    const handelOnSubmit = (e)=>{
      e.preventDefault();
      dispatch(getPasswordResetToken(email, setEmailSent));
    }
  return (

    <div className='text-white flex justify-center items-center h-screen'>
      {
        loading ? (
            <div><ShapesComponent></ShapesComponent></div>
        ) : (
        <div className='w-[508px] h-[448px] flex flex-col gap-[36px]'>
          <div className='flex flex-col gap-[12px]'>
              <h1 className='text-[30px] font-inter font-medium'>
                {
                  !emailSent ? "Reset Your Password" : "Check Your Email"
                }
              </h1>
              <p className='font-normal text-[18px] font-inter text-richblack-400'>
                {
                  !emailSent ? 
                  "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                  : `We have sent the reset email to ${email}`
                }
              </p>
          </div>
          <form onSubmit={handelOnSubmit} className='flex flex-col gap-[50px]'>
              {
                !emailSent && (
                  <label className='flex flex-col gap-[12px]'>
                    <p className='text-[14px] font-inter text-richblack-100'>Email Address <span className='text-[#E2181A]'>*</span></p>
                    <input type="email"
                           required="true"
                           name='email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder='Enter your email address'  className='w-[444px] h-[48px] rounded-md p-[12px] bg-richblack-700'/>
                  </label>
                )
              }
                <button
                    type='submit' className='w-[444px] bg-yellow-50 text-center text-richblack-900 h-[48px] rounded-md'>
                  {
                    !emailSent ? "Reset Password" : "Resend Email"
                  }
                </button>
          </form>
  
          <div className='h-[48px] w-[444px] p-[12px] '>
            <Link to='/login' className='flex flex-row gap-2 items-center'>
              <IoIosArrowRoundBack />
              <p className='font-inter font-medium text-[16px]'>Back to login</p>
            </Link>
          </div>
        </div>)
      }
    </div>
  )
}

export default ForgotPassword
