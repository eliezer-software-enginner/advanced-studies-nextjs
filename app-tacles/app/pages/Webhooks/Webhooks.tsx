import "./style.css";
import { WebhookHook } from "./WebhookHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useMembershipHook } from "../../data/hooks/useMembershipHook";
import { RoutesName } from "../../navigation/RoutesName";
import { useUserHook } from "../../data/hooks/useUserHook";
export default function Hebhooks() {
  const webhookHook = WebhookHook();

  const { user } = useUserHook();

  const userPremium = user?.premium || false;
  const webhookLimit = 1;

  const { handleAssinatura } = useMembershipHook();

  const handleAddWebhookClick = () => {
    if (!userPremium && webhookHook.webhooks.length >= webhookLimit) {
      toast.warning(
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FontAwesomeIcon icon={faCrown} style={{ color: "#FFD700" }} />
          <span>Você atingiu o limite de webhooks do plano gratuito!</span>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "linear-gradient(45deg, #2C2F33, #23272A)",
            color: "#fff",
            border: "1px solid #FFD700",
          },
        }
      );
      return;
    }
    webhookHook.setIsModalOpen(true);
  };

  return (
    <div className="webhook-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 className="webhook-title">Seus Webhooks</h2>
        {!userPremium && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#B9BBBE", fontSize: "14px" }}>
              {webhookHook.webhooks.length}/{webhookLimit} webhooks
            </span>
            <button
              onClick={() => handleAssinatura(RoutesName.WEBHOOKS)}
              style={{
                background: "linear-gradient(45deg, #FFD700, #FFA500)",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                color: "#2C2F33",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(255,215,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              }}
            >
              <FontAwesomeIcon icon={faCrown} />
              <span>Upgrade para Premium</span>
            </button>
          </div>
        )}
      </div>

      <div className="webhook-list">
        {webhookHook.webhooks.map((webhook) => (
          <div key={webhook.id} className="webhook-card">
            {webhookHook.editingId === webhook.id ? (
              <div className="webhook-info">
                <input
                  type="text"
                  value={webhookHook.editedTitle}
                  onChange={webhookHook.handleEditTitle}
                  className="webhook-input"
                />
                <input
                  type="text"
                  value={webhookHook.editedUrl}
                  onChange={webhookHook.handleEditUrl}
                  className="webhook-input"
                />
                <span className="webhook-id">ID: {webhook.id}</span>
              </div>
            ) : (
              <div className="webhook-info">
                <strong>{webhook.name}</strong>
                <p>{webhook.url}</p>
                <span className="webhook-id">ID: {webhook.id}</span>
              </div>
            )}

            <div className="webhook-actions">
              {webhookHook.editingId === webhook.id ? (
                <>
                  <button onClick={webhookHook.handleSave}>Salvar</button>
                  <button onClick={webhookHook.handleCancelEdit}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => webhookHook.handleDelete(webhook.id)}>
                    Excluir
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {!userPremium && webhookHook.webhooks.length >= webhookLimit && (
        <div
          style={{
            background: "linear-gradient(45deg, #2C2F33, #23272A)",
            border: "1px solid #FFD700",
            padding: "16px",
            borderRadius: "8px",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <FontAwesomeIcon
            icon={faLock}
            style={{ color: "#FFD700", fontSize: "24px" }}
          />
          <div>
            <h3 style={{ color: "#FFD700", margin: "0 0 8px 0" }}>
              Limite de Webhooks Atingido
            </h3>
            <p style={{ color: "#B9BBBE", margin: 0 }}>
              Você atingiu o limite de webhooks do plano gratuito. Faça upgrade
              para Premium e desbloqueie recursos exclusivos!
            </p>
          </div>
        </div>
      )}

      <button
        className="add-webhook-button"
        onClick={handleAddWebhookClick}
        style={{
          background:
            !userPremium && webhookHook.webhooks.length >= webhookLimit
              ? "linear-gradient(45deg, #2C2F33, #23272A)"
              : "linear-gradient(45deg, #5865F2, #7289DA)",
          border:
            !userPremium && webhookHook.webhooks.length >= webhookLimit
              ? "1px solid #FFD700"
              : "none",
          cursor:
            !userPremium && webhookHook.webhooks.length >= webhookLimit
              ? "not-allowed"
              : "pointer",
        }}
      >
        + Adicionar Webhook
      </button>

      {webhookHook.isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Criar novo Webhook</h3>
            <input
              type="text"
              placeholder="Título"
              value={webhookHook.newTitle}
              onChange={webhookHook.handleTitle}
              className="webhook-input"
            />
            <input
              type="text"
              placeholder="URL do Webhook"
              value={webhookHook.newUrl}
              onChange={webhookHook.handleUrl}
              className="webhook-input"
            />
            <div className="modal-buttons">
              <button onClick={webhookHook.handleAddWebhook}>
                Criar Webhook
              </button>
              <button onClick={() => webhookHook.setIsModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
