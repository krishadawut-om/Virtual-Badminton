import { useEffect, useState } from "react";
import ArrowIcon from "../../../../common/images/icon/arrowIcon";
import HandCloseIcon from "../../../../common/images/icon/handCloseIcon";
import { checkIsHandClose, timer } from "../gamePlay/utils/gameUtils";
import Speedometer from "../../../../common/components/speedometer/speedometer";

export enum Direction {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
  OTHERS,
}

export default function DirectionSelection(props: {
  handId?: string;
  speedometerId?: string;
  isStart?: boolean;
  height?: number;
  startPos?: { x: number; y: number };
  onSelect?: (d?: Direction, speed?: number) => void;
}) {
  const [currentDirection, setCurrentDirection] = useState<Direction>();
  const [handPosition, setHandPosition] = useState({
    x: props.startPos?.x ?? 0,
    y: props.startPos?.y ?? 0,
  });
  const [speedCount, setSpeedCount] = useState(1);
  const [isCountUp, setIsCountUp] = useState(true);
  const [isHandClose, setIsHandClose] = useState(true);

  useEffect(() => {
    if (isHandClose) {
      (async () => {
        if (isCountUp) {
          await timer(100);
          setSpeedCount(speedCount + 1);
        } else {
          await timer(100);
          setSpeedCount(speedCount - 1);
        }
        if (speedCount >= 4) {
          setIsCountUp(false);
        }
        if (speedCount <= 2) {
          setIsCountUp(true);
        }
      })();
    } else {
      props.onSelect(
        currentDirection,
        speedCount > 5 ? 5 : speedCount < 1 ? 1 : speedCount
      );
    }
  }, [speedCount]);

  function getElementPosition(elementId) {
    return {
      x: document.getElementById(elementId)?.getBoundingClientRect()?.x,
      y: document.getElementById(elementId)?.getBoundingClientRect()?.y,
    };
  }

  useEffect(() => {
    if (props.isStart ?? true)
      document.addEventListener("handsfree-data", async (event: any) => {
        const data = event.detail;
        let hand = 0;
        if (data.hands.landmarksVisible[1]) {
          hand = 1;
        } else if (data.hands.landmarksVisible[0]) {
          hand = 0;
        }
        if (data.hands.landmarksVisible[hand]) {
          if (data.hands.pointer[hand]) {
            setHandPosition({
              x: data.hands.pointer[hand].x + 70,
              y: data.hands.pointer[hand].y,
            });
          }
        }
        let arrowTop = getElementPosition("arrow-top");
        let arrowRight = getElementPosition("arrow-right");
        let arrowBottom = getElementPosition("arrow-bottom");
        let arrowLeft = getElementPosition("arrow-left");
        if (
          Math.abs(data.hands.pointer[hand].x - arrowTop.x - 70) < 200 &&
          Math.abs(data.hands.pointer[hand].y - arrowTop.y + 70) < 200
        ) {
          setCurrentDirection(Direction.TOP);
        } else if (
          Math.abs(data.hands.pointer[hand].x - arrowRight.x - 150 - 300) <
            200 &&
          Math.abs(data.hands.pointer[hand].y - arrowRight.y + 70) < 200
        ) {
          setCurrentDirection(Direction.RIGHT);
        } else if (
          Math.abs(data.hands.pointer[hand].x - arrowBottom.x - 70) < 200 &&
          Math.abs(data.hands.pointer[hand].y - arrowBottom.y + 70) < 200
        ) {
          setCurrentDirection(Direction.BOTTOM);
        } else if (
          Math.abs(data.hands.pointer[hand].x - arrowLeft.x + 300) < 200 &&
          Math.abs(data.hands.pointer[hand].y - arrowLeft.y + 70) < 100
        ) {
          setCurrentDirection(Direction.LEFT);
        } else {
          setCurrentDirection(null);
        }
        if (
          data.hands.landmarksVisible[hand] &&
          !checkIsHandClose(data.hands.landmarks[hand])
        ) {
          setIsHandClose(false);
        }
      });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "0",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        id="arrow-top"
        style={{
          position: "absolute",
          zIndex: "-1",
          top: 80 + 15,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ArrowIcon
          color={currentDirection === Direction.TOP ? "red" : "white"}
          rotate={0}
        />
      </div>
      <div
        id="arrow-left"
        style={{
          position: "absolute",
          zIndex: "-1",
          top: "50%",
          left: `calc(50% - ${props.height / 2}px)`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <ArrowIcon
          color={currentDirection === Direction.LEFT ? "red" : "white"}
          rotate={-90}
        />
      </div>
      <div
        id="arrow-right"
        style={{
          position: "absolute",
          zIndex: "-1",
          top: "50%",
          left: `calc(50% + ${props.height / 2}px)`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <ArrowIcon
          color={currentDirection === Direction.RIGHT ? "red" : "white"}
          rotate={90}
        />
      </div>
      <div
        id="arrow-bottom"
        style={{
          position: "absolute",
          zIndex: "-1",
          top: `calc(${props.height}px - 15px)`,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ArrowIcon
          color={currentDirection === Direction.BOTTOM ? "red" : "white"}
          rotate={180}
        />
      </div>
      <div
        id={props.handId}
        style={{
          marginLeft: `calc(${handPosition.x}px - ${window.innerWidth / 2}px)`,
          marginTop: `${handPosition.y}px`,
        }}
      >
        <HandCloseIcon height={250} width={250} />
      </div>
      <div
        id={props.speedometerId}
        style={{
          position: "absolute",
          zIndex: "-1",
          top: "15px",
          right: "15px",
        }}
      >
        <Speedometer
          value={speedCount > 5 ? 5 : speedCount < 1 ? 1 : speedCount}
        />
      </div>
    </div>
  );
}
