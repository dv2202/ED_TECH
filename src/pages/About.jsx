import React from 'react';
import HighlightText from '../components/core/homepage/HighlighText';
import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import Quote from '../components/core/AboutPage/Quote';
import ellipse from '../assets/Images/Ellipse 2.png';
import banner from '../assets/Images/FoundingStory.png';
import Stats from '../components/core/AboutPage/Stats';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import "../App.css";
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import Footer from '../components/core/homepage/common/Footer';
import HighlighText from '../components/core/homepage/HighlighText';

const About = () => {
  return (
    <div className='mx-auto mt-[100px] text-white  '>

      {/* Section 1 */}
      <section>
          <p className='w-[100%] text-center text-richblack-400'>About us </p>
          <div className="w-[100%] h-[258px] flex items-center justify-center mx-auto">
          <header className='w-[913px] h-[173px] py-[52px] flex flex-col gap-[16px] items-center justify-center'>
            <h1 className=' w-[809px] text-inter text-[36px] leading-10 font-medium text-center'>
            Driving Innovation in Online Education for a 
            <HighlightText text={"Brighter Future"}/>
            </h1>
            <p className='w-[809px] text-inter font-medium text-[16px] leading-6 text-richblack-400 text-center ' >Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
          </header>
        </div>
          <div className='flex gap-x-3 mx-auto items-center justify-center '>
            <img src={BannerImage1} alt='' />
            <img src={BannerImage2} alt='' />
            <img src={BannerImage3} alt='' />
          </div>

      </section>

      {/* Section 2 */}
      <section>
        <div className='w-[100%] justify-center items-center flex px-[90px] pt-[120px]'>
          <Quote/>
        </div>
      </section>

      {/* Section 3 */}
      <section>
        <div className='flex flex-col  mx-auto'>
          {/* Founding story wala div */}
          <div className='flex flex-row items-center gap-[98px] px-[90px] py-[120px] justify-center'>
            {/* Founding story left box */}
            <div className=' flex flex-col  w-[486px] h-[372px]'>
              <h1 className='gradient-text3 text-inter font-medium text-[36px] leading-10'>Our Founding Story</h1>
              <div className='w-[100%] h-[304px] gap-[12px] flex flex-col mt-[19px]'>
              <p className='text-inter fomt-medium text-[16px] leading-6 text-richblack-400'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
              <p className='text-inter fomt-medium text-[16px] leading-6 text-richblack-400'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p></div>
            </div>
            {/* Founding story right box */}
            <div className='w-[470px] h-[278px] p-[8px] items-center flex justify-center'>
              <img src={banner} alt=''/>
            </div>
          </div>

          {/* Vision and mission wala parent div */}
          <div className='flex flex-row w-[100%] h-[416px] px-[90px] py-[120px] gap-[98px] justify-center'>
            {/* Left box */}
            <div>
              <h1 className='w-[486px] h-[44px] gradient-text2 text-inter text-[36px] font-medium leading-10'>Our Vision</h1>
              <p className='w-[486px] h-[144px] text-inter font-normal text-[16px] leading-6'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>

            {/* Right box */}
            <div>
              <h1 className='w-[486px] h-[44px] text-inter gradient-text text-[36px] font-medium leading-10'>
                Our Mission
              </h1>
              <p className='w-[486px] h-[144px] text-inter font-normal text-[16px] leading-6'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}

        <Stats/> 

       

      {/* Section 5 */}
      <section className='mx-auto flex flex-col items-center justify-between gap-5  w-[100%] px-[90px] py-[120px]'>
        <LearningGrid />
      </section>

      <section className='mx-auto flex flex-col items-center justify-between gap-5 mb-[140px] '>
        <ContactFormSection />
      </section>

      <section>
        <div>
          Reviews from other learners
          {/* <ReviewSlider /> */}
        </div>
      </section>

      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default About;
