import Table from "../../../../common/components/table/table";
import "./historyBoard.scss";

export default function HistoryBoard(props: {
  rows: { key: string; value: any }[][];
  onClickRow?: (
    items: {
      key: string;
      value: string;
    }[]
  ) => void;
}) {
  return (
    <>
      <div className="history-board-bg">
        <div className="history-board">
          <p className="history-board-title">ประวัติการเล่นทั้งหมด</p>
          <div className="history-board-container">
            <Table
              clickableRow
              onClickRow={props.onClickRow}
              columns={[
                { key: "result", value: "ผล" },
                { key: "score", value: "คะแนน" },
                { key: "time", value: "เวลาในการเล่น" },
                { key: "action", value: "", width: "50px" },
              ]}
              rows={props.rows}
            />
          </div>
        </div>
      </div>
    </>
  );
}
