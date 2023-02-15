import Table from "../../../../common/components/table/table";
import CrownIcon from "../../../../common/images/icon/crownIcon";
import "./rankBoard.scss";

export default function RankBoard(props: {
  rows: { key: string; value: string }[][];
}) {
  return (
    <>
      <div className="rank-board-bg">
        <div className="rank-board">
          <div className="crown-icon">
            <CrownIcon height={150} width={150} />
          </div>
          <p className="rank-board-title">อันดับผู้เล่นทั้งหมด</p>
          <div className="rank-board-container">
            <Table
              columns={[
                { key: "name", value: "ชื่อผู้เล่น" },
                { key: "count", value: "เกมที่ชนะทั้งหมด" },
              ]}
              rows={props.rows}
            />
          </div>
        </div>
      </div>
    </>
  );
}
