import React from 'react';

const HomeAboutMe = () => {
    return (
        <div className="2xl:container 2xl:mx-auto lg:px-20 md:px-6 py-0 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
                        About Me
                    </h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">
                        I think a lot of this comes down to your definition of
                        good. I’m good in the sense that I understand how to use
                        my camera, and my flashes, and how to use these things
                        to get the shot that I have visualised in my mind. I’m
                        reasonably good at developing photos in Lightroom, and
                        my Photoshop skills are slowly growing as well. I think
                        I’ve got a lot of the technical side of things down
                        quite well.
                    </p>
                </div>
                <div className="w-full lg:w-1/2 ">
                    <img
                        className="w-full h-full inset-0 object-cover object-center rounded-md"
                        src="https://images.unsplash.com/photo-1516832274795-90e87c623961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fGNhbWVyYSUyMG1hbnxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60"
                        alt="A group of People"
                    />
                </div>
            </div>

            <div className="flex flex-col justify-between gap-8 pt-12">
                <div className="w-full flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
                        My Best Client
                    </h1>
                </div>
                <div className="w-full">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img
                                className="md:block hidden"
                                src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png"
                                alt="Alexa featured Img"
                            />
                            <img
                                className="md:hidden block"
                                src="https://i.ibb.co/zHjXqg4/Rectangle-118.png"
                                alt="Alexa featured Img"
                            />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                                Alexa
                            </p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img
                                className="md:block hidden"
                                src="https://i.ibb.co/fGmxhVy/Rectangle-119.png"
                                alt="Olivia featured Img"
                            />
                            <img
                                className="md:hidden block"
                                src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png"
                                alt="Olivia featured Img"
                            />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                                Olivia
                            </p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img
                                className="md:block hidden"
                                src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png"
                                alt="Liam featued Img"
                            />
                            <img
                                className="md:hidden block"
                                src="https://i.ibb.co/C5MMBcs/Rectangle-120.png"
                                alt="Liam featued Img"
                            />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                                Liam
                            </p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img
                                className="md:block hidden"
                                src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
                                alt="Elijah featured img"
                            />
                            <img
                                className="md:hidden block"
                                src="https://i.ibb.co/ThZBWxH/Rectangle-121.png"
                                alt="Elijah featured img"
                            />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                                Elijah
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAboutMe;
