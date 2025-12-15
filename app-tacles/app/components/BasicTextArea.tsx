type CustomTextAreaProps = {
  labelTitle: string;
  inputText: string;
  setInputText: (text: string) => void;
};

export default function BasicTextArea({
  inputText,
  labelTitle,
  setInputText,
}: CustomTextAreaProps) {
  return (
    <div>
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
          value={inputText}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          //onPaste={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onChange={(e) => setInputText(e.target.value)}
          // onMouseUp={() => handleTextSelectionWrapper()}
          // onTouchEnd={() => handleTextSelectionWrapper()}
          // onSelect={() => handleTextSelectionWrapper()}
          className="posts-text-area"
        />
      </div>
    </div>
  );
}
