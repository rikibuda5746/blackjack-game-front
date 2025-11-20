import { RouteObject } from "react-router-dom";
import { RoutesEnum } from "@app/router/routes-enum";
import { UsersManagementPage } from "@/pages";
import { ProtectedAdminRoute } from "@/app/router/ProtectedAdminRoute";


const AdminRoutes: RouteObject[] = [
  {
    path: RoutesEnum.USERS_MANAGEMENT,
    element: (
      <ProtectedAdminRoute>
        <UsersManagementPage />
      </ProtectedAdminRoute>
    ),
  }
];

export default AdminRoutes;