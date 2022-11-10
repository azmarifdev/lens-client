import React from 'react';
import Lottie from 'lottie-react';
import errorpage from '../../assets/errorpage.json';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <Link to='/'>
                <div className="grid h-screen place-content-center bg-white dark:bg-gray-900">
                    <div className="flex flex-col relative">
                        <div>
                            <Lottie className="" animationData={errorpage} loop={true} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ErrorPage;