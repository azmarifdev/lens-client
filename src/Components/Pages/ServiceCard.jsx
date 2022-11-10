import React from 'react';
import { Link } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
const ServiceCard = ({ service }) => {
    return (
        <div className="p-4 md:w-1/3">
            <div className="h-full border-2 bg-gray-100 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
                <PhotoProvider>
                    <PhotoView src={service?.image}>
                        <img
                            className="lg:h-48 md:h-36 w-full object-cover object-center"
                            src={service?.image}
                            alt=""
                        />
                    </PhotoView>
                </PhotoProvider>

                <div className="p-6">
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {service?.name}
                    </h1>
                    <p className="leading-relaxed mb-3">
                        {service?.details
                            ? service.details.slice(0, 100) + '...'
                            : 'no data'}
                    </p>
                    <div className="flex justify-between items-center flex-wrap ">
                        <div>
                            <Link to={`/servicedetails/${service?._id}`}>
                                <button
                                    className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white active:bg-indigo-500"
                                    href="/download">
                                    <span className="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </span>

                                    <span className="text-sm font-medium transition-all group-hover:mr-4">
                                        Details
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg ">
                                Price: {service?.price}$
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
