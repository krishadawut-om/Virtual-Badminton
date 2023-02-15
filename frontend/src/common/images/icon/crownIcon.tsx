export default function CrownIcon(props: {
  width?: number;
  height?: number;
  color?: string;
  rotate?: number;
}) {
  return (
    <svg
      width={props.width ?? "208"}
      height={props.height ?? "199"}
      viewBox="0 0 208 199"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_78_816)">
        <path
          d="M163.425 30.1194C166.026 36.3049 163.431 43.2973 157.63 45.7361C157.565 45.7635 157.496 45.7508 157.431 45.7773L176.88 129.171C177.932 133.714 175.772 138.279 171.702 139.991L84.8871 176.49C80.8273 178.197 76.0432 176.564 73.5278 172.61L27.5563 100.39C27.4907 100.418 27.4473 100.469 27.1453 100.596C21.3445 103.035 14.5329 99.9968 11.9323 93.8113C9.33179 87.6258 12.1628 80.5341 17.7273 78.1946C23.2917 75.8552 30.3397 78.7935 32.9402 84.979C33.9995 87.4986 34.004 90.0972 33.4732 92.5215L65.4508 102.703C71.1274 104.511 76.7116 100.454 76.9584 94.3457L78.5221 55.7289C74.724 55.0027 71.2105 52.5258 69.5223 48.5104C66.9218 42.3249 69.7502 35.2342 75.5536 32.7943C81.357 30.3544 87.9296 33.4926 90.5302 39.6781C92.2184 43.6935 91.54 47.9328 89.3941 51.1613L118.082 77.0596C122.619 81.1555 129.426 80.0006 132.104 74.6834L147.2 44.711C145.326 43.2975 143.371 41.2199 142.417 38.9517C139.816 32.7634 142.409 25.775 148.212 23.3351C154.016 20.8951 160.824 23.9311 163.425 30.1194Z"
          fill="#FFFEFE"
        />
      </g>
      <defs>
        <clipPath id="clip0_78_816">
          <rect
            width="164"
            height="145"
            fill="white"
            transform="translate(0 64.5591) rotate(-22.8032)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
