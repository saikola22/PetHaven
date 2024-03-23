import './App.css';
import Layout from './Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/home/Home';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Sitters from './components/sitters/Sitters';
import Sitter from './components/sitter/Sitter';
import SitterRegister from './components/sitterRegister/SitterRegister';
import AboutSitter from './components/aboutSitter/AboutSitter';
import Petcare from './components/petcare/Petcare';

function App() {

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: "signin",
          element: <Signin />
        },
        {
          path: "sitter-register",
          element: <SitterRegister />
        },
        {
          path: "about-sitter",
          element: <AboutSitter />
        },
        {
          path: "sitters",
          element: <Sitters />,
        },
        {
          path: "sitter/:sittername",
          element: <Sitter />
        },
        {
          path: "petcare",
          element: <Petcare />
        }
      ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
