import React from 'react';
import ServiceNameId from './ServiceNameId';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ReviewItem = ({ review, handleDelete }) => {
    const navigate = useNavigate();
    const handleEdit = (id) => {
        navigate(`/reviewupdate/${id}`);
    };
    return (
        <div className="container flex shadow-xl flex-col w-full max-w-lg p-6 mx-auto divide-y border-2 bg-gray-100 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
            <div className="flex justify-between p-4">
                <div className="flex space-x-0">
                    <div>
                        <img
                            src={review?.image}
                            alt=""
                            className="object-cover w-12 h-12 rounded-full bg-gray-500"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">{review?.name}</h4>
                        <span className="text-xs text-gray-400">
                            {review?.date} - {review?.time}
                            <br />
                            {review?.email}
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-2 flex-col gap-y-2">
                    <div>
                        <MdDelete
                            size={30}
                            onClick={() => handleDelete(review?._id)}
                            className="text-blue-600 cursor-pointer hover:text-black"
                        />
                    </div>
                    <div>
                        <FaEdit
                            size={30}
                            onClick={() => handleEdit(review?._id)}
                            className="text-blue-600 cursor-pointer hover:text-black"
                        />
                    </div>
                </div>
            </div>
            <div>
                <ServiceNameId review={review} key={review?._id} />
            </div>
            <div className="p-4 space-y-2 text-sm text-gray-600">
                <p>
                    {review?.reviewText
                        ? review.reviewText.slice(0, 100) + '...'
                        : 'no review'}
                </p>
            </div>
        </div>
    );
};

export default ReviewItem;
