import "./gameText.scss";

export default function GameText(props: { text: string }) {
  return (
    <div className="container">
      <div className="lines"></div>
      <h1>
        <span>{props.text}</span>
        <span>{props.text}</span>
      </h1>
    </div>
  );
}
