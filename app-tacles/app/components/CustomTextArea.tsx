import { useEffect, useState } from "react";
import {
  handleCreateLink,
  handlePopupBold,
  handleTextSelection,
} from "../data/utils/DiscordUtils";
import { Popup } from "./Popup";

type CustomTextAreaProps = {
  labelTitle: string;
  inputText: string;
  setInputText: (text: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
};

export default function CustomTextArea({
  inputRef,
  inputText,
  labelTitle,
  setInputText,
}: CustomTextAreaProps) {
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup && selectedText) {
      inputRef.current?.blur();
    }
  }, [showPopup, selectedText, inputRef]);

  const handleTextSelectionWrapper = () => {
    const textarea = inputRef.current;

    handleTextSelection(
      textarea,
      setSelectedText,
      setPopupPosition,
      setShowPopup
    );

    // // Fecha o teclado em mobile
    // if (textarea) textarea.blur();
  };

  const handleCreateLinkWrapper = (url: string) => {
    const textarea = inputRef.current;
    const setValue = setInputText;

    handleCreateLink(url, selectedText, textarea, setValue);
    setShowPopup(false);
  };

  const handlePopupBoldWrapper = () => {
    const textarea = inputRef.current;
    const setValue = setInputText;

    handlePopupBold(selectedText, textarea, setValue, setSelectedText);
  };

  return (
    <div>
      {showPopup && (
        <Popup
          onConfirm={handleCreateLinkWrapper}
          onClose={() => setShowPopup(false)}
          onBold={handlePopupBoldWrapper}
          position={popupPosition}
        />
      )}
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontSize: "14px",
          fontWeight: "600",
          color: "#b9bbbe",
        }}
      >
        {labelTitle}:
      </label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <textarea
          ref={inputRef}
          value={inputText}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          //onPaste={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onChange={(e) => setInputText(e.target.value)}
          // onMouseUp={() => handleTextSelectionWrapper()}
          // onTouchEnd={() => handleTextSelectionWrapper()}
          // onSelect={() => handleTextSelectionWrapper()}
          onSelect={() => {
            const ta = inputRef.current;
            if (!ta) return;
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (end > start) {
              handleTextSelectionWrapper();
            }
          }}
          className="posts-text-area"
        />
      </div>
    </div>
  );
}
