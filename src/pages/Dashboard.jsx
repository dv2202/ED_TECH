import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return <div className='text-white'>Loading...</div>;
    }

    return (
        <div className='relative flex h-[100vh]'>
            <Sidebar />

            <div className='flex-1 h-[100vh] overflow-y-auto bg-gray-900'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10 min-h-screen'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
