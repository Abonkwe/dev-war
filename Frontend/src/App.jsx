import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import JobListingPage from "./pages/JobListingPage";
import CreateProfile from './components/UpdateProfile';
import UserProfile from './pages/UserProfile';
import Notification from './components/Notification';
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import PostJob from "./pages/PostJob";
import VerifyPayment from "./pages/VerifyPayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landingpage />
  },
  {
    path: "/explore",
    element: <JobListingPage />
  },
  {
    path: "/profile",
    element: <CreateProfile />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/userprofile",
    element: <UserProfile />
  },
  {
    path: "/createjob",
    element: <PostJob />
  },
  {
    path: "/notifications",
    element: <Notification />
  },
  {
    path: "/verify-payment",
    element: <VerifyPayment />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;