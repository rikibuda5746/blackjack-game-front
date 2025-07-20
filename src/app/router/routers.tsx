import { RouteObject } from "react-router-dom";
import HomeRoutes from "@app/router/home-routes";
import AuthRoutes from "@app/router/auth-routes";

const Routes: RouteObject[] = [...HomeRoutes, ...AuthRoutes];

export { Routes };
