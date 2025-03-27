import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import JobListingPage from "./pages/JobListingPage";
import CreateProfile from './components/UpdateProfile';
import UserProfile from './components/UserProfile';
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import PostJob from "./pages/PostJob";
import { useNavigate } from 'react-router-dom';
import VerifyPayment from "./pages/VerifyPayment";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/", 
    element: <Landingpage />
  },{
    path: "/explore", element: <JobListingPage/>
  },
  {
    path: "/profile", 
    element: <CreateProfile />
  },
  {
    path: "/signup", element: <Signup />
  },
  {
    path: "/userprofile", 
    element: <UserProfile />
  },
  {
    path: "/createjob", element: <PostJob/>// Dynamic route for recipe details
  },
  {
    path: "/verify-pay", element: <VerifyPayment/>
  },
  {
    path: "/login", element: <LoginPage/>
  },
  // {
  //   path: "*", 
  //   element: <PageNotfound />
  // }
]);

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;