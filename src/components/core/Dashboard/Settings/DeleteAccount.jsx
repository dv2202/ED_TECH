import React from 'react'
import { FiTrash2 } from "react-icons/fi"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { deleteProfile } from '../../../../services/operations/SettingsAPI'
const DeleteAccount = () => {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleDelete(){
        try{
            dispatch(deleteProfile(token,navigate));
        }
        catch(error){
            console.log("Delete profile error " , error.message)
        }
    }

  return (
    <div className=' my-10 w-[792px] h-[182px] p-[24px] bg-pink-900 rounded-md border-[#691432] border-[1px] flex flex-row gap-[19px]'>
        <div className='w-[52px] h-[52px] bg-pink-700 rounded-full flex items-center justify-center  p-[14px]'>
            <div className='bg-pink-700 '>
                <FiTrash2 className='text-3xl text-pink-200' />
            </div>
        </div>
        <div className='w-[673px] h-[134px] pr-[120px] flex flex-col gap-2'>
                <h4 className='text-white text-inter text-[18px] font-medium'>Delete Account</h4>
                <div className='w-[573px] h-[68px] space-x-[2px] '>
                    <h5 className='h-[22px] font-medium text-pink-25 text-inter text-[14px] leading-6' >Would you like to delete account?</h5>
                    <p className='w-[553px] h-[44px] font-medium text-pink-25 text-[14px] leading-6'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                </div>
                <p className='h-[24px] font-medium text-pink-300 italic  text-[16px] leading-6 cursor-pointer' onClick={handleDelete}>I want to delete my account.</p>
        </div>
    </div>
  )
}

export default DeleteAccount
