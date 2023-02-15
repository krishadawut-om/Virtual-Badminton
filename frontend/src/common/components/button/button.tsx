import "./button.scss";

export default function Button(props: {
  text: string;
  onClick?: () => void;
  isDense?: boolean;
  backgroundColor?: String;
  fontColor?: String;
  isLoading?: boolean;
}) {
  return (
    <div
      className="button"
      onClick={props.onClick}
      style={{
        padding: props.isDense ? "8px 32px" : "",
        backgroundColor: props.backgroundColor as any,
        color: props.fontColor as any,
      }}
    >
      {props.isLoading ? (
        <div className="loading-spinner" />
      ) : (
        <div>{props.text}</div>
      )}
    </div>
  );
}
