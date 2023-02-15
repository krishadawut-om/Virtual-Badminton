import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ExitIcon from "../../images/icon/exitIcon";
import HistoryIcon from "../../images/icon/historyIcon";
import HomeIcon from "../../images/icon/homeIcon";
import QuestionMarkIcon from "../../images/icon/questionMarkIcon";
import RankIcon from "../../images/icon/rankIcon";
import {
  deleteUserDataFromStorage,
  getUserDataFromStorage,
} from "../../services/localStorage";

export default function BottomBar() {
  const navigate = useNavigate();
  const userData = getUserDataFromStorage();

  return (
    <div
      style={{
        width: "calc(100vw)",
        height: "55px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: "50px",
        paddingBottom: "15px",
      }}
    >
      <QuestionMarkIcon
        width={40}
        height={40}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/tutorial")}
      />
      <RankIcon
        width={40}
        height={40}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/rank")}
      />
      <HomeIcon
        width={75}
        height={90}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/home")}
      />

      <HistoryIcon
        width={40}
        height={40}
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (userData.id) {
            navigate("/history");
          } else {
            toast.error("Feature Not Support for Playing as a Guest!");
          }
        }}
      />
      <ExitIcon
        width={40}
        height={40}
        style={{ cursor: "pointer" }}
        onClick={() => {
          deleteUserDataFromStorage();
          navigate("/login");
        }}
      />
    </div>
  );
}
