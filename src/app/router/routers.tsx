import { RouteObject } from "react-router-dom";
import HomeRoutes from "@app/router/home-routes";
import AuthRoutes from "@app/router/auth-routes";
import GameRoutes from "@app/router/game-routes";
import AdminRoutes from "@app/router/admin-routes";

const Routes: RouteObject[] = [...HomeRoutes, ...AuthRoutes, ...GameRoutes, ...AdminRoutes];

export { Routes };
