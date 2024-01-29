import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../../services/operations/SettingsAPI';
import { useState } from 'react';
import IconBtn from "../../homepage/common/IconBtn"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const UpdatePassword = () => {

    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm();
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const [showOldPassword, setShowOldPassword] = useState(true)
    const [showNewPassword, setShowNewPassword] = useState(true)

    const submitPasswordForm = async(data)=>{
        try{
            await changePassword(token,data);
        }
        catch(error){
            console.log("error message in changing password -> ",error.message)
        }
    }
  return (
    <>
        <form onSubmit={handleSubmit(submitPasswordForm)} className='text-white'>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] w-[792px] border-richblack-700 bg-richblack-800 p-8 ">
                <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="relative flex flex-col gap-2 ">
                        <label htmlFor="oldPassword" className='text-inter font-medium text-[14px] leading-5 text-white w-[360px] h-[22px]'>Current Password</label>
                        <div className='flex flex-row items-center '>
                        <input
                            type={!showOldPassword ? "text" : "password"} 
                            name="oldPassword"
                            id="oldPassword" 
                            placeholder='Enter your current password'
                            className=" p-[12px] w-[360px] h-[48px] rounded-md bg-richblack-600 contact-form-field"
                            {...register("oldPassword", { required: true })}
                        />
                        <span
                            onClick={() => setShowOldPassword((prev) => !prev)}
                            className="absolute right-3 top-[43px] z-[10] cursor-pointer"
                        >
                            {showOldPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        </div>
                        {errors.oldPassword && (
                            <span className="-mt-1 text-[12px] text-pink-500">
                            Please enter your Current Password.
                            </span>
                        )}
                    </div>
                    <div className="relative flex flex-col gap-2 ">
                        <label htmlFor="newPassword" className='text-inter font-medium text-[14px] leading-5 text-white w-[360px] h-[22px]'>New Password</label>
                        <div className='flex flex-row items-center '>
                        <input
                            type={!showNewPassword ? "text" : "password"} 
                            name="newPassword"
                            id="newPassword" 
                            placeholder='Enter your new password'
                            className=" p-[12px]  w-[360px] h-[48px] rounded-md bg-richblack-600 contact-form-field"
                            {...register("newPassword", { required: true })}
                        />
                        <span
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 top-[43px] z-[10] cursor-pointer"
                        >
                            {showNewPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        </div>
                        {errors.oldPassword && (
                            <span className="-mt-1 text-[12px] text-pink-500">
                            Please enter your new Password.
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2 w-[792px]">
                <button
                    onClick={() => {
                    navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <button type="submit"  className="flex items-center py-2 px-5 bg-yellow-50 cursor-pointer gap-x-2 rounded-md  font-semibold text-richblack-900 undefined">Update</button>
            </div>
        </form>
    </>
  )
}

export default UpdatePassword
