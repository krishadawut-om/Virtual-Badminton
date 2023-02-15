export default function StarIcon(props: {
  height?: number;
  width?: number;
  color?: string;
}) {
  return (
    <svg
      width={props.width ?? "60"}
      height={props.height ?? "53"}
      viewBox="0 0 60 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5" filter="url(#filter0_d_302_320)">
        <g filter="url(#filter1_i_302_320)">
          <path
            d="M55.3125 17.9688H35.9906L30 1.5625L24.0094 17.9688H4.6875L20.2969 28.125L14.3062 44.5312L30 34.375L45.6094 44.5312L39.6188 28.125L55.3125 17.9688Z"
            fill={props.color ?? "white"}
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_302_320"
          x="-1"
          y="0"
          width="62"
          height="58"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_302_320"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_302_320"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_i_302_320"
          x="4.6875"
          y="1.5625"
          width="50.625"
          height="46.9688"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_302_320"
          />
        </filter>
      </defs>
    </svg>
  );
}
