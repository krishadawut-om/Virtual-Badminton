import "./table.scss";

export default function Table(props: {
  columns: Array<{ key: string; value: string; width?: string }>;
  rows: Array<Array<{ key: string; value: any }>>;
  checkable?: boolean;
  onChange?: (items: Array<Array<{ key: string; value: string }>>) => void;
  onClickRow?: (
    items: Array<{ key: string; value: string }> | undefined
  ) => void;
  clickableRow?: boolean;
  height?: string;
  hideControlBar?: boolean;
  noSpace?: boolean;
}) {
  return (
    <div>
      <table className={"table"}>
        <thead>
          <tr>
            {props.columns.map((e, i) => {
              return <th key={i}>{e.value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows?.map((e, i) => (
            <tr key={i} style={{ cursor: props.clickableRow ? "pointer" : "" }}>
              {props.columns.map((column, i) => (
                <td
                  key={i}
                  onClick={() => props.onClickRow?.(e)}
                  style={{
                    width: column.width,
                  }}
                >
                  {e.filter((e) => e.key === column.key)?.[0]?.value || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
