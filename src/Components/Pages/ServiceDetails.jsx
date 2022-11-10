import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useTitle from '../../Hooks/useTitleHooks';
import Loading from '../Others/Loading';
import ServiceDetailsCard from './ServiceDetailsCard';
import Lottie from 'lottie-react';
import review from '../../assets/review.json';

const ServiceDetails = () => {
    useTitle('Service Details');
    const [spinner, setSpinner] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { user } = useContext(AuthContext);
    const allService = useLoaderData();

    const { _id, name, image, price, details } = allService?.service;

    let time = new Date();
    let hour = time.getHours();
    if (hour > 12) {
        hour = hour - 12;
    }

    let minute = time.getMinutes();
    let date = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();

    const handleReview = (e) => {
        e.preventDefault();
        const form = e.target;
        const reviewText = form.review.value;

        const addReview = {
            reviewText: reviewText,
            serviceId: _id,
            image: user?.photoURL,
            email: user?.email,
            name: user?.displayName,
            date: `${date}/${month}/${year}`,
            time: `${hour}:${minute}`,
        };

        fetch('https://lens-server.vercel.app/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(addReview),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    form.reset();
                    toast.success('Review Added Successfully');
                    setRefresh(!refresh);
                } else {
                    toast.error(data.error);
                }
            });
    };

    useEffect(() => {
        setSpinner(true);
        fetch(`https://lens-server.vercel.app/reviews?reviewId=${_id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setReviews(data?.reviews);
                    setSpinner(false);
                } else {
                    toast.error('post not successfully');
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, [_id, refresh]);

    return (
        <>
            {spinner ? (
                <Loading />
            ) : (
                <div>
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="container px-5 py-16 mx-auto">
                            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                <img
                                    alt="ecommerce"
                                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                    src={image}
                                />
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                        {name}
                                    </h1>
                                    <p className="leading-relaxed mt-5">
                                        {details}
                                    </p>
                                    <div className="flex mt-3 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                                    <div className="flex">
                                        <span className="title-font font-medium text-2xl text-gray-900">
                                            Price: {price}$
                                        </span>
                                        <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 font-semibold rounded">
                                            Hire me
                                        </button>
                                        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="w-5 h-5"
                                                viewBox="0 0 24 24">
                                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div>
                        <div className="pb-4 mb-8 container border-b mx-auto border-gray-300">
                            <div>
                                <h4 className="text-3xl text-center font-bold leading-tight text-gray-800">
                                    Client Reviews
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid gap-5 mx-5 grid-cols-1 md:grid-cols-3">
                            {reviews?.map((review, index) => (
                                <ServiceDetailsCard
                                    review={review}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                    {user?.uid ? (
                        <>
                            <div>
                                <form
                                    onSubmit={handleReview}
                                    className="flex mx-4 mb-5 space-x-3">
                                    <div className="w-full max-w-2xl px-5 py-10 m-auto mt-16 bg-blue-600 rounded-lg shadow">
                                        <div className="mb-6 text-3xl font-semibold text-center text-white">
                                            Create Review
                                        </div>
                                        <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                                            <div className="col-span-2 lg:col-span-1">
                                                <div className=" relative ">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        defaultValue={
                                                            user?.displayName
                                                        }
                                                        readOnly
                                                        id="contact-form-name"
                                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                        placeholder="Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-2 lg:col-span-1">
                                                <div className=" relative ">
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        defaultValue={
                                                            user?.email
                                                        }
                                                        readOnly
                                                        id="contact-form-email"
                                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                        placeholder="email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <label
                                                    className="text-gray-700"
                                                    htmlFor="name">
                                                    <textarea
                                                        className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                        id="comment"
                                                        placeholder="Write your review"
                                                        name="review"
                                                        rows="5"
                                                        cols="40"></textarea>
                                                </label>
                                            </div>
                                            <div className="col-span-2 text-right">
                                                <button
                                                    type="submit"
                                                    className="py-2 px-4  bg-gray-900 hover:bg-gray-800 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none   rounded-lg ">
                                                    Add Review
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-gray-100 overflow-y-hidden">
                                <div className="mx-auto container py-12 px-4">
                                    <div className="w-full flex justify-center">
                                        <div className="w-full md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-500 to-indigo-700 md:px-8 px-5 py-4 xl:px-12">
                                            <div>
                                                <div className="flex flex-wrap items-center md:flex-row">
                                                    <div className="w-2/3 mx-auto md:pb-0 flex-col flex items-center justify-start md:pt-0 pt-4">
                                                        <div>
                                                            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl  text-white font-black leading-6 lg:leading-10 text-center">
                                                                I think your are
                                                                satisfied.
                                                                <br />
                                                                Please give me
                                                                review.
                                                            </h1>
                                                        </div>
                                                        <div className="w-full">
                                                            <Link to="/login">
                                                                <button
                                                                    aria-label="Join the community"
                                                                    className="mt-5 lg:mt-8 py-3 lg:py-4 px-4 lg:px-8 bg-white font-bold text-indigo-700    rounded-lg text-sm lg:text-lg xl:text-xl hover:bg-opacity-90  focus:ring-2
                                                                    focus:ring-offset-2 focus:ring-white focus:outline-none">
                                                                    Please Login
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="md:w-1/3 mx-auto w-2/3">
                                                        <div>
                                                            <Lottie
                                                                className=""
                                                                animationData={
                                                                    review
                                                                }
                                                                loop={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default ServiceDetails;
