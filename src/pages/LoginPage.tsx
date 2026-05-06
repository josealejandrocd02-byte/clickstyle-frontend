import LoginView from "@/components/login_register/LoginView";

// 🔥 Definimos la interfaz para que TypeScript no marque error
interface LoginPageProps {
  onClose: () => void;
}

const LoginPage = ({ onClose }: LoginPageProps) => {
  return (
    <>
      <LoginView onClose={onClose} />
    </>
  );
};

export default LoginPage;