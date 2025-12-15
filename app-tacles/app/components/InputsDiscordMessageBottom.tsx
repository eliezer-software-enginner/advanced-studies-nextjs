import { useRef, useState } from "react";
import CustomTextArea from "./CustomTextArea";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  fieldLeftTitle: string;
  fieldLeftValue: string;
  fieldCenterTitle: string;
  fieldCenterValue: string;

  setFieldLeftTitle: (value: string) => void;
  setFieldLeftValue: (value: string) => void;

  setFieldCenterTitle: (value: string) => void;
  setFieldCenterValue: (value: string) => void;
}

export default function InputsDiscordMessageBottom({
  fieldLeftTitle,
  fieldLeftValue,
  // fieldCenterValue,
  // fieldCenterTitle,

  setFieldLeftTitle,
  setFieldLeftValue,
}: // setFieldCenterTitle,
// setFieldCenterValue,
Props) {
  const titleLeftRef = useRef<HTMLTextAreaElement>(null);
  const valueLeftRef = useRef<HTMLTextAreaElement>(null);
  // const titleCenterRef = useRef<HTMLTextAreaElement>(null);
  // const valueCenterRef = useRef<HTMLTextAreaElement>(null);

  const [addLeftFieldsVisible, setVisibilityOfLeftFields] = useState(false);
  // const [addCenteredFieldsVisible, setVisibilityOfCenteredFields] =
  //   useState(false);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <button
          className="btn-add-fields"
          style={{
            backgroundColor: "rgb(122, 133, 247)",
            height: "40px",
            borderRadius: "8px",
            color: "white",
            fontWeight: "600",
            border: "none",
            width: "fit-content",
            padding: "10px 30px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={() => setVisibilityOfLeftFields((v) => !v)}
        >
          <FontAwesomeIcon
            icon={!addLeftFieldsVisible ? faAngleDown : faAngleUp}
          />
          Adicionar Campo à esquerda
        </button>
        {addLeftFieldsVisible && (
          <div>
            <CustomTextArea
              inputRef={titleLeftRef}
              labelTitle="Titulo"
              inputText={fieldLeftTitle || ""}
              setInputText={setFieldLeftTitle}
            />
            <CustomTextArea
              inputRef={valueLeftRef}
              labelTitle="Valor 1"
              inputText={fieldLeftValue}
              setInputText={setFieldLeftValue}
            />
          </div>
        )}

        {/* {fieldLeftTitle.trim() != "" && fieldLeftValue.trim() != "" && (
          <button
          //onClick={() => setVisibilityOfCenteredFields((v) => !v)}
          >
            Adicionar + Campos
          </button>
        )} */}

        {/* {addCenteredFieldsVisible && (
          <div>
            <CustomTextArea
              inputRef={titleCenterRef}
              labelTitle="Titulo"
              inputText={fieldCenterTitle}
              setInputText={setFieldCenterTitle}
            />
            <CustomTextArea
              inputRef={valueCenterRef}
              labelTitle="Valor 2"
              inputText={fieldCenterValue}
              setInputText={setFieldCenterValue}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}
