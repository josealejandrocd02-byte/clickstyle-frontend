import { useState } from "react";
import Header from "../Header";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
interface Props {
  onLogin: () => void;
}

const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!username || !password) {
    setError("Completa todos los campos");
    return;
  }

  try {
    await handleLogin(username, password);

    setError("");
    navigate("/redirect"); // redirige
  } catch (err) {
    setError("Usuario o contraseña incorrectos");
  }
};

  return (
    <>
    <Header />
    <div className="min-h-screen flex items-center justify-center bg-background">
            
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border bg-card p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Store Login</h1>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-10 rounded-lg border px-3"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-10 rounded-lg border px-3"
        />

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full h-10 rounded-lg bg-primary text-white font-semibold"
        >
          Ingresar
        </button>

        <p className="text-sm text-center">
          ¿Quieres vender?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-primary cursor-pointer"
          >
            Empezar a vender
          </span>
        </p>


      </form>
    </div>
    </>
  );
};

export default LoginView;