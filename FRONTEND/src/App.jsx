import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Event from './Components/Event';
import Schedule from './Components/Schedule';
import Registration from './Components/Registration';
import Contact from './Components/Contact';
const App = () => { 
  const router = createBrowserRouter([
    <NavBar></NavBar>,
   {path: '/', 
    element: 
    <>
    <NavBar />,
    <Home />
    </>
  },
   {path: '/event',
     element:  <>
     <NavBar />,
     <Event />
     </>
    },
   {path: '/schedule', 
    element:  <>
    <NavBar />,
    <Schedule />
    </>
  },
   {path: '/registration', 
    element:  <>
    <NavBar />,
    <Registration />
    </>
  },
   {path: '/contact', 
    element:  <>
    <NavBar />,
    <Contact />
    </>
  },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App;
