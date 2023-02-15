import "./textfield.scss";

export default function Textfield(props: {
  onChange?: (e: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <input
        className="input"
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        type={props.type ?? "text"}
      />
    </div>
  );
}
