import React, { useContext } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Loader from '../loaders/Loader';

const RootLayout = () => {

    const { loading } = useContext(AuthContext);

    return (
        <>
            {
                loading ? <Loader />
                    : <div className='max-w-[1600px] mx-auto'>
                        <nav>
                            <Navbar />
                        </nav>
                        <div>
                            <Outlet />
                        </div>
                    </div>
            }
        </>
    );
};

export default RootLayout;