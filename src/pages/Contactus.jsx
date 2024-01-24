import React from 'react'
import { IoMdChatbubbles } from "react-icons/io";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import ContactUsCom from '../components/ContactPage/ContactUsCom';
import Footer from '../components/core/homepage/common/Footer';
const Contactus = () => {
  return (
    <>
        <div className='px-[90px] py-[120px] flex flex-row gap-[52px]' >
            <div className='w-[450px] h-[390px] bg-richblack-800 rounded-md p-[24px] flex flex-col'>
                <div className='p-[24px] rounded-lg flex flex-col'>
                    <div className='flex flex-row p-[12px] gap-2 w-[402px] h-[98px] '>
                        <IoMdChatbubbles  className='text-richblack-500'/>
                        <div className='flex flex-col gap-[2px] h-[74px] w-[345px]'>
                            <h3 className='text-white font-medium text-inter text-[18px] leading-6'>Chat with us</h3>
                            <p className='text-[14px] text-richblack-500 text-inter font-normal'>Our friendly team is here to help.</p>
                            <p className='text-[14px] text-richblack-500 text-inter font-normal'>@mail address</p>
                        </div>
                    </div>
                    <div className='flex flex-row p-[12px] gap-2 w-[402px] h-[98px]'>
                        <FaEarthAmericas  className='text-richblack-500'/>
                        <div className='flex flex-col gap-[2px] h-[74px] w-[345px]'>
                            <h3 className='text-white font-medium text-inter text-[18px] leading-6'>Visit us</h3>
                            <p className='text-[14px] text-richblack-500 text-inter font-normal'>Come and say hello at our office HQ.</p>
                            <p className='text-[14px] text-richblack-500 text-inter font-normal'>Here is the location/ address</p>
                        </div>
                    </div>
                    <div className='flex flex-row p-[12px] gap-2 w-[402px] h-[98px]'>
                        <IoCall  className='text-richblack-500'/>
                        <div className='flex flex-col gap-[2px] h-[74px] w-[345px]'>
                            <h3 className='text-white font-medium text-inter text-[18px] leading-6'>Call us</h3>
                            <p className='text-[14px] text-richblack-500 text-inter font-normal'>Mon - Fri From 8am to 5pm</p>
                            <p className='text-[14px] text-richblack-500 text-inter font-normal'>+123 456 7890</p>
                        </div>
                    </div>
                </div>

            </div>
                    {/* Form  */}

                <div className='w-[698px]  rounded-xl p-[52px] gap-[32px] flex flex-col border-richblack-500  border '>
                    <div className='w-[594px] h-[124px] flex flex-col '>
                        <h1 className='w-[594px] h-[88px] text-inter text-[36px] leading-10 font-medium text-white'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                        <p className='w-[594px] h-[24px] text-richblack-500 text-[16px] leading-6'>Tall us more about yourself and what you’re got in mind.</p>
                    </div>
                    <div className='w-[594] h-[539px]'>
                        <ContactUsCom/>
                    </div>
                </div>
            
        </div>
        <Footer/>
    </>
  )
}

export default Contactus
