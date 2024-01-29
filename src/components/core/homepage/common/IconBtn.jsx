import React from 'react'

const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <div>
        <button disabled={disabled}
        onClick={onClick}
        className={`flex items-center py-2 px-5 bg-yellow-50 cursor-pointer gap-x-2 rounded-md font-semibold text-richblack-900 ${customClasses}`}
        type={type}>
            {
                children ? (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
                ) : (text)
            }
        </button>
    </div>
  )
}

export default IconBtn
