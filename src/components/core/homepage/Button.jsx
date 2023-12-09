import React from 'react'
import { Link } from 'react-router-dom'
const Button = ({children ,active,linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center px-[24px] py-[12px] rounded-md font-medium  h-[48px] font-inter text-[16px] 
        ${active ? "bg-yellow-50 text-black custom-shadow2": "bg-richblack-800 custom-shadow1" } 
        hover:scale-95 transition-all duration-200`}>
            {children}
        </div>
    </Link>
  )
}

export default Button
