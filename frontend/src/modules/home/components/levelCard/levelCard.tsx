import AngryFaceIcon from "../../../../common/images/icon/angryFaceIcon";
import NutralFaceIcon from "../../../../common/images/icon/nutralFaceIcon";
import SmileFaceIcon from "../../../../common/images/icon/smileFaceIcon";
import "./levelCard.scss";

export enum Level {
  EASY,
  MEDIUM,
  HARD,
}

export default function LevelCard(props: {
  level: Level;
  onClick?: (e: Level) => void;
}) {
  function getText() {
    switch (props.level) {
      case Level.EASY:
        return "ง่าย";
      case Level.MEDIUM:
        return "ปานกลาง";
      case Level.HARD:
        return "ยาก";
    }
  }
  function getIcon() {
    switch (props.level) {
      case Level.EASY:
        return (
          <div onClick={() => props.onClick(Level.EASY)}>
            <SmileFaceIcon height={100} />
          </div>
        );
      case Level.MEDIUM:
        return (
          <div onClick={() => props.onClick(Level.MEDIUM)}>
            <NutralFaceIcon height={100} />
          </div>
        );
      case Level.HARD:
        return (
          <div onClick={() => props.onClick(Level.HARD)}>
            <AngryFaceIcon height={100} />
          </div>
        );
    }
  }

  return (
    <div className="level-card" onClick={() => props.onClick(props.level)}>
      <p className="level-card-title">{getText()}</p>
      <div style={{ padding: "2rem 1rem" }}>{getIcon()}</div>
    </div>
  );
}
