import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "@/app/router/routers";

const router = createBrowserRouter(Routes);

export const AppRouterProvider = () => {
  
  return <RouterProvider router={router} />;
};
