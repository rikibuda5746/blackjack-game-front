import { RouteObject } from "react-router-dom";
import { RoutesEnum } from "@app/router/routes-enum";
import { HomePage } from "@/pages";


const HomeRoutes: RouteObject[] = [
  {
    path: RoutesEnum.HOME,
    element: < HomePage />,
  }
];

export default HomeRoutes;