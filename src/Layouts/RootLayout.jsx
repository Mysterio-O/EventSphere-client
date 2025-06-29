import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='max-w-[1600px] mx-auto'>
            <nav>
                <Navbar/>
            </nav>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default RootLayout;