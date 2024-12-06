import { lazy, Suspense, useEffect } from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const NotFound = lazy(() => import("./pages/public/notFound/NotFound"));
const Login = lazy(() => import("./pages/private/sigIn/Siging"));
const PrivateRoutes = lazy(() => import("./shared/hooks/privateRoutes/PrivateRoutes"));
const Dashboard = lazy(() => import("./pages/private/dashboard/Dashboard"));
const AdminLayout = lazy(() => import("./layout/privateLayout/AdminLayout"));
import { HelmetProvider } from 'react-helmet-async';
import Home from "./pages/public/home/Home";
import FallBack from "./pages/public/fallBack/FallBack";
import MainLayout from "./layout/MainLayout";
import Checkout from "./pages/public/checkout/Checkout";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <PrivateRoutes>
        <AdminLayout />
      </PrivateRoutes>,
      children: [
        {
          path: '/admin/orders',
          element: <Dashboard />
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
    // Solo ejecuta replaceState si hay un hash en la URL.
    if (hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Suspense fallback={<FallBack />}>
        <RouterProvider router={router} />
      </Suspense>
    </HelmetProvider>
  );
}

export default App;
