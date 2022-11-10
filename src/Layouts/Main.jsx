import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Components/Share/Footer';
import Navbar from '../Components/Share/Navbar';

const Main = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: 0 });
    }, [pathname]);
    return (
        <div>
            <Navbar />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
