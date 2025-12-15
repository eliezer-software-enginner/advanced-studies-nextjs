import { marked } from "marked";
import { Card } from "../discordComponents/cards";

import "./style.css";
import { AppUtils } from "../../data/utils/AppUtils";

marked.setOptions({
  gfm: true, // Habilita **bold**, _italic_, [links], `code` etc.
  breaks: true, // Converte todo '\n' em <br>
});
import ReactMarkdown from "react-markdown";

type DiscordBaseContainerProps = {
  author: string;
  children: React.ReactNode;
};

import discordImage from "../../assets/images/discord-icon.png";
import { RoutesName } from "../../navigation/RoutesName";

export function DiscordBaseContainer({
  children,
  author,
}: DiscordBaseContainerProps) {
  return (
    <div className="discord-base-container">
      <div className="discord-base-bot-image-container">
        <img className="discord-base-bot-image" src={discordImage} />
      </div>

      <div className="discord-base-column-content">
        <span>
          <strong style={{ display: "block", marginBottom: 4 }}>
            {author}
          </strong>
        </span>

        {children}
      </div>
    </div>
  );
}

type PropsCombined = {
  card: Card;
  removeImageUrl: () => void;
  removeImageUrlAtRight: () => void;
};

export function CustomDiscordCard({
  card,
  removeImageUrl,
  removeImageUrlAtRight,
}: PropsCombined) {
  const {
    title,
    author,
    imageUrl,
    description,
    subdescription,
    footer,
    color = "BLUE",
  } = card;

  return (
    <DiscordBaseContainer author={author as string}>
      <div className="discord-row">
        <div className="custom-embed" data-color={color}>
          <div className="embed-content">
            <div className="top-row">
              <div className="title-and-description">
                {/* 1. Título */}
                {title != "" && <div className="embed-title">{title}</div>}

                {/* 2. Descrição (HTML de markdown) */}

                {description && (
                  <div className="embed-description">
                    <ReactMarkdown>{description.text}</ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Imagem a direita */}
              {description?.imageAtRightUrl && (
                <div className="embed-image-wrapper">
                  <img
                    className="embed-image-at-right"
                    src={description.imageAtRightUrl}
                  />
                  {location.pathname == RoutesName.NEW_POSTS && (
                    <button
                      onClick={removeImageUrlAtRight}
                      className="remove-button"
                      style={{
                        right: 2,
                        top: 2,
                      }}
                    >
                      Remover
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="rest-content">
              {/* 2.1 Texto linkavel */}
              {subdescription != undefined && (
                <a
                  className="embed-link"
                  href={subdescription.top?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {subdescription.top?.text}
                </a>
              )}

              {/* 3. Subdescription como campos extras */}
              {subdescription && (
                <div className="embed-fields">
                  {subdescription.columnLeft?.top && (
                    <div className="embed-field">
                      {subdescription.columnLeft?.top != "" && (
                        <div className="embed-field-title">
                          <ReactMarkdown>
                            {subdescription.columnLeft?.top}
                          </ReactMarkdown>
                        </div>
                      )}

                      {subdescription.columnLeft?.bottom != "" && (
                        <ReactMarkdown>
                          {subdescription.columnLeft?.bottom}
                        </ReactMarkdown>
                      )}
                    </div>
                  )}

                  {subdescription.columnCenter && (
                    <div className="embed-field">
                      <div className="embed-field-title">
                        <ReactMarkdown>
                          {subdescription.columnCenter?.top}
                        </ReactMarkdown>
                      </div>
                      {subdescription.columnCenter?.bottom && (
                        <ReactMarkdown>
                          {subdescription.columnCenter?.bottom}
                        </ReactMarkdown>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 2.2 Imagem */}
              {imageUrl && (
                <div className="image-container">
                  <img src={imageUrl} className="embed-image" />

                  {location.pathname == RoutesName.NEW_POSTS && (
                    <button onClick={removeImageUrl} className="remove-button">
                      Remover
                    </button>
                  )}
                </div>
              )}

              {/* 4. Footer */}
              <div className="embed-footer">
                {footer != "" && (
                  <>
                    <ReactMarkdown>{footer}</ReactMarkdown>
                    <br />
                  </>
                )}

                <span className="footer-branding">{AppUtils.Branding}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DiscordBaseContainer>
  );
}
