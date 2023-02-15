export default function ArrowIcon(props: {
  width?: number;
  height?: number;
  color?: string;
  rotate?: number;
}) {
  return (
    <div style={{ transform: `rotate(${props.rotate}deg)` }}>
      <svg
        width={props.width ?? "156"}
        height={props.height ?? "156"}
        viewBox="0 0 156 156"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M156 78C156 34.9908 121.009 -1.5295e-06 78 -3.40949e-06C34.9908 -5.28948e-06 -1.5295e-06 34.9908 -3.40949e-06 78C-5.28948e-06 121.009 34.9908 156 78 156C121.009 156 156 121.009 156 78ZM70.2 117L70.2 78L39 78L78 39L117 78L85.8 78L85.8 117L70.2 117Z"
          fill={props.color ?? "white"}
          fill-opacity="0.5"
        />
      </svg>
    </div>
  );
}
