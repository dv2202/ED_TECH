import React from 'react'
import "../../../../src/App.css";


const HighlighText = ({text}) => {
  return (
    <span className='font-bold gradient-text'>
        {" "}
        {text}
    </span>
  )
}

export default HighlighText
