import { FC } from 'react'
import { Box } from '@mui/material'
import { useTable } from 'react-table'

interface IColumn {
    Header: string
    accessor: string
}

interface Props {
    data: any[]
    columns: IColumn[]
}

export const Table: FC<Props> = ({ data, columns }) => {
    const tableInstance = useTable({ columns, data })

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                if (cell.column.id === 'picture') {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            <img
                                                src={cell.value}
                                                alt="Imagen"
                                            />
                                        </td>
                                    )
                                } else {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                }
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
