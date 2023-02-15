export default function HomeIcon(props: {
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
      viewBox="0 0 97 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="48.5" cy="48.5" r="48.5" fill="#BC4D4D" />
      <path
        d="M67.6699 44.1922L49.9711 26.1043C49.8437 25.9737 49.6923 25.8701 49.5257 25.7995C49.359 25.7288 49.1804 25.6924 49 25.6924C48.8196 25.6924 48.641 25.7288 48.4743 25.7995C48.3077 25.8701 48.1563 25.9737 48.0289 26.1043L30.3301 44.1922C29.8145 44.7196 29.5223 45.4359 29.5223 46.1829C29.5223 47.7342 30.7555 48.9954 32.2723 48.9954H34.1371V61.9022C34.1371 62.68 34.7516 63.3084 35.5121 63.3084H46.25V53.4647H51.0625V63.3084H62.4879C63.2484 63.3084 63.8629 62.68 63.8629 61.9022V48.9954H65.7277C66.4582 48.9954 67.1586 48.701 67.6742 48.1693C68.7441 47.0706 68.7441 45.2909 67.6699 44.1922Z"
        fill="white"
      />
    </svg>
  );
}