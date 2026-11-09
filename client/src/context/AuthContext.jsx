import { useCallback, useMemo, useState } from "react";
import * as authService from "../services/authService";
import AuthContext from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getStoredUser());
  const login = useCallback(async (email, password) => {
    const nextUser = authService.login(email, password);
    setUser(nextUser);
    return nextUser;
  }, []);
  const signup = useCallback(
    async (details) => authService.beginSignup(details),
    [],
  );
  const verifyOtp = useCallback(async (code) => {
    const nextUser = authService.verifySignup(code);
    setUser(nextUser);
    return nextUser;
  }, []);
  const resendOtp = useCallback(async () => authService.resendOtp(), []);
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading: false,
      signup,
      verifyOtp,
      resendOtp,
      login,
      logout,
      demoOtp: authService.getPendingOtp,
    }),
    [user, signup, verifyOtp, resendOtp, login, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
