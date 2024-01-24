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
