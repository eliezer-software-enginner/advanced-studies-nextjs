import "./style.css";

export default function DiscordCardDetails() {
  // const discordState = useDiscord({
  //   cardState: {
  //     title: "🚨 PROMOÇÃO RELÂMPAGO PARA DEVS JAVA! ⚡",
  //     description: cards[1].description,
  //     footer: "💻 Powered by Cryxie • Para Devs, por Devs.",
  //     // imageUrl:
  //     //   "https://th.bing.com/th/id/OIP.6kk6kiVl5cpEv_cSkNOCqwHaF0?rs=1&pid=ImgDetMain",
  //   },
  //   isSending: false,
  // });

  // const d1 = useDiscord({
  //   cardState: {
  //     title: cards[1].title,
  //     description: cards[1].description,
  //     footer: cards[1].footer,
  //     imageUrl: cards[1].imageUrl,
  //   },

  //   isSending: false,
  // });

  // const d2 = useDiscord({
  //   cardState: {
  //     description: cards[5].description,
  //     imageUrl: cards[1].imageUrl,
  //   },

  //   isSending: false,
  // });

  return (
    <div className="discord-card-container">
      <div className="discord-form">
        {/* <InputsDiscordMessage
          title={discordState.cardState.title}
          setTitle={discordState.setTitle}
          description={discordState.cardState.description}
          setDescription={discordState.setDescription}
          setImageUrl={discordState.setImageUrl}
        /> */}
      </div>

      <div className="discord-preview">
        {/* <CustomDiscordCard description={discordState.description} /> */}

        {/* <CustomDiscordCard
          author="Cryxie"
          description={cards[5].description}
          subdescription={cards[5].subdescription}
          buttonLeft={cards[5].buttonLeft}
        />

        <CustomDiscordCard
          author="Cryxie"
          title={cards[1].title}
          description={cards[1].description}
          subdescription={cards[1].subdescription}
          imageUrl={cards[1].imageUrl}
          buttonLeft={cards[1].buttonLeft}
          footer={cards[1].footer}
        />

        <CustomDiscordCard2
          author="Cryxie"
          title={cards[0].title}
          description={cards[0].description}
          subdescription={cards[0].subdescription}
          imageUrl={cards[0].imageUrl}
          buttonLeft={cards[0].buttonLeft}
          footer={cards[0].footer}
        />

        <CustomDiscordCard2
          author="Cryxie"
          title={cards[0].title}
          description={cards[0].description}
          subdescription={cards[0].subdescription}
          imageUrl={cards[0].imageUrl}
          buttonLeft={cards[0].buttonLeft}
          footer={cards[0].footer}
        />

        <CustomDiscordCard
          author="Cryxie"
          color={cards[7].color}
          thumbnailUrl={cards[7].thumbnailUrl}
          title={cards[7].title}
          description={cards[7].description}
          subdescription={cards[7].subdescription}
          imageUrl={cards[7].imageUrl}
          buttonLeft={cards[7].buttonLeft}
          footer={cards[7].footer}
        /> */}

        {/* <ButtonSendMessage
          isSending={discordState.isSending}
          message={cards[5]}
        /> */}
      </div>
    </div>
  );
}
