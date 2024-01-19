import React from 'react'
import HighlightText from '../components/core/homepage/HighlighText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import ellipse from '../assets/Images/Ellipse 2.png'
import banner from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import "../App.css";
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
const About = () => {
  return (
    <div className='w-11/12'>
        {/* Section 1 */}
        <div>
            <section>
                <div>
                    <header className='text-white font-inter font-medium text-[36px]  text-center'>
                        Driving Innovation in Online Education for a <br/>
                        <HighlightText text={"Brighter Future"}/>
                    </header>
                    <p className='text-richblack-500'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    <div className='flex gap-x-3 items-center justify-center'>
                        <img src={BannerImage1} alt="" />
                        <img src={BannerImage2} alt="" />
                        <img src={BannerImage3} alt="" />
                    </div>
                </div>
            </section>

            {/* section 2 */}
            <div className='items-center justify-center flex w-[1440px] h-[336px] px-[90px] py-[120px]'>
                <Quote/>
            </div>

            {/* section 3 */}
            <div className='flex items-center justify-evenly space-x-10 mx-auto'>
                <div className='flex flex-col w-[486px] h-[372px] gap-[24px]'>
                    <h1 className='gradient-text4 text-[36px]'>Our Founding Story </h1>
                    <p className='text-inter text-[16px] font-normal leading-[24px] text-[#838894]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p className='text-inter text-[16px] font-normal leading-[24px] text-[#838894]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>
                <div className='w-[534px] h-[342px] p-[32px] relative z-0'>
                    <img src={ellipse} alt="ellipse" className='absolute top-[-90px] left-[-5rem] -z-10' />
                    <img src={banner} alt="" />
                </div>
                
            </div>

            <div className='flex flex-row gap-[10px]'>
                <div>
                    <h1 className='gradient-text2 text-[16px]'>Our Vision</h1>
                    <p className='text-white'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>
                <div>
                    <HighlightText text={"Our Mission"}/>
                    <p className='text-white'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>


            {/* section 4 */}

            <div>
                <Stats/>
            </div>

            {/* section 5 */}
            <section>
                <LearningGrid/>
            </section>


            <div>
                <ContactFormSection/>
            </div>
            
        </div>
    </div>
  )
}

export default About
