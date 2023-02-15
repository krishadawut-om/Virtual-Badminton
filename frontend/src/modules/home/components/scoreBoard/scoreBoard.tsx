import "./scoreBoard.scss";

export default function ScoreBoard(props: {
  player1?: number;
  player2?: number;
}) {
  return (
    <div className="scoreboard">
      <div className="score-title">คะแนน</div>
      <div className="score-detail">
        <div className="score-detail-player1">
          <div>You</div>
          <div>{props.player1 ?? 0}</div>
        </div>
        <div className="score-detail-player2">
          <div>Bot</div>
          <div>{props.player2 ?? 0}</div>
        </div>
      </div>
    </div>
  );
}
