import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Event from './Components/Event';
import Schedule from './Components/Schedule';
import Registration from './Components/Registration';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/event"
          element={
            <>
              <NavBar />
              <Event />
               <Footer />
            </>
          }
        />
        <Route
          path="/schedule"
          element={
            <>
              <NavBar />
              <Schedule />
               <Footer />
            </>
          }
        />
        <Route
          path="/registration"
          element={
            <ProtectedRoute>
              <NavBar />
              <Registration />
               <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <NavBar />
              <Contact />
               <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <NavBar />
              <Login />
               <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <NavBar />
              <Register />
               <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <NavBar />
              <Dashboard />
               <Footer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;