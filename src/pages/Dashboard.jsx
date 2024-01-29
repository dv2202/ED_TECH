import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
const Dashboard = () => {
    const{loading:authLoading} = useSelector((state) => state.auth);
    const{loading:profileLoading} = useSelector((state)=> state.profile);

    if(profileLoading||authLoading){
        return(
            <div className='text-white'>Loading...</div>
        )
    }


  return (
    <div className='relative flex h-[100%]'>
        <Sidebar/>
        <div className='h-[100%] '>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
