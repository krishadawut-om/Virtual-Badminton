export default function HistoryIcon(props: {
  width?: number;
  height?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      style={props.style}
      onClick={props.onClick}
      width={props.width ?? "64"}
      height={props.height ?? "64"}
      viewBox="0 0 53 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.35413 5.896C2.35413 4.88486 2.7558 3.91513 3.47078 3.20015C4.18576 2.48517 5.15549 2.0835 6.16663 2.0835H36.6666C37.6778 2.0835 38.6475 2.48517 39.3625 3.20015C40.0774 3.91513 40.4791 4.88486 40.4791 5.896V52.9168H6.16663C5.15549 52.9168 4.18576 52.5152 3.47078 51.8002C2.7558 51.0852 2.35413 50.1155 2.35413 49.1043V5.896ZM40.4791 27.5002C40.4791 26.8261 40.7469 26.1796 41.2236 25.7029C41.7002 25.2263 42.3467 24.9585 43.0208 24.9585H48.1041C48.7782 24.9585 49.4247 25.2263 49.9014 25.7029C50.378 26.1796 50.6458 26.8261 50.6458 27.5002V49.1043C50.6458 50.1155 50.2441 51.0852 49.5291 51.8002C48.8141 52.5152 47.8444 52.9168 46.8333 52.9168H40.4791V27.5002Z"
        stroke="#983838"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M9.97913 21.1458H25.2291M9.97913 12.25H20.1458H9.97913Z"
        stroke="#983838"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
