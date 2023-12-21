import React from 'react'
import { useSelector } from 'react-redux'

const ForgotPassword = () => {
    const {loading} = useSelector((state)=> state.auth)
  return (
    <div>
      {/* {
        loading ? (
            <div>loading</div>
        ) : ()
      } */}
    </div>
  )
}

export default ForgotPassword
