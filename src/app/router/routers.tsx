import { RouteObject } from "react-router-dom";
import HomeRoutes from "@app/router/home-routes";
import AuthRoutes from "@app/router/auth-routes";
import GameRoutes from "@app/router/game-routes";

const Routes: RouteObject[] = [...HomeRoutes, ...AuthRoutes, ...GameRoutes];

export { Routes };
