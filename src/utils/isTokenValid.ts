import { jwtDecode } from "jwt-decode";
import { getToken, removeRole, removeToken } from "./storage";

export const isTokenValid = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;

    return decoded.exp > now;
  } catch {
    return false;
  }
};

export const isAuthenticated = () => {
  const token = getToken();

  if (!token || !isTokenValid(token)) {
    removeToken();
    removeRole();
    return false;
  }

  return true;
};