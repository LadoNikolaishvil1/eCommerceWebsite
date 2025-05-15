import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ShopCategorys from "./pages/ShopCategorys.jsx";
import ErorPage from "./pages/ErorPage.jsx";

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
    path: "/error",
    element: <ErorPage />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
