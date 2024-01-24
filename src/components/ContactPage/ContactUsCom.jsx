import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"
import { FaAngleDown } from "react-icons/fa";
import Select from 'react-select';
const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();


    const defaultCountry = CountryCode.find(element => element.country === 'India' || element.code === '+91');

    const submitContactForm = async(data) => {
        console.log("Logging Data" , data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption)
      ;
    };
    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

    <div className='flex flex-col gap-10 w-[100%] h-[100%] '>

            <div className='flex gap-5 w-[536px] h-[76px] flex-row'>
                {/* firstName */}
                <div className='flex flex-col gap-[2px]'>
                    <label htmlFor='firstname' className='text-inter text-[14px] leading-6 font-thin text-white'>First Name</label>
                    <input  
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        autoComplete='given-name'
                        className="w-[258px] h-[48px] p-[12px]  rounded-md bg-richblack-800 contact-form-field"
                        {...register("firstname", {required:true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter Your name
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col'>
                    <label htmlFor='lastname' className='text-white'>Last Name</label>
                    <input  
                        type='text'
                        name='lastname'
                        id='lastname'
                        autoComplete='family-name'
                        className="w-[258px] h-[48px] p-[12px]  rounded-md bg-richblack-800 contact-form-field"
                        placeholder='Enter Last name'
                        {...register("lastname")}
                    />
                    
                </div>

            </div>


            {/* email */}
            <div className='flex flex-col'>
                <label htmlFor='email' className='text-inter text-[14px] leading-6 font-thin text-white'>Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    autoComplete='email'
                    className="w-[536px] h-[48px] p-[12px] rounded-md bg-richblack-800 contact-form-field"
                    placeholder='Enter email Address'
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* phoneNo */}
            <div className='flex flex-col w-[536px]'>
                    <label htmlFor='phonenumber' className='text-inter text-[14px] leading-6 font-thin text-white'>Phone Number</label>
                    <div className='flex flex-row gap-2'>
                    {/* dropdown */}
                    <select name='countrycode'
                            id='countrycode'
                            defaultValue={defaultCountry ? defaultCountry.code : ''}
                            className='w-[81px] h-[48px] p-[12px] rounded-md bg-richblack-800 appearance-none text-center contact-form-field text-richblack-300' 
                            {...register('countrycode',{required:true})}
                    >
                            {
                                CountryCode.map((element,index)=>{
                                    return(
                                        <option key={index}>
                                                {element.code} 
                                        </option>
                                    )
                                })
                            }
                    </select>
                    <input
                        type='text'
                        name='phonenumber'
                        id='phonenumber'
                        placeholder='12345 67890'
                        autoComplete='tel-national'
                        className="w-[calc(100%-90px)] h-[48px] p-[12px] rounded-md bg-richblack-800 contact-form-field appearance-none"
                        {...register("phoneNo", {
                            required: { value: true, message: "Please enter Phone Number" },
                            maxLength: { value: 10, message: "Invalid Phone Number" },
                            minLength: { value: 8, message: "Invalid Phone Number" }
                        })}
                    />
                    </div>
            </div>
                    



            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor='message' className='text-inter text-[14px] leading-6 font-thin text-white'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    autoComplete='off'
                    className="w-[536px] h-[123px] rounded-md p-[12px] gap-[12px] bg-richblack-800"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span>
                            PLease enter your message.
                        </span>
                    )
                }
            </div>

    </div>
                    
        <button type='submit'
            className='rounded-md bg-yellow-50 text-center px-12 text-[16px] font-medium text-black h-[48px] w-[536px] mt-[20px]'>
                    Send Message
        </button>

    </form>
  )
}

export default ContactUsForm
