import InputsDiscordMessage from "../../components/InputsDiscordMessage";
import "./style.css";
import ButtonSendMessage from "../../components/ButtonSendMessage";
import { useDiscord } from "../../data/hooks/useDiscord";
import { CustomDiscordCard } from "../../components/DiscordComponentsBase/DiscordBaseContainer";
import InputsDiscordMessageBottom from "../../components/InputsDiscordMessageBottom";

export default function CreateNewPosts() {
  const discordState = useDiscord();

  return (
    <div className="discord-card-container">
      {/* Área 1 */}
      <div className="preview-top">
        <CustomDiscordCard
          card={discordState.fieldsToCard()}
          removeImageUrl={discordState.removeImageUrl}
          removeImageUrlAtRight={discordState.removeImageUrlAtRight}
        />
        <div>
          <ButtonSendMessage message={discordState.fieldsToCard()} />
        </div>
      </div>

      {/* Área 2 */}
      <div className="discord-form">
        <InputsDiscordMessage
          title={discordState.title}
          description={discordState.description}
          footer={discordState.footer}
          setDescription={discordState.setDescription}
          setTitle={discordState.setTitle}
          setFooter={discordState.setFooter}
          setImageUrl={discordState.setBigImageUrl}
          updateImageUrlAtRight={discordState.setImageAtRightUrl}
          setWebhookIds={discordState.setWebhookIds}
        />
      </div>

      {/* Área 3 */}
      <div className="preview-bottom">
        <InputsDiscordMessageBottom
          fieldLeftTitle={discordState.fieldLeftTitle}
          fieldLeftValue={discordState.fieldLeftValue}
          fieldCenterTitle={discordState.fieldCenterTitle}
          fieldCenterValue={discordState.fieldCenterValue}
          setFieldLeftTitle={discordState.setFieldLeftTitle}
          setFieldLeftValue={discordState.setFieldLeftValue}
          setFieldCenterTitle={discordState.setFieldCenterTitle}
          setFieldCenterValue={discordState.setFieldCenterValue}
        />
      </div>
    </div>
  );
}
