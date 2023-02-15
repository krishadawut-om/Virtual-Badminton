import LevelCard, { Level } from "../levelCard/levelCard";
import "./levelSelection.scss";

export default function LevelSelection(props: {
  onClick?: (e: Level) => void;
}) {
  return (
    <div className="level-selection-bg">
      <div className="level-selection">
        <p className="level-selection-title">เลือกระดับความยากในการเล่น</p>
        <div className="levels-container">
          <LevelCard
            level={Level.EASY}
            onClick={() => props.onClick(Level.EASY)}
          />
          <LevelCard
            level={Level.MEDIUM}
            onClick={() => props.onClick(Level.MEDIUM)}
          />
          <LevelCard
            level={Level.HARD}
            onClick={() => props.onClick(Level.HARD)}
          />
        </div>
      </div>
    </div>
  );
}
