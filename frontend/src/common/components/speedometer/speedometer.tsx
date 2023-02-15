import "./speedometer.scss";

export default function Speedometer(props: { value: number }) {
  return (
    <div id="speedometer">
      <div className="wrapper">
        <div className="indicator-wrapper">
          <div className="indicator-wrapper-inner">
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
              }}
            ></div>
            <div
              className="needle"
              style={{
                transform: `rotate(${-36 + (props.value - 2) * 36}deg)`,
              }}
            ></div>
          </div>
        </div>
        <div className="bar bar-1"></div>
        <div className="bar bar-2"></div>
        <div className="bar bar-3"></div>
        <div className="bar bar-4"></div>
        <div className="bar bar-5"></div>
      </div>
    </div>
  );
}
