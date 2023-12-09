import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/core/homepage/HighlighText'
import CTAButton from '../components/core/homepage/Button'
import "../App.css"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/homepage/CodeBlocks'
import TimelineSection from '../components/core/homepage/TimelineSection'
import LearningLanguageSection from '../components/core/homepage/LearningLanguageSection'
import InstructorSection from '../components/core/homepage/InstructorSection'

import ExploreMore from '../components/core/homepage/ExploreMore'
const Home = () => {
  return (
    <div>

      {/* Section 1  */}
       <div className='relative mx-auto flex flex-col  items-center text-white justify-between gap-[38px] w-11/12'>

            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-medium  text-richblack-200 transition-all duration-200 hover:scale-95 w-fit custom-shadow1'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]  transition-all duration-200 group-hover:bg-richblack-900 ' >
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='font-inter text-[36px] items-center font-[400] max-w-[913px]'>
              Empower Your Future With 
              <HighlightText text={"Coding Skills"}></HighlightText>
            </div>

            <div className='flex font-inter text-[16px] text-center items-center justify-center w-[913px] max-w-[913px] text-richblack-500 font-medium leading-[24px] h-[48px] '>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 max-w-[913px]'>
              <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>

              <CTAButton active={false} linkto={"/login"}>Book a demo</CTAButton>
            </div>

            <div className=' shadow-blue-200 mb-[200px] flex items-center justify-center bannerShadow'>
              <video muted loop autoPlay className='max-w-[1038px] h-[515px] '>
                <source src={Banner} type="video/mp4"/>
              </video>
            </div>
        {/*code section one */}

             <div>
              <CodeBlocks  
                  position={"lg:flex-row"}
                  heading={
                    <div className='text-[36px] font-semibold w-[486px] leading-[44px] font-inter'>
                      Unlock Your 
                      <HighlightText text={"Coding Potential "}></HighlightText>
                      with our online courses.
                    </div>
                  } 
                  subheading={
                    <div className='font-inter font-normal text-[16px] w-[486px]'>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</div>
                  }
                  ctabtn1={{
                    btnText:"Try it Yourself",
                    linkto:"/signup",
                    active: true,
                  }}
                  ctabtn2={{
                    active: false,
                    btnText:"Learn More",
                    linkto:"/login",
                  }}
                  codeBlock={
                    `<!DOCTYPE html>
                    <html>
                    <head><title>Example</title><linkrel="stylesheet"href="styles.css">
                    </head>
                    <body>
                    <h1><ahref="/">Header</a>
                    </h1>
                    <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
                    </nav>`
                  }
              />
            </div> 

            <div>
              <CodeBlocks  
                  position={"lg:flex-row-reverse"}
                  heading={
                    <div className='text-[36px] font-semibold w-[486px] leading-[44px] font-inter'>
                      Unlock Your 
                      <HighlightText text={"Coding Potential "}></HighlightText>
                      with our online courses.
                    </div>
                  } 
                  subheading={
                    <div className='font-inter font-normal text-[16px] w-[486px]'>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</div>
                  }
                  ctabtn1={{
                    btnText:"Try it Yourself",
                    linkto:"/signup",
                    active: true,
                  }}
                  ctabtn2={{
                    active: false,
                    btnText:"Learn More",
                    linkto:"/login",
                  }}
                  codeBlock={
                    `<!DOCTYPE html>
                    <html>
                    <head><title>Example</title><linkrel="stylesheet"href="styles.css">
                    </head>
                    <body>
                    <h1><ahref="/">Header</a>
                    </h1>
                    <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
                    </nav>`
                  }
              />
            </div> 


        </div>

        <ExploreMore/>
      



      {/* Section 2  */}
      <div className='bg-pure-greys-5  text-richblack-700  '>

        <div className='homepage_bg h-[310px]'>
                  <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>
                        <div className='h-[150px]'></div>
                        <div className='flex flex-row gap-7 text-white'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                      Explore Full Catalog 
                                      <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                  <div>
                                    Learn More
                                  </div>
                            </CTAButton>
                        </div>
                  </div>
        </div>


        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
            <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                  <div className='text-[36px] font-semibold w-[45%] font-inter leading-[44px]'>
                    Get the Skills you need for a 
                    <HighlightText text={"job that is in demand"}></HighlightText>
                  </div>
                  <div className='flex flex-col gap-10 w-[40%] items-start'>
                  <div className='text-[16px]'>
                  The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                  </div>
                  <CTAButton active={true} linkto={"/signup"}>
                    <div>
                      Learn More
                    </div>
                  </CTAButton>

            </div>
          </div>

          <TimelineSection/>

          <LearningLanguageSection/>
          
        </div>
      </div>

      {/* Section 3  */}
      <div className='w-[11/12] max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white mx-auto'>
               <InstructorSection/> 
               <h2 className='text-center text-4xl font-medium mt-10 font-inter pb-[100px]'>Reviews From Other Learners </h2>  
      </div>

      {/* Footer  */}

    </div>
  )
}

export default Home

