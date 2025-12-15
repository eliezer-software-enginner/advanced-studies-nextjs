import { usePostsHook } from "../../data/hooks/usePostsHook";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../../components/CustomLoading";
import { toast } from "react-toastify";
import { RoutesName } from "../../navigation/RoutesName";
import { CustomDiscordCard } from "../../components/DiscordComponentsBase/DiscordBaseContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRepeat,
  faCrown,
  faLock,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import { useMembershipHook } from "../../data/hooks/useMembershipHook";
import { useUserHook } from "../../data/hooks/useUserHook";
import { useFetchWebhook } from "../../data/hooks/useFetchWebhook";
import "./style.css";

export default function Home() {
  const { user } = useUserHook();
  const { myPosts, isLoading, handleRepost, userPremium, postsLimit } =
    usePostsHook(user);
  const { webhooks } = useFetchWebhook();
  const { handleAssinatura } = useMembershipHook();
  const navigate = useNavigate();

  const onClickCreateNewPost = () => {
    if (!userPremium && myPosts.length >= postsLimit) {
      toast.warning(
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FontAwesomeIcon icon={faCrown} style={{ color: "#FFD700" }} />
          <span>Você atingiu o limite de posts do plano gratuito!</span>
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
    if (webhooks.length === 0) {
      toast.info(
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <FontAwesomeIcon icon={faFaceSmile} style={{ color: "#FFD700" }} />
          <span>Você precisa cadastrar webhook primeiro!</span>
          <button
            onClick={() => navigate(RoutesName.WEBHOOKS)}
            style={{
              backgroundColor: "#907F9F",
              padding: "9px 13px",
              borderRadius: 10,
              borderWidth: 0,
            }}
          >
            Ir para Webhooks
          </button>
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
            border: "1px solid #907F9F",
          },
        }
      );
      return;
    }
    navigate(RoutesName.NEW_POSTS);
  };

  // Early return while loading, including the Header
  if (isLoading) {
    return (
      <>
        <div
          className="home-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 60px)",
          }}
        >
          <CustomLoading />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="home-container">
        <div
          className="home-header"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1>Meus últimos posts</h1>
            {!userPremium && (
              <span style={{ color: "#B9BBBE", fontSize: "14px" }}>
                {myPosts.length}/{postsLimit} posts
              </span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {!userPremium && myPosts.length >= postsLimit && (
              <button
                onClick={() => handleAssinatura(RoutesName.HOME)}
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
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  width: "100%",
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
            )}
            <button
              className="new-post-button"
              onClick={onClickCreateNewPost}
              style={{
                background:
                  !userPremium && myPosts.length >= postsLimit
                    ? "linear-gradient(45deg, #2C2F33, #23272A)"
                    : "linear-gradient(45deg, #5865F2, #7289DA)",
                border:
                  !userPremium && myPosts.length >= postsLimit
                    ? "1px solid #FFD700"
                    : "none",
                cursor:
                  !userPremium && myPosts.length >= postsLimit
                    ? "not-allowed"
                    : "pointer",
                width: "100%",
              }}
            >
              + Criar novo post
            </button>
          </div>
        </div>

        {!userPremium && myPosts.length >= postsLimit && (
          <div
            style={{
              background: "linear-gradient(45deg, #2C2F33, #23272A)",
              border: "1px solid #FFD700",
              padding: "16px",
              borderRadius: "8px",
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <FontAwesomeIcon
              icon={faLock}
              style={{
                color: "#FFD700",
                fontSize: "24px",
                marginBottom: "8px",
              }}
            />
            <div>
              <h3
                style={{
                  color: "#FFD700",
                  margin: "0 0 8px 0",
                  fontSize: "16px",
                }}
              >
                Limite de Posts Atingido
              </h3>
              <p
                style={{
                  color: "#B9BBBE",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                Você atingiu o limite de posts do plano gratuito. Faça upgrade
                para Premium e desbloqueie posts ilimitados!
              </p>
            </div>
          </div>
        )}

        {myPosts.length === 0 ? (
          <div className="empty-posts">
            <h2>Você ainda não tem nenhum post</h2>
            <p>Crie seu primeiro post clicando no botão acima</p>
          </div>
        ) : (
          <div className="posts-grid">
            {myPosts.map((post, index) => (
              <div key={index} className="post-card-wrapper">
                <CustomDiscordCard
                  removeImageUrlAtRight={() => {}}
                  card={post}
                  removeImageUrl={() => {}}
                />
                <div className="post-actions">
                  <button
                    className="action-button repost-button"
                    onClick={() => handleRepost(post.id)}
                    style={{
                      background: userPremium
                        ? "linear-gradient(45deg, #5865F2, #7289DA)"
                        : "linear-gradient(45deg, #2C2F33, #23272A)",
                      border: userPremium ? "none" : "1px solid #FFD700",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      color: "white",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseOver={(e) => {
                      if (!userPremium) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 8px rgba(255,215,0,0.2)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!userPremium) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 4px rgba(0,0,0,0.1)";
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faRepeat}
                      style={{
                        color: userPremium ? "#fff" : "#FFD700",
                        transition: "all 0.2s ease",
                      }}
                    />
                    <span>Repostar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
