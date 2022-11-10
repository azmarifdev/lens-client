import { createBrowserRouter } from 'react-router-dom';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';
import ErrorPage from '../Components/Others/ErrorPage';
import AddServices from '../Components/Pages/AddServices';
import Blog from '../Components/Pages/Blog';
import Home from '../Components/Pages/Home';
import MyReviews from '../Components/Pages/MyReviews';
import ReviewUpdate from '../Components/Pages/ReviewUpdate';
import ServiceDetails from '../Components/Pages/ServiceDetails';
import Services from '../Components/Pages/Services';
import Main from '../Layouts/Main';
import PrivateRoute from './PrivateRoute';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/myreviews',
                element: (
                    <PrivateRoute>
                        <MyReviews />
                    </PrivateRoute>
                ),
            },
            {
                path: '/addservices',
                element: (
                    <PrivateRoute>
                        <AddServices />
                    </PrivateRoute>
                ),
            },
            {
                path: '/blog',
                element: <Blog />,
            },
            { 
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/services',
                element: <Services />,
            },
            {
                path: '/reviewupdate/:id',
                element: <ReviewUpdate />,
            },
            {
                path: '/servicedetails/:id',
                element: <ServiceDetails />,
                loader: ({ params }) =>
                    fetch(`https://lens-server.vercel.app/services/${params.id}`),
            },
        ],
    },
]);

export default Router;
