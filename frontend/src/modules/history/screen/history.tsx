import { useEffect, useState } from "react";
import BottomBar from "../../../common/components/bottomBar/bottomBar";
import GameResult, {
  GameResultModel,
} from "../../../common/components/gameResult/gameResult";
import LoadingSpinner from "../../../common/components/loadingSpinner/loadingSpinner";
import ArrowTapIcon from "../../../common/images/icon/arrowTapIcon";
import { GameModel } from "../../../common/models/gameModel";
import { useGetGameHistoriesMutation } from "../../../common/services/gameService";
import { getUserDataFromStorage } from "../../../common/services/localStorage";
import HistoryBoard from "../components/historyBoard/historyBoard";
import "./history.scss";

export default function History() {
  const userData = getUserDataFromStorage();
  const [getGameHistories, getGameHistoriesResult] =
    useGetGameHistoriesMutation({});
  const [selectedDetail, setSelectedDetail] = useState<GameModel>();

  useEffect(() => {
    getGameHistories(userData.id);
  }, []);

  return (
    <div className="rank">
      {!getGameHistoriesResult.isSuccess ? (
        <LoadingSpinner />
      ) : (
        <HistoryBoard
          onClickRow={(e) => {
            setSelectedDetail(
              getGameHistoriesResult.data.find((e2) => e2.id === e[0]["value"])
            );
          }}
          rows={getGameHistoriesResult.data?.map((e) => [
            { key: "id", value: e.id },
            {
              key: "result",
              value:
                e.userScore > e.opponentScore
                  ? "ชนะ"
                  : e.userScore < e.opponentScore
                  ? "แพ้"
                  : "เสมอ",
            },
            { key: "score", value: `${e.userScore} - ${e.opponentScore}` },
            { key: "time", value: `${e.totalPlayingTime ?? 0} นาที` },
            {
              key: "action",
              value: <ArrowTapIcon height={20} width={20} />,
            },
          ])}
        />
      )}
      {selectedDetail && (
        <GameResult
          data={
            {
              botScore: selectedDetail.opponentScore,
              playerScore: selectedDetail.userScore,
              playTime: selectedDetail.totalPlayingTime.toPrecision(3),
              shots: selectedDetail.shots,
            } as GameResultModel
          }
          onClickClose={() => setSelectedDetail(undefined)}
        />
      )}
      <div
        style={{
          position: "absolute",
          zIndex: "3",
          bottom: "0",
        }}
      >
        <BottomBar />
      </div>
    </div>
  );
}
