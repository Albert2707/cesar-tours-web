import {Suspense, useEffect } from "react";

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import FallBack from "./pages/fallBack/FallBack";
import Checkout from "./pages/checkout/Checkout";
import Navbar from "./components/navbar/Navbar";
function App() {

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/checkout',
          element: <Checkout />
        }
      ]
    },
    {
      path: "*",
      element: <NotFound />,
    }
  ]);
  useEffect(() => {
    const { hash } = window.location;
    if (hash) history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<FallBack />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
