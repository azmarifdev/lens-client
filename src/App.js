import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Routes/Router';

function App() {
    return (
        <div>
            <RouterProvider router={Router}></RouterProvider>
        </div>
    );
}

export default App;
