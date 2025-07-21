import { RouteObject } from "react-router-dom";
import { RoutesEnum } from "@app/router/routes-enum";
import { ProtectedRoute } from "@/app/router/ProtectedRoute";
import { GamePage } from "@/pages";


const GameRoutes: RouteObject[] = [
  {
    path: RoutesEnum.GAME,
    element: (
      <ProtectedRoute>
        <GamePage />
      </ProtectedRoute>
    ),
    
  }
];

export default GameRoutes;