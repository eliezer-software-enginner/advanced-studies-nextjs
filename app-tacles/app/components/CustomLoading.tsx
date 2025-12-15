import ReactLoading from "react-loading";

interface CustomLoadingProps {
  size?: number;
  color?: string;
  type?: "spin" | "bubbles" | "balls" | "spokes" | "cubes" | "cylon" | "bars";
  containerStyle?: React.CSSProperties;
}

export default function CustomLoading({
  size = 50,
  color = "#5865F2",
  type = "spin",
  containerStyle = {},
}: CustomLoadingProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "50vh",
        ...containerStyle,
      }}
    >
      <ReactLoading type={type} color={color} height={size} width={size} />
    </div>
  );
}
