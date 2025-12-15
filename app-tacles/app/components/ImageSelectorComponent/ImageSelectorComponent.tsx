import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

type Props = {
  image: string;
  handleImageChange: (file: File) => void;
};

export default function ImageSelectorComponent(props: Props) {
  return (
    <div className="image-container">
      <div className="image-wrapper">
        <img
          src={props.image}
          alt="Imagem de capa do grupo do Discord"
          className="cover-image"
        />
        <label className="label-image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                props.handleImageChange(file);
              }
            }}
            style={{ display: "none" }}
          />
          <FontAwesomeIcon icon={faCamera} />
        </label>
      </div>
    </div>
  );
}
