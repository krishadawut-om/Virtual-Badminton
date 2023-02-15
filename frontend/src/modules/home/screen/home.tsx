import { useEffect, useState } from "react";
import BottomBar from "../../../common/components/bottomBar/bottomBar";
import GameResult, {
  GameResultModel,
} from "../../../common/components/gameResult/gameResult";
import { Level } from "../components/levelCard/levelCard";
import LevelSelection from "../components/levelSelection/levelSelection";
import HandDetectionAlert from "../components/handDetectionPopup/handDetectionAlert";
import GamePlay from "../components/gamePlay/gamePlay";
import TopBar from "../components/topBar/topBar";
import { getUserDataFromStorage } from "../../../common/services/localStorage";
import { useGetTotalPlayingTimeMutation } from "../../../common/services/gameService";

export default function Home() {
  const [isHandDetected, setIsHandDetected] = useState(false);
  const [level, setLevel] = useState<Level>();
  const [gameResult, setGameResult] = useState<GameResultModel>();
  const userData = getUserDataFromStorage();
  const [getTotalPlayingTime, getTotalPlayingTimeResult] =
    useGetTotalPlayingTimeMutation({
      fixedCacheKey: "home-page-total-playing-time",
    });

  useEffect(() => {
    if (userData.id) {
      getTotalPlayingTime(userData.id);
    }

    let list = [];
    let isHandDetected = false;
    document.addEventListener("handsfree-data", async (event: any) => {
      const data = event.detail;
      list.length < 10
        ? list.push(
            data.hands.landmarksVisible[1] || data.hands.landmarksVisible[0]
          )
        : list.shift();
      if (
        list.every((e) => e === true) ||
        (list.every((e) => e === false) && isHandDetected !== list[0])
      ) {
        isHandDetected = list[0];
        setIsHandDetected(list[0]);
      }
    });
  }, []);

  return (
    <>
      {userData.token && !(level !== undefined && gameResult === undefined) && (
        <div
          style={{
            position: "absolute",
            zIndex: "3",
            top: "0",
          }}
        >
          <TopBar
            username={userData.username}
            playedTime={getTotalPlayingTimeResult.data}
          />
        </div>
      )}
      <div>
        {!isHandDetected && level !== undefined && gameResult === undefined && (
          <HandDetectionAlert />
        )}
        <GamePlay
          isStart={level !== undefined && gameResult === undefined}
          level={level}
          onDone={(e) => setGameResult(e)}
        />
        {level === undefined && (
          <LevelSelection
            onClick={(e) => {
              setLevel(e);
            }}
          />
        )}
        {gameResult !== undefined && (
          <GameResult
            data={gameResult}
            onClickRestart={() => {
              setGameResult(undefined);
              setLevel(undefined);
            }}
          />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: "3",
          bottom: "0",
        }}
      >
        <BottomBar />
      </div>
    </>
  );
}
