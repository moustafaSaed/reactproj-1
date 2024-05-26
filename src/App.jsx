import './App.css'
import Home from './Pages/Home';
import { useContext } from 'react';
import DataContext from './Context/Context';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Js from './Pages/Js';
import Html from './Pages/Html';
import Css from './Pages/Css.jsx'
import SignIn from './Pages/Login/SignIn.jsx';
import SignUp from './Pages/Login/SignUp.jsx';

const router = createBrowserRouter([
  {path: "/", element: <Home />},
  {path: "/css", element: <Css />},
  {path: "/js", element: <Js />},
  {path: "/html", element: <Html />},
  {path: "/signin", element: <SignIn />},
  {path: "/signup", element: <SignUp />},
]);

function App() {
  const {mode} = useContext(DataContext);

  return (
    <div className={`${mode}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
