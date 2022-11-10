import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useTitle from '../../Hooks/useTitleHooks';
import Loading from '../Others/Loading';
import HomeAboutMe from './HomeAboutMe';
import HomeCardItem from './HomeCardItem';
import HomeWhyBest from './HomeWhyBest';

const Home = () => {
    useTitle('Home');
    const [services, setServices] = useState([]);
    const [spinner, setSpinner] = useState(false);
    useEffect(() => {
        setSpinner(true);
        fetch('https://lens-server.vercel.app/service')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setServices(data.services);
                    setSpinner(false);
                } else {
                    toast.error(data.error);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, []);

    return (
        <>
            {spinner ? (
                <Loading />
            ) : (
                <div>
                    <div>
                        <div className="2xl:mx-auto 2xl:container md:px-20 px-4 md:pt-5 py-5">
                            <div className="relative rounded-md">
                                <img
                                    src="https://i.ibb.co/SBpL1cK/pexels-aleksandar-pasaric-325185-1.png"
                                    alt="city view"
                                    className="w-full h-full rounded-md  object-center object-fill absolute sm:block hidden"
                                />
                                <img
                                    src="https://i.ibb.co/LQpxBsc/mobile.png"
                                    alt="city view"
                                    className="w-full h-full rounded-md absolute object-center object-fill sm:hidden"
                                />
                                <div className="text-xl relative bg-gradient-to-r from-blue-700 to-transparent w-full h-full z-40 top-0 md:p-16 p-6 flex flex-col justify-between rounded-md ">
                                    <div>
                                        <h1 className="md:text-5xl text-3xl font-bold md:leading-10 leading-9 text-white sm:w-auto w-64">
                                            Capturing Life’s Priceless Moments.
                                        </h1>
                                        <p className="text-2xl font-semibold text-center text-white mt-5">
                                            In photography there is a reality so
                                            subtle that it becomes more real
                                            than reality. Exceptional images
                                            deserve an exceptional presentation.
                                        </p>
                                    </div>
                                    <div className="md:mt-12 mt-20">
                                        <button className="text-base font-semibold leading-4 text-indigo-700 bg-white hover:bg-gray-200 sm:w-auto w-full rounded p-4 focus:outline-none ">
                                            Hire me
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="text-gray-600 body-font">
                            <div className="container px-5 py-10 mx-auto">
                                <div className="flex flex-wrap -m-4">
                                    {services?.map((service, index) => (
                                        <HomeCardItem
                                            service={service}
                                            key={index}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="mb-8">
                                <Link to="/services">
                                    <button className="inline-block rounded border border-indigo-600 bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-transparent hover:text-indigo-600 active:text-indigo-500">
                                        Show all
                                    </button>
                                </Link>
                            </div>
                        </section>
                    </div>
                    <div>
                        <HomeWhyBest />
                    </div>
                    <div>{/* <HomeMyDetails/> */}</div>
                    <div>
                        <HomeAboutMe />
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
