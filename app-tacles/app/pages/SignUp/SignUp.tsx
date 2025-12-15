import "./style.css";
import { useAuthHook } from "../../data/hooks/useAuthHook";
import CustomLoading from "../../components/CustomLoading";

export default function SignUp() {
  const authHook = useAuthHook();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Criar uma conta</h1>
        <p className="auth-subtitle">
          Já tem uma conta?{" "}
          <span className="auth-link" onClick={authHook.clickOnHaveAccount}>
            Entre aqui
          </span>
        </p>

        <form onSubmit={authHook.handleSubmitSignUp} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={authHook.name}
              onChange={authHook.handleChangeName}
              placeholder="seu-nome"
              required
            />
          </div>
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={authHook.passwordConfirm}
              onChange={authHook.handleChangePasswordConfirm}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={authHook.loading}
          >
            {authHook.loading ? (
              <CustomLoading size={20} color="#fff" />
            ) : (
              "Criar Conta"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
