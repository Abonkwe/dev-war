import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import JobListingPage from "./pages/JobListingPage";
import CreateProfile from './components/UpdateProfile';
import UserProfile from './components/UserProfile';
import Notification from './components/Notification';
import LoginPage from "./pages/LoginPage";
import PostJob from './pages/PostJob';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Landingpage />
  },
  {
    path: "/profile", 
    element: <CreateProfile />
  },
  {
    path: "/userprofile", 
    element: <UserProfile />
  },
  {
    path: "/login", 
    element: <LoginPage />
  },
  {
    path:"/post",
    element: <PostJob/>
  },
  {
    path:"/notification",
    element: <Notification/>
  }
  // Additional routes can be uncommented as needed
  // {
  //   path: "/signup", 
  //   element: <SignUpPage />
  // },
  // {
  //   path: "/explore", 
  //   element: <JobListingPage />
  // },
  // {
  //   path: "*", 
  //   element: <PageNotfound />
  // }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;