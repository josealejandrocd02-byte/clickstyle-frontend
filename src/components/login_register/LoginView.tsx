import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getRole } from "@/utils/storage";

// 🔥 Definimos la interfaz correctamente
interface Props {
  onClose: () => void;
}

const LoginView = ({ onClose }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Completa todos los campos");
      return;
    }

    try {
      await handleLogin(username, password);

      const role = getRole(); // 🔥 obtenemos rol

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "OWNER") {
        navigate("/store/dashboard");
      } else {
        navigate("/dashboard");
      }

      setError("");
      onClose(); // 🔥 Cerramos el modal si el login es correcto
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    // 🔥 Fondo oscuro semitransparente del modal
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm rounded-lg border bg-card p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in duration-200"
      >
        {/* 🔥 Botón X para cerrar el modal */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold text-center">Store Login</h1>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-10 rounded-lg border px-3 bg-background"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-10 rounded-lg border px-3 bg-background"
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
            onClick={() => {
              onClose(); // Cerramos el modal antes de navegar
              navigate("/register");
            }}
            className="text-primary cursor-pointer hover:underline"
          >
            Empezar a vender
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginView;