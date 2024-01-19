 import React, { useState } from 'react'
 import {useForm} from 'react-hook-form'
 import { useEffect } from 'react';
 const ContactUsform = () => {
    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data)=>{

    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful])

   return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div>
            {/* First name  */}
            <div className='flex flex-col'>
                <label htmlFor='firstname'>First Name</label>
                <input type="text"
                       name='firstname'
                       id='firstname'
                       placeholder='Enter First Name' 
                       {...register("firstname",{required:true})}
                />
                {
                    errors.firstname && (
                        <span>Please Enter the first name </span>
                    )
                }
            </div>
            <div className='flex flex-col'>
                <label htmlFor='lasttname'>Last Name</label>
                <input type="text"
                       name='lasttname'
                       id='firstname'
                       placeholder='Enter lastt Name' 
                       {...register("lasttname")}
                />
            </div>

            <div>
                <label htmlFor="email">Email Address</label>
                <input type="email"
                       name='email'
                       id='email'
                       placeholder='Enter Email Address '
                       {...register("email",{required:true})} 
                />
                { 
                    errors.email && (
                        <span>
                            Please Enter Your Email Address
                        </span>
                    )
                }
            </div>
        </div>
    </form>
   )
 }
 
 export default ContactUsform
 