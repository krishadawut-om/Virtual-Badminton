export default function ArrowTapIcon(props: {
  width?: number;
  height?: number;
  color?: string;
  rotate?: number;
}) {
  return (
    <svg
      width={props.width ?? "31"}
      height={props.height ?? "56"}
      viewBox="0 0 31 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.0999756 47.5002L19.35 28.0002L0.0999756 8.5002L3.94998 0.700195L30.9 28.0002L3.94998 55.3002L0.0999756 47.5002Z"
        fill="white"
      />
    </svg>
  );
}
