import { Suspense, useEffect } from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/public/home/Home";
import NotFound from "./pages/public/notFound/NotFound";
import FallBack from "./pages/public/fallBack/FallBack";
import Checkout from "./pages/public/checkout/Checkout";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/private/sigIn/Siging";
import PrivateRoutes from "./shared/hooks/privateRoutes/PrivateRoutes";
import Dashboard from "./pages/private/dashboard/Dashboard";
import AdminLayout from "./layout/privateLayout/AdminLayout";
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
