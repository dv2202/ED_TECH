import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { GiBackwardTime } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { signUp } from '../services/operations/authAPI';
const VerifyEmail = () => {
    const {signupData,loading} = useSelector((state)=> state.auth);
    const [otp ,setOtp] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[ ])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        console.log(otp);

        dispatch(signUp(accountType, firstName, lastName, email, password,confirmPassword, otp, navigate));
    }

  return (
    <div className='text-white'>
      {
        loading 
        ? (<div>
            Loading .... 
        </div>) 
        : (
        <div className='h-screen flex justify-center items-center my-auto '>
            <div className=' flex flex-col gap-5 p-[32px] h-[370px] w-fit'>
            <h1 className='text-inter text-[25px] font-medium text-white'>Verify Email</h1>
            <p className='text-[16px] font-normal text-richblack-500 '>A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={handleOnSubmit} className='text-richBlack200 flex flex-col gap-2' >
                <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>} 
                renderInput={(props) => <input {...props} className='bg-richblack-700 h-[48px] w-[57.33px] justify-evenly border rounded-md p-[12px]' /> }
                />
                <button type='submit' className='w-[444px] bg-yellow-50 text-center text-richblack-900 h-[40px] rounded-md'>
                    Verify Email 
                </button>
            </form>
            <div className='flex flex-row justify-between'>
                <div>
                        <Link to='/login' className='flex flex-row gap-2 items-center text-richblack-25' >
                        <IoIosArrowRoundBack />
                        <p className='font-inter font-medium text-[16px]'>Back to login</p>
                        </Link>
                </div>
                <div>
                    <button onClick={() => dispatch(sendOtp(signupData.email,navigate))} className='flex flex-row items-center'>
                        <GiBackwardTime/>
                        Resend OTP 
                    </button>
                </div>
            </div>
        </div>
        </div>)
      }
    </div>
  )
}

export default VerifyEmail
