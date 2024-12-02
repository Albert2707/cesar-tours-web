import { FC } from "react";

interface TableProps<T> {
    data: T[];
    columns: string[]
}
export const Table: FC<TableProps<any>> = ({ data, columns }) => {

    return (
        <table>
            <thead>

                <tr>
                    {columns.map((e: string) => (
                        <th key={crypto.randomUUID()}>{e}</th>
                    ))}
                </tr>
                    </thead>
                <tbody>
                    {data.map((e: any) => (
                        <tr key={crypto.randomUUID()}>
                            <td >{e.type}</td>
                            <td >{e.total}</td>
                        </tr>
                    ))}
                </tbody>
        </table>
    );
};