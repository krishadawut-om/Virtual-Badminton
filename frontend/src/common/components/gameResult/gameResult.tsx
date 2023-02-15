import Button from "../button/button";
import "./gameResult.scss";
import Confetti from "react-confetti";
import CloseIcon from "../../images/icon/closeIcon";
import { Shots } from "../../models/gameModel";

export interface GameResultModel {
  playerScore: number;
  botScore: number;
  playTime: string;
  shots: Shots;
}

export default function GameResult(props: {
  data?: GameResultModel;
  onClickRestart?: () => void;
  onClickClose?: () => void;
}) {
  function resultText(tile: string, text: string, isEmphasis?: boolean) {
    return (
      <div className="result-text">
        <p style={{ fontSize: isEmphasis ? "18px" : "14px" }}>{tile}</p>
        <p style={{ fontSize: isEmphasis ? "18px" : "14px" }}>{text}</p>
      </div>
    );
  }
  return (
    <>
      <div className="game-result-bg">
        <div className="game-result">
          <div className="game-result-title-container">
            <p className="game-result-title">สรุปการเล่นในครั้งนี้</p>
            {props.onClickClose && <div style={{ flex: "1" }} />}
            {props.onClickClose && (
              <CloseIcon
                color="white"
                style={{ marginRight: "0.5rem", cursor: "pointer" }}
                onClick={props.onClickClose}
              />
            )}
          </div>
          <div className="game-result-container">
            {[
              resultText(
                "ผลการเล่น",
                (props.data?.playerScore ?? 0) > (props.data?.botScore ?? 0)
                  ? "ชนะ"
                  : (props.data?.playerScore ?? 0) < (props.data?.botScore ?? 0)
                  ? "แพ้"
                  : "เสมอ",
                true
              ),
              resultText(
                "คะแนน",
                `${props.data?.playerScore ?? 0} - ${
                  props.data?.botScore ?? 0
                }`,
                true
              ),
            ]}
            <div className="seperator" />
            {[
              resultText(
                "จำนวนลูกทั้งหมดที่ตี",
                `${
                  props.data?.shots?.clear +
                  props.data?.shots?.drive +
                  props.data?.shots?.drop +
                  props.data?.shots?.smash
                } ลูก`
              ),
              resultText("ลูกตบ", `${props.data?.shots?.smash ?? 0} ลูก`),
              resultText("ลูกหยอด", `${props.data?.shots?.drop ?? 0} ลูก`),
              resultText("ลูกงัดโยน", `${props.data?.shots?.clear ?? 0} ลูก`),
              resultText("ลูกตัด", `${props.data?.shots?.drive ?? 0} ลูก`),
            ]}
            <div className="seperator" />
            {[
              resultText(
                "เวลาในการเล่น",
                `${props.data?.playTime ?? 0} นาที`,
                true
              ),
            ]}
          </div>
          {props.onClickRestart && (
            <div
              style={{
                position: "absolute",
                transform: "translateY(30px)",
                zIndex: "10",
                bottom: "0",
              }}
            >
              <Button text={"เล่นอีกครั้ง"} onClick={props.onClickRestart} />
            </div>
          )}
        </div>
      </div>
      {(props.data?.playerScore ?? 0) > (props.data?.botScore ?? 0) &&
        !props.onClickClose && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
    </>
  );
}
