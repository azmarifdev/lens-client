import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import app from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) =>
{
        const provider = new GoogleAuthProvider();
        const gitProvider = new GithubAuthProvider();
    const [ user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) =>
    {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) =>
    {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () =>
    {
        localStorage.removeItem('token');
        setLoading(true);
        return signOut(auth);
    };

    const handleGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };
    const handleGitHub = () => {
        setLoading(true);
        return signInWithPopup(auth, gitProvider);
    };


    const updateInfo = (name, photoURL) =>
    {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
        {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        };
    }, []);

    const authInfo = {
        createUser,
        login,
        logout,
        handleGoogle,
        handleGitHub,
        loading,
        updateInfo,
        user,
    };
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
