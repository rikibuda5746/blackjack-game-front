import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginByTokenMutation } from "@/features/auth/api/authApi";
import { setCredentials, logout } from "@/features/auth/store/authSlice";
import storageService from "@/app/services/storageService";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const [loginByToken] = useLoginByTokenMutation();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const tryLoginWithToken = async () => {
      const accessToken = storageService.getAccessToken();
      const refreshToken = storageService.getRefreshToken();

      if (!accessToken || !refreshToken) {
        dispatch(logout());
        setIsInitializing(false);
        return;
      }

      try {
        const response = await loginByToken({ accessToken, refreshToken }).unwrap();
        dispatch(setCredentials(response));
      } catch (error) {
        dispatch(logout());
      }
      finally {
        setIsInitializing(false);
      }
    };

    tryLoginWithToken();
  }, [dispatch, loginByToken]);

  if (isInitializing) return null;
  return <>{children}</>;
}
