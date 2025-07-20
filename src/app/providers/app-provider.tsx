import { StoreProvider } from "./store-provider";
import { AppRouterProvider } from "./route-provider";;

export const AppProvider = () => {
  return (
    <StoreProvider>
        <AppRouterProvider />
    </StoreProvider>
  );
};