import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useTitle from '../../Hooks/useTitleHooks';
import ReviewItem from './ReviewItem';
import Lottie from 'lottie-react';
import noData from '../../assets/noData.json';
import { Link } from 'react-router-dom';
import Loading from '../Others/Loading';

const MyReviews = () => {
    useTitle('My Reviews');
    const { user, logout } = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false);
    const [myReviews, setMyReviews] = useState([]);
    const reviews = myReviews?.reviews;

    const [spinner, setSpinner] = useState(false);
    useEffect(() => {
        if (!user?.email) return;
        setSpinner(true);
        fetch(`https://lens-server.vercel.app/myreview?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    logout();
                }
                return res.json();
            })
            .then((data) => {
                setMyReviews(data);
                setSpinner(false);
            });
    }, [user?.email, logout, refresh]);

    const handleDelete = (id) => {
        const proceed = window.confirm('Confirm to Delete?');
        if (proceed) {
            fetch(`https://lens-server.vercel.app/myreview/${id}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('Successfully Deleted');
                        setRefresh(!refresh);
                    }
                });
        }
    };

    return (
        <>
            {spinner ? (
                <Loading />
            ) : (
                <div>
                    <div>
                        {reviews?.length === 0 && (
                            <div>
                                <div className="flex justify-center mb-8">
                                    <div className="mt-5 h-1/2">
                                        <Lottie
                                            className="mx-auto"
                                            animationData={noData}
                                            loop={true}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Link
                                        to="/services"
                                        className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                                        href="/download">
                                        <span className="absolute inset-0 border border-[#EC4F9D] group-active:border-[#EC4F9D]"></span>
                                        <span className="block border border-[#EC4F9D] bg-[#EC4F9D] px-12 py-3 transition-transform active:[#EC4F9D] active:bg-[#EC4F9D] group-hover:-translate-x-1 group-hover:-translate-y-1">
                                            Give Review
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="grid gap-5 my-10 mx-5 grid-cols-1 relative md:grid-cols-3">
                        {reviews?.map((review, index) => (
                            <ReviewItem
                                review={review}
                                key={index}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default MyReviews;
