import CustomLoading from "../CustomLoading";
import "./style.css";

type Props = {
  text: String;
  loading?: boolean;
  handleClick: () => Promise<void>;
};

export default function DefaultButtonSend({
  text,
  loading,
  handleClick,
}: Props) {
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="default-btn"
      style={{
        cursor: loading ? "not-allowed" : "pointer",
        width: 300,
      }}
    >
      {loading ? (
        <>
          <CustomLoading size={20} containerStyle={{ height: "auto" }} />
          Enviando...
        </>
      ) : (
        text
      )}
    </button>
  );
}
