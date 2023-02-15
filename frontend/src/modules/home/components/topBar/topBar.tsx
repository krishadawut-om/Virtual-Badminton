import StarIcon from "../../../../common/images/icon/starIcon";
import "./topBar.scss";

export default function TopBar(props: {
  username?: string;
  playedTime?: number;
}) {
  return (
    <div className="topBar">
      <p className="title">สวัสดี {props.username ?? "Username"}</p>
      <div className="playing-time-container">
        <p className="title">ระยะเวลาที่เล่นในวันนี้</p>
        <div className="star-container">
          <StarIcon
            height={35}
            width={35}
            color={props.playedTime >= 10 ? "yellow" : "white"}
          />
          <StarIcon
            height={35}
            width={35}
            color={props.playedTime >= 20 ? "yellow" : "white"}
          />
          <StarIcon
            height={35}
            width={35}
            color={props.playedTime >= 30 ? "yellow" : "white"}
          />
        </div>
        <div className="timer">
          <div
            className="inner-timer"
            style={{
              width:
                ((props.playedTime < 4 && props.playedTime > 0
                  ? 4
                  : props.playedTime > 30
                  ? 30
                  : props.playedTime ?? 0) /
                  30) *
                  100 +
                "%",
            }}
          />
          <p className="timer-text">
            {props.playedTime?.toPrecision(3) ?? 0} นาที
          </p>
        </div>
      </div>
    </div>
  );
}
