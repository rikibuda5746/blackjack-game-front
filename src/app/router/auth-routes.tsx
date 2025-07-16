import { RouteObject } from "react-router-dom";
import { RoutesEnum } from "@app/router/routes-enum";
import { LoginPage , RegistrationPage } from "@/pages";


const AuthRoutes: RouteObject[] = [
  {
    path: RoutesEnum.LOGIN,
    element: < LoginPage />,
    
  },
  {
    path: RoutesEnum.REGISTRATION,
    element: < RegistrationPage />,
  }
];

export default AuthRoutes;