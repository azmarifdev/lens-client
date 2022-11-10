import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom';
import useTitle from '../../Hooks/useTitleHooks';
import Loading from '../Others/Loading';
const ReviewUpdate = () => {
    const [spinner, setSpinner] = useState(false);
    useTitle('Review Update');
    const { id } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState({});
    useEffect(() => {
        setSpinner(true);
        fetch(`https://lens-server.vercel.app/reviewupdate/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setReview(data.review);
                setSpinner(false);
            });
    }, [id]);

    // console.log(review);
    const handleSubmit = (e) => {
        e.preventDefault();
        const update = {
            reviewText: e.target.review.value,
        };
        fetch(`https://lens-server.vercel.app/myreview/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(update),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    navigate('../myreviews');

                    toast.success('Review updeted');
                } else {
                    toast.error(data.error);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };
    return (
        <div>
            {spinner ? (
                <Loading />
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full mx-auto mb-5 space-x-3">
                    <div className="w-full max-w-2xl px-5 py-10 m-auto mt-16 bg-blue-600 rounded-lg shadow">
                        <div className="mb-6 text-3xl font-semibold text-center text-white">
                            Update Review form
                        </div>
                        <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                            <div className="col-span-2">
                                <label className="text-gray-700" htmlFor="name">
                                    <textarea
                                        className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        id="comment"
                                        defaultValue={review?.reviewText}
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
                                    Update Now
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ReviewUpdate;
