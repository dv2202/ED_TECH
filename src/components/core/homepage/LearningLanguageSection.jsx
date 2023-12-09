import React from 'react'
import HighlighText from './HighlighText'
import knowyourprogress from '../../../assets/Images/Know_your_progress.png'
import comparewithothers from '../../../assets/Images/Compare_with_others.png'
import planyourlessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from '../homepage/Button'
const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
        <div className='w-[11/12] max-w-[1260px] items-center justify-between flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
                <div className='text-[35px] font-[400] text-center  font-inter w-[760px] '>
                    Your Swiss Knife For 
                    <HighlighText text={"learning any language"}/>
                </div>
                <div className='text-center text-richblack-600 mx-auto text-[18px] w-[760px]'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>
            <div className='flex flex-row items-center justify-center mt-5 w-[68.906rem]'>
                <img src={knowyourprogress}  className='object-contain -mr-32' /> 
                <img src={comparewithothers} className='object-contain '/> 
                <img src={planyourlessons}  className='object-contain -ml-36'/> 
            </div>
            <div className='mb-[100px]'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection
