import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const [formData , setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const location = useLocation();
    const dispatch = useDispatch()
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const {loading} = useSelector((state)=> state.auth);
    const {password,confirmPassword} = formData;

    const handleOnChange = (e)=>{

        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))

    }
    const handelOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token))

    }
  return (
    <div className='h-screen flex justify-center items-center'>
      {
        loading ? (
            <div>Loading....</div>
        ) : ( 
            <div className='w-[508px] h-[586px] p-[32px] flex flex-col gap-[32px] items-center justify-center '>
                <div className='flex flex-col gap-[12px]'>
                    <h1 className='text-[30px] font-inter font-semibold text-richblack-25'>Choose  new password</h1>
                    <p className='text-[18px] font-normal text-richblack-200'>Almost done. Enter your new password and youre all set.</p>
                </div>
                <form onSubmit={handelOnSubmit} className='flex flex-col gap-[12px]'>
                    <label className='flex flex-col gap-[6px] relative '>
                        <p className='text-[14px] font-normal font-inter text-richblack-25'>New Password <span className='text-[#E2181A]'>*</span> </p>
                        <div className='flex flex-row items-center'>
                        <input
                         required="true"
                         type={showPassword ? "text" : "password"}
                         value={password}
                         name='password'
                         onChange={handleOnChange}
                         placeholder='Password'
                         className='w-[444px] h-[48px] bg-richblack-800 rounded-md p-[12px] text-richblack-25'
                         />
                         <span
                            onClick={() => setShowPassword((prev)=> !prev)}
                         className='text-richblack-25 absolute right-3 top-[38px] z-[10] cursor-pointer'>
                            {
                                showPassword  
                                ? <FaRegEyeSlash fontSize={24}/>
                                :<FaRegEye fontSize={24}/> 
                            }
                        </span>
                        </div>
                    </label>
                    <label className='flex flex-col gap-[6px] relative' >
                        <p className='text-[14px] font-normal font-inter text-richblack-25'>Confirm Password <span className='text-[#E2181A]'>*</span> </p>
                        <input
                         required="true"
                         type={showConfirmPassword ? "text" : "password"}
                         value={confirmPassword}
                         name='confirmPassword'
                         onChange={handleOnChange}
                         placeholder='Confirm Password'
                         className='w-[444px] h-[48px] bg-richblack-800 rounded-md p-[12px] text-richblack-25'
                         />
                         <span
                            onClick={() => setShowConfirmPassword((prev)=> !prev)}
                            className='text-richblack-25 absolute right-3 top-[38px] z-[10] cursor-pointer'
                         >
                            {
                                showConfirmPassword  
                                ? <FaRegEyeSlash fontSize={24}/> 
                                : <FaRegEye fontSize={24}/>
                            }
                         </span>
                    </label>
                    <button type='submit'
                            className='w-[444px] bg-yellow-50 text-center text-richblack-900 h-[48px] rounded-md'
                    >
                        Reset Password
                    </button>
                </form>

                <div className='h-[48px] w-[444px]  '>
                    <Link to='/login' className='flex flex-row gap-2 items-center text-richblack-25' >
                    <IoIosArrowRoundBack />
                    <p className='font-inter font-medium text-[16px]'>Back to login</p>
                    </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default UpdatePassword
