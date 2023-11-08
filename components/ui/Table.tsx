import { FC } from 'react'
import { Box, TableContainer } from '@mui/material'
import { useTable } from 'react-table'
import MaUTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { IUser } from '@/interfaces/User.interface'
import Image from 'next/image'
import { NoImageProfile } from '@/assets/svg'

interface IColumn {
    Header: string
    accessor: any
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
        <TableContainer sx={{ maxHeight: 'calc(100vh - 25vh)' }}>
            <MaUTable
                stickyHeader
                {...getTableProps()}
                sx={{ borderCollapse: 'collapse' }}>
                <TableHead>
                    {headerGroups.map((headerGroup, index) => (
                        <TableRow
                            {...headerGroup.getHeaderGroupProps()}
                            key={index}>
                            {headerGroup.headers.map((column) => (
                                <TableCell
                                    {...column.getHeaderProps()}
                                    key={column.id}>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map((row, rowIndex) => {
                        prepareRow(row)
                        return (
                            <TableRow
                                hover
                                {...row.getRowProps()}
                                key={rowIndex}
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    marginTop: 3,
                                }}>
                                {row.cells.map((cell, cellIndex) => {
                                    if (cell.column.id === 'picture') {
                                        return (
                                            <TableCell
                                                {...cell.getCellProps()}
                                                key={cellIndex}
                                                sx={{
                                                    border: 0,
                                                    padding: 0,
                                                    paddingBottom: 1,
                                                }}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        backgroundColor:
                                                            '#F0EFF0',
                                                        borderRadius: 10,
                                                        height: 60,
                                                        width: 60,
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    {cell.value === '' ? (
                                                        <NoImageProfile />
                                                    ) : (
                                                        <Image
                                                            src={cell.value}
                                                            alt="Imagen"
                                                            height={50}
                                                            width={50}
                                                        />
                                                    )}
                                                </div>
                                            </TableCell>
                                        )
                                    } else {
                                        return (
                                            <TableCell
                                                {...cell.getCellProps()}
                                                key={cellIndex}
                                                sx={{ border: 0, padding: 0 }}>
                                                {cell.render('Cell')}
                                            </TableCell>
                                        )
                                    }
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MaUTable>
        </TableContainer>
    )
}
