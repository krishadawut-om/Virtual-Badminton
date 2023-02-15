export default function RankIcon(props: {
  height?: number;
  width?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      style={props.style}
      onClick={props.onClick}
      width={props.width ?? "64"}
      height={props.height ?? "64"}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.33337 24H22.6667V56H5.33337V24Z"
        stroke="#983838"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6667 8H40.0001V56H22.6667V8Z"
        stroke="#983838"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M40 34.6665H57.3333V55.9998H40V34.6665Z"
        stroke="#983838"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
