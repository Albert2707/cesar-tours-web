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
const Vehicles = lazy(() => import("./pages/private/vehicles/Vehicles"));
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const OrderDetail = lazy(
  () => import("./pages/private/orderDetail/OrderDetail")
);
function App() {
  history.scrollRestoration = "manual";

  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/order/confirmation",
          element: <Confirm />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
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
