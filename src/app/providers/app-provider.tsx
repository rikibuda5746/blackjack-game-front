import { StoreProvider } from "./store-provider";
import { AppRouterProvider } from "./route-provider";
import { AuthProvider } from "./auth-provider";


export const AppProvider = () => {
  return (
    <StoreProvider>
      <AuthProvider>
        <AppRouterProvider />
      </AuthProvider>
    </StoreProvider>
  );
};