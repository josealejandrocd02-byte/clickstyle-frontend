import { login } from "@/services/authService";
import { saveToken, saveUsername } from "@/utils/storage";
import { saveRole } from "@/utils/storage";
import { registerSeller } from "@/services/authService";

export const useAuth = () => {
  const handleLogin = async (username: string, password: string) => {
    const data = await login(username, password);
    saveToken(data.token);
    saveRole(data.role);

    return data;
  };

    const handleRegister = async (payload: any) => {
    const data = await registerSeller(payload);
    saveToken(data.token); // 🔐 auto login
    return data;
  };

  return { handleLogin, handleRegister };
};