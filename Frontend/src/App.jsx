
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import JobListingPage from "./pages/JobListingPage";
import LoginPage from "./pages/LoginPage";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/", element: <Landingpage />
  },
  // {
  //   path: "/login", element: <LoginPage />
  // },
  {
     path: "/profile", element: <CreateProfile />
   },
   {
    path: "/userprofile", element: <UserProfile />
   },

  {
    path: "/login", element: <LoginPage />

  },
  // {
  //   path: "/signup", element: <SignUpPage />
  // },
  //{
   // path: "/explore", element: <JobListingPage />
  //},
  // {
  //   path: "/recipes/:recipeId", element: <RecipeDetail /> // Dynamic route for recipe details
  // },
  // {
  //   path: "/aichat", element: <AiChat/>
  // },
  // {
  //   path: "*", element: <PageNotfound />
  // }
]);


export default App;