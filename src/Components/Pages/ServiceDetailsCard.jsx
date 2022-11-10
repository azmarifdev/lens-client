import React from 'react';

const ServiceDetailsCard = ({review}) => {
    return (
        <div className="container flex flex-col shadow-xl w-full max-w-lg p-6 mx-auto divide-y border-2 bg-gray-100 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
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
            </div>
            <div className="p-4 space-y-2 text-sm text-gray-600">
                <p>{review?.reviewText.slice(0, 200)}</p>
            </div>
        </div>
    );
};

export default ServiceDetailsCard;