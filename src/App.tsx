import { lazy, Suspense, useEffect } from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Home from "./pages/public/home/Home";
const Home = lazy(() => import("./pages/public/home/Home"))
const NotFound = lazy(() => import("./pages/public/notFound/NotFound"));
const FallBack = lazy(() => import("./pages/public/fallBack/FallBack"));
const Checkout = lazy(() => import("./pages/public/checkout/Checkout"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const Login = lazy(() => import("./pages/private/sigIn/Siging"));
const PrivateRoutes = lazy(() => import("./shared/hooks/privateRoutes/PrivateRoutes"));
const Dashboard = lazy(() => import("./pages/private/dashboard/Dashboard"));
const AdminLayout = lazy(() => import("./layout/privateLayout/AdminLayout"));
import { HelmetProvider } from 'react-helmet-async';
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
      children:[
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
