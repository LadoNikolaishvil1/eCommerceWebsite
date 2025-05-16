import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ShopCategorys from "./pages/ShopCategorys.jsx";
import ErorPage from "./pages/ErorPage.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErorPage />,
    },
    {
      path: "/:category",
      element: <ShopCategorys />,
    },
    {
      path: "/shop/item/:id",
      element: <ItemPage />,
    },
    {
      path: "/error",
      element: <ErorPage />,
    },
    {
      path: "/checkout",
      element: <CheckoutPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
