import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHome } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { RoutesName } from "../../navigation/RoutesName";

export function Success() {
  const [searchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const sessionIdParam = searchParams.get("session_id");
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
      // Aqui você pode adicionar a lógica para verificar o status da sessão com o backend
    }
  }, [searchParams]);

  return (
    <div className="success-container">
      <div className="success-content">
        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
        <h1>Pagamento Concluído!</h1>
        <p>
          Obrigado por sua compra. Seu pagamento foi processado com sucesso.
        </p>
        {sessionId && <p className="session-id">ID da Sessão: {sessionId}</p>}
        <Link to={RoutesName.HOME} className="home-button">
          <FontAwesomeIcon icon={faHome} />
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
