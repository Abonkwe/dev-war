import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import JobListingPage from "./pages/JobListingPage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import PostJob from "./pages/PostJob";
import VerifyPayment from "./pages/VerifyPayment";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/", element: <Landingpage />
  },
  {
    path: "/login", element: <LoginPage />
  },
  {
    path: "/signup", element: <Signup />
  },
  {
    path: "/explore", element: <JobListingPage />
  },
  {
    path: "/postjob", element: <PostJob/>// Dynamic route for recipe details
  },
  {
    path: "/verify-pay", element: <VerifyPayment/>
  },
  // {
  //   path: "*", element: <PageNotfound />
  // }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;