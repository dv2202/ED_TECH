import React from 'react'
import CTAButton from "../homepage/Button"
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'


const CodeBlocks = ({position , heading, subheading , ctabtn1 , ctabtn2 ,codeBlock, backgroundGradient , codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-[98px] w-[1440px] h-[522px] px-[90px]`}>
       {/* {section 1 }  */}
       <div className='w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
                <div className='flex gap-2 items-center '>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>  
                    {ctabtn2.btnText}
            </CTAButton>
            </div>
       </div>



        {/* {section 2} */}



        <div className='h-[342px] flex flex-row text-[10px] w-[534px] lg:w-[500px] p-[32px] codeBlockElement'>
        {/* {bg gradient} */}
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold py-[4px]'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            </div>

            
            <div className={`flex flex-col w-[90%] font-bold font-mono ${codeColor} `}>
                <TypeAnimation
                sequence= {[codeBlock,2000," "]}
                repeat = {Infinity}
                style={{
                    whiteSpace:"pre-line",
                    display:"block",
                    overflow:"hidden",
                }}  
                omitDeletionAnimation = {true}
            />        
            </div>
        </div>

    </div>

  )
}

export default CodeBlocks
