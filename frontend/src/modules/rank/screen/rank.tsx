import { useEffect } from "react";
import BottomBar from "../../../common/components/bottomBar/bottomBar";
import LoadingSpinner from "../../../common/components/loadingSpinner/loadingSpinner";
import { useGetLeaderboardMutation } from "../../../common/services/gameService";
import RankBoard from "../components/rankBoard/rankBoard";
import "./rank.scss";

export default function Rank() {
  const [getLeaderboard, getLeaderboardResult] = useGetLeaderboardMutation({});

  useEffect(() => {
    getLeaderboard({});
  }, []);

  return (
    <div className="rank">
      {!getLeaderboardResult.isSuccess ? (
        <LoadingSpinner />
      ) : (
        <RankBoard
          rows={getLeaderboardResult.data?.map((e) => [
            { key: "name", value: e.username },
            { key: "count", value: e.totalWinningGames.toString() },
          ])}
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
