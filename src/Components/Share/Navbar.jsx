import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/lens.png';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout()
            .then(() => {})
            .catch((error) => {});
    };
    return (
        <div className="bg-blue-600 sticky w-full shadow-2xl top-0 h-20 z-50">
            <div className="navbar container">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost lg:hidden text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <div className="mx-auto">
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-5 p-2 shadow absolute bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to="/">HOME</Link>
                                </li>
                                <li>
                                    <Link to="/services">SERVICES</Link>
                                </li>
                                {user?.uid && (
                                    <>
                                        <li>
                                            <Link to="/myreviews">
                                                MY REVIEWS
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/addservices">
                                                ADD SERVICES
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <Link to="/blog">BLOG</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to="/" className="md:ml-14">
                        <img className="w-16" src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex text-white">
                    <ul className="menu menu-horizontal gap-10 p-0">
                        <li>
                            <Link to="/">HOME</Link>
                        </li>
                        <li>
                            <Link to="/services">SERVICES</Link>
                        </li>
                        {user?.uid && (
                            <>
                                <li>
                                    <Link to="/myreviews">MY REVIEWS</Link>
                                </li>

                                <li>
                                    <Link to="/addservices">ADD SERVICES</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to="/blog">BLOG</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end flex">
                    <>
                        {user?.uid ? (
                            <div
                                className="dropdown dropdown-end tooltip tooltip-bottom"
                                data-tip={user.displayName}>
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} alt="" />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link to="" className="justify-between">
                                            {user?.uid
                                                ? user.displayName
                                                : 'Name'}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="">
                                            {user?.uid ? user.email : 'Email'}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleLogout} to="/">
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/login" className="btn mr-4">
                                    Log In
                                </Link>
                            </div>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
