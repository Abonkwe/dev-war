import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import JobListingPage from "./pages/JobListingPage";
import LoginPage from "./pages/LoginPage";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/", element: <Landingpage />
  },
  {
    path: "/login", element: <LoginPage />
  },
  // {
  //   path: "/signup", element: <SignUpPage />
  // },
  {
    path: "/explore", element: <JobListingPage />
  },
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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;