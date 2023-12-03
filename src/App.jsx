import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Start />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
        <Footer />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Register />
        <Footer />
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <NavBar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <NavBar />
        <About />
        <Footer />
      </>
    ),
  },
  {
    path: "/services",
    element: (
      <>
        <NavBar />
        <Services />
        <Footer />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <NavBar />
        <Contact />
        <Footer />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <NavBar />
        <NotFound />
        <Footer />
      </>
    ),
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
