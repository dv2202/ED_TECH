import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../core/homepage/common/IconBtn"
import { updateProfile } from '../../../../services/operations/SettingsAPI'

const genders = ["Male", "Female","Other"]

const EditProfile = () => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async(data)=>{

        try{            
            dispatch(updateProfile(token,data,navigate));
        }
        catch(error){
            console.log("error in profile update - ", error.message)
        }
            

        
  }
  return (
    <div>
        <div className='w-[792px] h-[388px] my-10 rounded-md p-[24px] gap-[20px] flex flex-col bg-richblack-800 border-[1px] border-richblack-700 text-white'>
            <p className='w-[744px] h-[26px] text-white'> Profile Information </p>
            <form onSubmit={handleSubmit(submitProfileForm)} id='profileForm' > 
                <div className='w-[744px] h-[102px] gap-[24px] flex flex-row'>
                <div className="flex flex-col gap-2 w-[360px] h-[102px]">
                        <label htmlFor="firstName" className='text-inter font-medium text-[14px] leading-5 text-white w-[360px] h-[22px]'>First Name</label>
                        <input 
                            type="text"
                            name='firstName'
                            id='firstName'
                            placeholder='Enter First Name'
                            className=" p-[12px] w-[360px] h-[48px] rounded-md bg-richblack-600 contact-form-field"
                            {...register("firstName",{required:true})} 
                            defaultValue={user?.firstName}
                        />
                        {errors.firstName && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>Please enter your first name</span>
                        )}
                </div>
                <div className="flex flex-col gap-2 lg:w-[48%] w-[360px] h-[76px]">
                    <label htmlFor="lastName" className='text-inter font-medium text-[14px] w-[360px] h-[22px] leading-5 text-white'>Last Name</label>
                    <input 
                        type="text"
                        name='lastName'
                        id='lastName'
                        placeholder='Enter last Name'
                        className="w-[360px] h-[48px] p-[12px]  rounded-md bg-richblack-600 contact-form-field"
                        {...register("flatName",{required:true})} 
                        defaultValue={user?.lastName}
                    />
                    {errors.lastName && (
                        <span className='-mt-1 text-[12px] text-yellow-100'>Please enter your last name</span>
                    )}
                </div>
            </div>
            <div className='w-[744px] h-[76px] gap-[24px] flex flex-row'>
                <div className="flex flex-col gap-2 lg:w-[48%] w-[360px] h-[48px]">
                        <label htmlFor="dateOfBirth" className='text-inter font-medium text-[14px] leading-5 text-white'>Date of Birth</label>
                        <div >
                        <input 
                            type="date"
                            name='dateOfbirth'
                            id='dateOfBirth'
                            placeholder='Enter Your Date of Birth'
                            className="w-[360px] h-[48px] p-[12px]  rounded-md bg-richblack-600 contact-form-field"
                            {...register("dateOfBirth",{
                                required:{
                                    value:true,
                                    message:"Please Enter Your Date of Birth"
                                },
                                max:{
                                    value:new Date().toISOString().split("T")[0],
                                    message:"Date of birth cannot be in the future",
                                }
                            })}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                        />
                        {
                            errors.dateOfBirth && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>{errors.dateOfBirth.message}</span>
                            )
                        }
                        </div>
                </div>
                <div className="flex flex-col gap-2 lg:w-[48%] w-[360px] h-[48px]">
                    <label htmlFor="gender" className="text-inter font-medium text-[14px] leading-5 text-white">
                        Gender
                    </label>
                    <div className="flex gap-2 w-[360px] h-[48px] p-[12px]  rounded-md bg-richblack-600 contact-form-field">
                        {genders.map((ele, i) => (
                        <div key={i} className="flex items-center w-[104px] h-[24px] gap-3">
                            <input
                            type="radio"
                            id='gender'
                            name="gender"
                            value={ele}
                            className="w-[24px] h-[24px]  gap-3 rounded-full  text-yellow-50 border-[3px] appearance-none focus:ring-hidden checked:bg-yellow-50 checked:bg-fit"
                            {...register("gender", { required: true })}
                            defaultChecked={user?.additionalDetails?.gender === ele}
                            />
                            <label htmlFor='gender' className="text-white">{ele}</label>
                        </div>
                        ))}
                    </div>
                    {errors.gender && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                        Please select a gender.
                        </span>
                    )}
                </div>

            </div>

            <div className='w-[744px] h-[76px] gap-[24px] flex flex-row  mt-[26px]'>
                <div className="flex flex-col gap-2 lg:w-[48%] w-[360px] h-[76px]">
                    <label htmlFor="contactNumber" className='text-inter font-medium text-[14px] w-[360px] h-[22px] leading-5 text-white'>Phone Number</label>
                    <input 
                        type="tel"
                        name='contactNumber'
                        id='contactNumber'
                        placeholder='Enter Contact Number'
                        className=" p-[12px] w-[360px] h-[48px] rounded-md bg-richblack-600 contact-form-field"
                        {...register('contactNumber',{
                            required:{
                                value:true,
                                message:"Enter Contact number"
                            },
                            maxLength: { value: 12, message: "Invalid Contact Number" },
                            minLength: { value: 10, message: "Invalid Contact Number" },
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                     />
                     {
                        errors.contactNumber && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.contactNumber.message}
                            </span>
                        )
                     }
                </div>

                <div className="flex flex-col gap-2 lg:w-[48%] w-[360px] h-[76px]">
                    <label htmlFor="about" className='text-inter font-medium text-[14px] w-[360px] h-[22px] leading-5 text-white'>About</label>
                    <input 
                        type="text"
                        name='about'
                        id='about'
                        placeholder='Enter Something About you'
                        className=" p-[12px] w-[360px] h-[48px] rounded-md bg-richblack-600 contact-form-field"
                        {...register("about",{
                            required:false,
                            message:"Enter Something About you"
                        })}
                        defaultValue={user?.additionalDetails?.about} />
                        {
                            errors.about && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.about.message}
                                </span>
                            )
                        }
                </div>
            </div>  
            </form>
        </div>
        <div className='flex justify-end gap-2 w-[792px]' >
            <button
            onClick={()=>navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                Cancel
            </button>
            <button type="submit" text="save"  form='profileForm' className="flex items-center py-2 px-5 bg-yellow-50 cursor-pointer gap-x-2 rounded-md  font-semibold text-richblack-900 undefined">Save</button>
        </div>
    </div>
  )
}

export default EditProfile
