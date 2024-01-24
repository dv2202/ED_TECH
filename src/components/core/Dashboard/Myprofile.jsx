import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../homepage/common/IconBtn'

const Myprofile = () => {
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate();
  return (
    <div className='text-white'>
        <h1>
            My Profile
        </h1>

            {/* section 1 */}

        <div>
            <div>
                <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full onject-cover' />
                <div>
                    <p> {user?.firstName + " " + user?.lastName} </p>
                    <p> {user?.email}</p>
                </div>
                <IconBtn text="Edit"
                         onClick={()=>{
                            navigate("/dashboard/settings")
                }}/>

            </div>
        </div>
    </div>
  )
}

export default Myprofile
