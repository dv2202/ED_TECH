import React from 'react'
import HighlighText from '../homepage/HighlighText'
import "../../../../src/App.css";

const Quote = () => {
  return (
    <div className='w-[1200px] h-[156px]'>
      <p className='text-[#AFB2BF] text-[32px] font-medium text-inter items-center text-center leading-tight tracking-tight'>" We are passionate about revolutionizing the way we learn. Our innovative platform <HighlighText text={'combines technology'}/>,<span className='gradient-text2'> expertise</span>, and community to create an <span className='gradient-text3'>unparalleled educational experience.</span>"</p>
    </div>
  )
}

export default Quote
