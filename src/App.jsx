import './App.css'
import Home from './Pages/Home';
import { useContext } from 'react';
import DataContext from './Context/Context';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Profile from './Pages/Profile.jsx';
import SignIn from './Pages/Login/SignIn.jsx';
import SignUp from './Pages/Login/SignUp.jsx';
import Err404 from './Pages/Err404.jsx';
import TodoList from './Pages/TodoList';
import TaskInfo from './Pages/TaskInfo/TaskInfo';
import { useTranslation } from 'react-i18next';

  
const router = createBrowserRouter([
  {path: "/", element: <Home />, errorElement:<Err404 />},
  {path: "/signin", element: <SignIn />},
  {path: "/signup", element: <SignUp />},
  {path: "/profile", element: <Profile />},
  {path: "/todo", element: <TodoList />},
  {path: "/taskinfo/:id", element: <TaskInfo />},
]);

function App() {
  // @ts-ignore
  const {mode} = useContext(DataContext);
  const { t, i18n } = useTranslation(); // new
  return (
    <div dir={i18n.language==='ar'? 'rtl': 'ltr'} className={`${mode}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
