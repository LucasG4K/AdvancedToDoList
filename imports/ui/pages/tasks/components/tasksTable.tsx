import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, TablePagination } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useTasks } from "/imports/providers/taskProvider";
import { useNavigate } from "react-router-dom";
import ChangeStatus from "./changeStatus";

interface ITasksTableProps {
    detailedTable: boolean;
    userId?: string
}

const TasksTable: React.FC<ITasksTableProps> = React.memo(({ userId, detailedTable }) => {

    const { tasks, page, totalPages, setPage } = useTasks();
    const editTaskNavigate = useNavigate();

    return (
        <TableContainer component={Paper} sx={{ width: '95%', margin: 'auto', marginTop: 2, overflowX: 'auto' }}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Título</strong></TableCell>
                        <TableCell><strong>Descrição</strong></TableCell>
                        <TableCell><strong>Usuário</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Última Modificação</strong></TableCell>
                        {detailedTable && <TableCell><strong>Ações</strong></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task._id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        width: '200px',
                                        whiteSpace: detailedTable ? '' : 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {task.description}
                                </Box>
                            </TableCell>
                            <TableCell>{task.userName}</TableCell>
                            <ChangeStatus task={task} />
                            <TableCell>
                                {new Date(task.lastModified).toLocaleString('pt-BR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </TableCell>
                            {detailedTable && (
                                <TableCell>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                                        <IconButton onClick={() => editTaskNavigate(`/todo-list/edit/${task._id}`)} disabled={task.userId !== userId} sx={{ color: 'green' }}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        <IconButton onClick={() => console.log('excluir tarefa')} disabled={task.userId !== userId} sx={{ color: 'red' }}>
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {detailedTable &&
                <TablePagination
                    component="div"
                    count={totalPages * 4}
                    page={page - 1} // Material-UI usa index 0
                    onPageChange={(_, newPage) => setPage(newPage + 1)}
                    rowsPerPage={4}
                    rowsPerPageOptions={[4]} // Fixa em 4 por página
                />}
        </TableContainer>
    );
});

export { TasksTable };
