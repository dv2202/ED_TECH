import React from 'react'
import instructor from '../../../assets/Images/Instructor.png'
import HighlighText from './HighlighText'
import {FaArrowRight} from "react-icons/fa"
import CTAButton from '../homepage/Button'
const InstructorSection = () => {
  return (
    <div className='h-[725px] px-[5.625rem] py-[7.5rem] flex flex-row items-center justify-between gap-[98px]'>
        <div className='w-[50%] instructor-shadow'>
            <img src={instructor} className='object-contain '/>
        </div>
        <div className='w-[50%] flex flex-col gap-[12px]'>
            <div className='font-inter text-[36px] leading-9'>
                <p>Become an</p>
                <HighlighText text={"instructor"} />
            </div>
            <div className='font-inter text-richblack-500 text-[16px] font-medium '>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>
            <div className='pt-[52px] w-fit'>
            <CTAButton active={true} linto={"signup"}>
                    <div className='flex flex-row items-center gap-2 '>
                        Start Teaching Today <FaArrowRight/>
                    </div>
            </CTAButton>
            </div>
            
        </div>
        
    </div>
  )
}

export default InstructorSection
