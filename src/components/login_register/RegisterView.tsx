import { useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const RegisterView = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  // 👤 USER
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🏪 STORE
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [error, setError] = useState("");

  // 👉 siguiente paso
  const nextStep = () => {
    if (!username || !email || !password) {
      setError("Completa los datos de la cuenta");
      return;
    }
    setError("");
    setStep(2);
  };


  const prevStep = () => setStep(1);


  const handleSubmit = async () => {
    if (!storeName || !whatsapp) {
      setError("Completa los datos de la tienda");
      return;
    }

    try {
      await handleRegister({
        username,
        email,
        password,
        storeName,
        description,
        whatsapp,
      });

      // 🔥 auto login → directo al dashboard
      navigate("/redirect");

    } catch (err: any) {
      setError("Error al registrarse");
    }
  };
  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md rounded-lg border bg-card p-6 space-y-4">

          <h1 className="text-xl font-bold text-center">
            {step === 1 ? "Crear cuenta" : "Crear tienda"}
          </h1>

          {/* STEP INDICATOR */}
          <div className="flex justify-center gap-2">
            <div className={`h-2 w-10 rounded ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
            <div className={`h-2 w-10 rounded ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 border rounded px-3"
              />

              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 border rounded px-3"
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 border rounded px-3"
              />

              <button
                onClick={nextStep}
                className="w-full h-10 bg-primary text-white rounded"
              >
                Siguiente
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Nombre de la tienda"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full h-10 border rounded px-3"
              />

              <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />

              <input
                type="text"
                placeholder="WhatsApp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full h-10 border rounded px-3"
              />

              <div className="flex gap-2">
                <button
                  onClick={prevStep}
                  className="w-1/2 h-10 border rounded"
                >
                  Atrás
                </button>

                <button
                  onClick={handleSubmit}
                  className="w-1/2 h-10 bg-primary text-white rounded"
                >
                  Crear tienda
                </button>
              </div>
            </>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterView;