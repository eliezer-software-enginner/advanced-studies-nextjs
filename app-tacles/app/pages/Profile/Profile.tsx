import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faCamera } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useMembershipHook } from "../../data/hooks/useMembershipHook";
import { RoutesName } from "../../navigation/RoutesName";
import { useUserHook } from "../../data/hooks/useUserHook";
import { AppUtils } from "../../data/utils/AppUtils";
export default function Profile() {
  const [profileImage, setProfileImage] = useState<string>(
    AppUtils.GetProfilePicture()
  );

  const { user, userService } = useUserHook();
  const userPremium = user?.premium || false;
  const userName = user?.name || "Usuário Indefinido";
  const accountCreatedAt = AppUtils.GetAccountCreatedAtTime();

  const { handleAssinatura } = useMembershipHook();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        userService.updateProfilePicture(
          AppUtils.GetUserId(),
          file,
          () => {
            AppUtils.SaveProfilePictureAtLocalStorage(reader.result as string);
            setProfileImage(reader.result as string);
          },
          () => {}
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Meu Perfil</h1>
      </div>

      <div className="profile-content">
        <div className="profile-image-container">
          <div className="profile-image-wrapper">
            <img
              src={profileImage}
              alt="Foto de perfil"
              className="profile-image"
            />
            <label className="profile-image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <FontAwesomeIcon icon={faCamera} />
            </label>
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-name">
            <h2>{userName}</h2>
            {userPremium && (
              <span className="premium-badge">
                <FontAwesomeIcon icon={faCrown} />
                Premium
              </span>
            )}
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Conta criada em:</span>
              <span className="detail-value">{accountCreatedAt}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span
                className={`detail-value ${userPremium ? "premium" : "free"}`}
              >
                {userPremium ? "Premium" : "Gratuito"}
              </span>
            </div>
          </div>

          {!userPremium && (
            <button
              className="upgrade-button"
              onClick={() => handleAssinatura(RoutesName.PROFILE)}
            >
              <FontAwesomeIcon icon={faCrown} />
              Upgrade para Premium
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
