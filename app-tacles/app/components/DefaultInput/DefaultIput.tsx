import "./style.css";

type Props = {
  labelTitle: string;
  value: string;
  onChange: (v: string) => void;
};

export default function DefaultInput(props: Props) {
  return (
    <div className="default-input-container">
      <label className="default-input-label">{props.labelTitle}:</label>
      <input
        className="posts-text-area"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
