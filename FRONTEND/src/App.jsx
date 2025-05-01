import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Event from './Components/Event';
import Schedule from './Components/Schedule';
import Registration from './Components/Registration';
import Contact from './Components/Contact';
import Login from './Components/Login';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => { 
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <NavBar />
          <Home />
        </>
      ),
    },
    {
      path: '/event',
      element: (
        <>
          <NavBar />
          <Event />
        </>
      ),
    },
    {
      path: '/schedule',
      element: (
        <>
          <NavBar />
          <Schedule />
        </>
      ),
    },
    {
      path: '/registration',
      element: (
        <ProtectedRoute>
          <NavBar />
          <Registration />
        </ProtectedRoute>
      ),
    },
    {
      path: '/contact',
      element: (
        <>
          <NavBar />
          <Contact />
        </>
      ),
    },
    {
      path: '/login',
      element: (
        <>
          <NavBar />
          <Login />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;