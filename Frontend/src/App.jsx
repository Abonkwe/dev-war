
import './App.css'


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import CreateProfile from './components/CreateProfile';
import UserProfile from './components/UserProfile';
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
  // {
  //   path: "/signup", element: <SignUpPage />
  // },
  // {
  //   path: "/recipes", element: <ViewFullRecipeList />
  // },
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

function App() {
  return (
    <RouterProvider router={router} />
  );

}

export default App;