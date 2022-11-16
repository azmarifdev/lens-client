import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGithubSquare } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Loading from '../Others/Loading';
import useTitle from '../../Hooks/useTitleHooks';

const SignUp = () => {
    useTitle('Sign Up');
    const { createUser, updateInfo, handleGitHub, handleGoogle } =
        useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoURL = form.photoURL.value;
        // console.log(name, email, password, photoURL);
        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                updateInfo(name, photoURL)
                    .then(() => {})
                    .catch((error) => {});
                const currentUser = {
                    email: user.email,
                };
                fetch('https://lens-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(currentUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        localStorage.setItem('token', data.token);
                        navigate(from, { replace: true });
                    });
                toast.success('Successfully Sign Up!');
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage.slice(22, 36));
                setError(errorMessage.slice(22, 36));
            });
    };

    const handleGoogleLogin = () => {
        handleGoogle()
            .then((result) => {
                toast.success('successfully login');
                const currentUser = {
                    email: result.user.email,
                };
                fetch('https://lens-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(currentUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        localStorage.setItem('token', data.token);
                        navigate(from, { replace: true });
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage.slice(22, 36));
                setError(errorMessage.slice(22, 36));
            });
    };
    const handleGitHubLogin = () => {
        handleGitHub()
            .then((result) => {
                toast.success('successfully login');
                const currentUser = {
                    email: result.user.email,
                };
                fetch('https://lens-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(currentUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        localStorage.setItem('token', data.token);
                        navigate(from, { replace: true });
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage.slice(22, 36));
                setError(errorMessage.slice(22, 36));
            });
    };
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 500);
    }, []);
    return (
        <>
            {spinner ? (
                <Loading />
            ) : (
                <div className="flex flex-col mx-auto my-10 max-w-md px-4 py-8 bg-blue-600 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
                    <div className="self-center mb-6 text-xl font-semibold text-gray-600 sm:text-2xl dark:text-white">
                        Sign Up
                    </div>
                    <div className="flex gap-4 item-center">
                        <button
                            onClick={handleGitHubLogin}
                            type="button"
                            className="py-2 px-4 flex justify-center items-center  bg-gray-800 hover:bg-gray-900 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            <FaGithubSquare className="mx-2" />
                            GitHub
                        </button>
                        <button
                            onClick={handleGoogleLogin}
                            type="button"
                            className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            <svg
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="mr-2"
                                viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                            </svg>
                            Google
                        </button>
                    </div>
                    <div className="mt-8">
                        <form onSubmit={handleSignUp} autoComplete="off">
                            <div className="flex flex-col mb-2">
                                <div className="flex relative ">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col mb-2">
                                <div className="flex relative ">
                                    <input
                                        type="text"
                                        id="sign-in-email"
                                        name="email"
                                        required
                                        className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-2">
                                <div className="flex relative ">
                                    <input
                                        type="password"
                                        id="sign-in-email"
                                        name="password"
                                        required
                                        className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="Your password"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <div className="flex relative ">
                                    <input
                                        type="text"
                                        id="photoURL"
                                        required
                                        name="photoURL"
                                        className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="Your photo URL"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mb-6 -mt-4">
                                <div className="flex ml-auto">
                                    <Link
                                        to="/"
                                        className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white">
                                        {error}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <button
                                    type="submit"
                                    className="py-2 px-4  bg-purple-600 hover:bg-purple-900 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <Link
                            to="/login"
                            className="inline-flex items-center font-thin text-center text-white">
                            <span className="ml-2">
                                You have already an account? Login
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignUp;
