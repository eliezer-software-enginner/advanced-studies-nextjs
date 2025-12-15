import "./style.css";
import { useAuthHook } from "../../data/hooks/useAuthHook";
import CustomLoading from "../../components/CustomLoading";

export default function Login() {
  const authHook = useAuthHook();
  const { loading } = authHook;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Bem-vindo de volta!</h1>
        <p className="auth-subtitle">
          Não tem uma conta?{" "}
          <span className="auth-link" onClick={authHook.clickOnDontHaveAccount}>
            Registre-se
          </span>
        </p>

        <form onSubmit={authHook.handleSubmitLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={authHook.email}
              onChange={authHook.handleChangeEmail}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={authHook.password}
              onChange={authHook.handleChangePassword}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <CustomLoading size={20} color="#fff" /> : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
