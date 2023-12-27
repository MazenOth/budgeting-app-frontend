import { createBrowserRouter, Route } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import HomePage from "./HomePage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Signin /> },
  { path: "/register", element: <Signup /> },
]);

export default router;
