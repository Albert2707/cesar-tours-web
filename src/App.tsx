import { lazy, Suspense } from "react";
const NotFound = lazy(() => import("./pages/public/notFound/NotFound"));
const Login = lazy(() => import("./pages/private/sigIn/Siging"));
const PrivateRoutes = lazy(
  () => import("./shared/hooks/privateRoutes/PrivateRoutes")
);
const Dashboard = lazy(() => import("./pages/private/dashboard/Dashboard"));
const AdminLayout = lazy(() => import("./layout/privateLayout/AdminLayout"));
const Home = lazy(() => import("./pages/public/home/Home"));
import { HelmetProvider } from "react-helmet-async";
const FallBack = lazy(() => import("./pages/public/fallBack/FallBack"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const Checkout = lazy(() => import("./pages/public/checkout/Checkout"));
const Confirm = lazy(() => import("./pages/public/confirm/Confirm"));
import Vehicles from "./pages/private/vehicles/Vehicles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderDetail from "./pages/private/orderDetail/OrderDetail";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/order/confirmation",
          element: <Confirm />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: (
        <PrivateRoutes>
          <AdminLayout />
        </PrivateRoutes>
      ),
      children: [
        {
          path: "/admin/orders",
          element: <Dashboard />,
        },
        {
          path: "/admin/vehicles",
          element: <Vehicles />,
        },
        {
          path: "/admin/order-detail/:id",
          element: <OrderDetail />, // Add your component here
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

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
