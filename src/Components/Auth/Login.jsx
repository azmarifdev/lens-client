import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { FaGithubSquare } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Others/Loading';
import useTitle from '../../Hooks/useTitleHooks';

const Login = () => {
    useTitle('Login');
    const { login, handleGoogle, handleGitHub } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 500);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((userCredential) => {
                toast.success('Successfully Login!');
                const user = userCredential.user;
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
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage.slice(22, 36));
                setError(errorMessage.slice(22, 36));
                // console.log(errorMessage);
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

    return (
        <>
            {spinner ? (
                <Loading />
            ) : (
                <div className="flex flex-col mx-auto my-10 max-w-md px-4 py-8 bg-blue-600 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
                    <div className="self-center mb-6 text-xl font-semibold text-gray-600 sm:text-2xl dark:text-white">
                        Login To Your Account
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
                        <form onSubmit={handleLogin} autoComplete="off">
                            <div className="flex flex-col mb-2">
                                <div className="flex relative ">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg
                                            width="15"
                                            height="15"
                                            fill="currentColor"
                                            viewBox="0 0 1792 1792"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        id="sign-in-email"
                                        name="email"
                                        required
                                        className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <div className="flex relative ">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg
                                            width="15"
                                            height="15"
                                            fill="currentColor"
                                            viewBox="0 0 1792 1792"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                                        </svg>
                                    </span>
                                    <input
                                        type="password"
                                        id="sign-in-email"
                                        name="password"
                                        required
                                        className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                                        placeholder="Your password"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mb-6 -mt-4">
                                <div className="flex ml-auto">
                                    <span className="inline-flex text-xs font-thin text-white sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white">
                                        {error}
                                    </span>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <button
                                    type="submit"
                                    className="py-2 px-4  bg-purple-600 hover:bg-purple-900 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <Link
                            to="/signup"
                            className="inline-flex items-center font-thin text-center text-white hover:text-white">
                            <span className="ml-2">
                                You don't have an account? Sign Up
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
