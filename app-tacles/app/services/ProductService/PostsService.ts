import { AxiosError } from "axios";
import { Card } from "../components/discordComponents/cards";
import { AppUtils } from "../data/utils/AppUtils";
import {
  api,
  getMessageFromError,
  ResponseMessage,
} from "../data/utils/RestUtils";
import { GeneralAPIHandler } from "./GeneralAPIHandler";
import { NavigateFunction } from "react-router-dom";

export class PostsService extends GeneralAPIHandler {
  constructor(public useNavigate: NavigateFunction) {
    super(useNavigate);
  }
  public async list(): Promise<Card[]> {
    try {
      const request = await api.get(`messages?user_id=${this.userId}`, {
        headers: {
          Authorization: `Bearer ${AppUtils.GetToken()}`,
        },
      });
      const response: ResponseMessage<Card[]> = request.data;
      const list = response.data;
      //

      const listaTratada = list.map((v) => {
        if (v.imageUrl == "" || v.imageUrl == null) {
          v.imageUrl = undefined;
        }

        //tratando subdescription
        if (v.subdescription == null) {
          v.subdescription = undefined;
        }
        if (v.subdescription != undefined) {
          if (v.subdescription.top == null) {
            v.subdescription.top = undefined;
          }

          const columnCenter = v.subdescription.columnCenter;

          if (columnCenter !== undefined) {
            if (columnCenter == null) {
              v.subdescription.columnCenter = undefined;
            }

            const top = columnCenter.top;
            const bottom = columnCenter.bottom;

            if (
              (top == "" || top == null) &&
              (bottom == "" || bottom == null)
            ) {
              v.subdescription.columnCenter = undefined;
            }

            if (top == "" || top == null) {
              columnCenter.top = undefined;
            }

            if (bottom == "" || bottom == null) {
              columnCenter.bottom = undefined;
            }
          }
        }
        return v;
      });
      //

      console.log(listaTratada);
      return listaTratada;
    } catch (e) {
      this.actionOnTokenExpired(e as AxiosError);
      return [];
    }
  }

  public async sendMessage(
    message: Card,
    onSuccess: () => void,
    onError: (e: ResponseMessage<undefined>) => void
  ): Promise<void> {
    await api
      .post(`messages?user_id=${this.userId}`, message, {
        headers: {
          Authorization: `Bearer ${AppUtils.GetToken()}`,
        },
      })
      .then(() => {
        onSuccess();
      })
      .catch((e: AxiosError) => {
        onError(getMessageFromError(e));
      });
  }

  public async repostMessage(
    postId: string,
    onSuccess: () => void,
    onError: (e: ResponseMessage<undefined>) => void
  ): Promise<void> {
    await api
      .post(
        `messages/repost?user_id=${this.userId}&post_id=${postId}`,
        {},
        this.defaultHeader()
      )
      .then((r) => {
        console.log(r);
        onSuccess();
      })
      .catch((e: AxiosError) => {
        onError(getMessageFromError(e));
      });
  }

  // private buildDiscordEmbed(embedData: Card): any {
  //   // Inicializa o objeto embed básico
  //   const embed: any = {
  //     color: 0x0099ff, // Cor padrão
  //   };

  //   // Adiciona campos condicionalmente
  //   if (embedData.title) embed.title = embedData.title;

  //   // Tratamento da descrição
  //   let descriptionParts = [];
  //   if (embedData.description?.text) {
  //     descriptionParts.push(embedData.description.text);
  //   }

  //   if (embedData.description?.imageAtRightUrl) {
  //     embed.thumbnail = {
  //       url: "",
  //     };

  //     embed.thumbnail.url = embedData.description.imageAtRightUrl;
  //   }

  //   // Adiciona texto
  //   //Claim now
  //   if (embedData.subdescription?.top?.text) {
  //     console.log(embedData.subdescription?.top?.text);
  //     descriptionParts.push(embedData.subdescription.top.text);
  //   }

  //   // Adiciona texto linkavel
  //   //Claim now com link
  //   if (
  //     embedData.subdescription?.top?.text &&
  //     embedData.subdescription?.top.url
  //   ) {
  //     descriptionParts.push(
  //       `[${embedData.subdescription.top.text}](${embedData.subdescription.top.url})`
  //     );
  //   }

  //   if (descriptionParts.length > 0) {
  //     embed.description = descriptionParts.join("\n\n");
  //   }

  //   // Tratamento da imagem
  //   if (embedData.imageUrl) {
  //     embed.image = { url: embedData.imageUrl };
  //   }

  //   // Tratamento dos fields (subdescription)
  //   const fields = [];

  //   //Price
  //   const subDescriptionColumnLeftTop =
  //     embedData.subdescription?.columnLeft?.top;

  //   const subDescriptionColumnLeftBottom =
  //     embedData.subdescription?.columnLeft?.bottom;

  //   if (subDescriptionColumnLeftTop) {
  //     fields.push({
  //       name: subDescriptionColumnLeftTop,
  //       value: subDescriptionColumnLeftBottom
  //         ? subDescriptionColumnLeftBottom
  //         : "",
  //       inline: true,
  //     });
  //   }

  //   //Free until
  //   const subDescriptionColumnCenterTop =
  //     embedData.subdescription?.columnCenter?.top;

  //   const subDescriptionColumnCenterBottom =
  //     embedData.subdescription?.columnCenter?.bottom;

  //   if (subDescriptionColumnCenterTop) {
  //     fields.push({
  //       name: subDescriptionColumnCenterTop,
  //       value: subDescriptionColumnCenterBottom
  //         ? subDescriptionColumnCenterBottom
  //         : "",
  //       inline: true,
  //     });
  //   }

  //   if (fields.length > 0) {
  //     embed.fields = fields;
  //   }

  //   // Tratamento do footer

  //   embed.footer = { text: AppUtils.Branding };
  //   if (embedData.footer) {
  //     embed.footer = { text: embedData.footer + "\n" + AppUtils.Branding };
  //   }

  //   return {
  //     embeds: [embed],
  //   };
  // }
}
