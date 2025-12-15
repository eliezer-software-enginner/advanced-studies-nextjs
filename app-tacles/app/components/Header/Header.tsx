// components/Header.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoutesName } from "../../navigation/RoutesName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { NavigationUtils } from "../../navigation/NavigationUtils";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const navUtils = new NavigationUtils(location);

  const handleLogout = () => {
    localStorage.clear();
    navigate(RoutesName.LANDING_PAGE);
  };

  return (
    <header
      className={`header ${navUtils.isLandingPage() ? "header-landing" : ""}`}
    >
      <div className="header-content">
        <Link to={navUtils.RedirectToHome()} className="logo">
          Tacles
        </Link>
        {navUtils.isLandingPage() ? (
          <nav className="nav">
            <Link to={RoutesName.LOGIN} className="nav-link">
              Entrar
            </Link>
            <Link to={RoutesName.SIGN_UP} className="nav-link signup-link">
              Cadastrar
            </Link>
          </nav>
        ) : (
          !navUtils.isAuthPage() && (
            <nav className="nav">
              <Link
                to={RoutesName.GROUP}
                className={`nav-link ${
                  location.pathname === RoutesName.GROUP ||
                  location.pathname === RoutesName.NEW_GROUP
                    ? "active"
                    : ""
                }`}
              >
                Servidores da comunidade
              </Link>
              <Link
                to={RoutesName.WEBHOOKS}
                className={`nav-link ${
                  location.pathname === RoutesName.WEBHOOKS ? "active" : ""
                }`}
              >
                Webhooks
              </Link>
              <Link
                to={RoutesName.PROFILE}
                className={`nav-link ${
                  location.pathname === RoutesName.PROFILE ? "active" : ""
                }`}
              >
                <FontAwesomeIcon icon={faUser} />
                Perfil
              </Link>
              <button onClick={handleLogout} className="logout-button">
                <FontAwesomeIcon icon={faRightFromBracket} />
                Sair
              </button>
            </nav>
          )
        )}
      </div>
    </header>
  );
}
