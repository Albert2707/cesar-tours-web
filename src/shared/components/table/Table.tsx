import { FC } from "react";
import "./Table.scss";
import { TableParameters } from "@/shared/interfaces/interfaces";
interface TableProps {
  data: TableParameters[];
  columns: string[];
}
export const Table: FC<TableProps> = ({ data, columns }) => {
  return (
    <div className="table">
      <div className="tbl-header">
        {columns.map((e) => (
          <div key={crypto.randomUUID()} className="cell">
            {e}
          </div>
        ))}
      </div>
      <div className="tbl-body">
        {data.map((e) => (
          <div key={crypto.randomUUID()} className="tbl-body-row">
            <div className="cell">{e[e.key]}</div>
            <div className="cell">{e[e.value]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
