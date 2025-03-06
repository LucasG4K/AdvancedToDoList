import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Task, TaskStatus } from "/imports/api/Tasks/TaskTypes";

interface ITodoTableProps {
    actionsOn: boolean;
    tasks: Task[];
}

const TodoTable: React.FC<ITodoTableProps> = React.memo(({ tasks, actionsOn }) => {
    
    const decodeStatus = (status: TaskStatus): string[] => { // status - cor
        switch (status) {
            case TaskStatus.COMPLETED:
                return ['COMPLETA', 'green'];
            case TaskStatus.IN_PROGRESS:
                return ['EM ANDAMENTO', 'orange'];
            case TaskStatus.REGISTERED:
            default:
                return ['CADASTRADA', 'red'];
        }
    };

    return (
        <TableContainer component={Paper} sx={{ width: '95%', margin: 'auto', marginTop: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Título</strong></TableCell>
                        <TableCell><strong>Usuário</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Última Modificação</strong></TableCell>
                        {actionsOn && <TableCell><strong>Ações</strong></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task._id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.userName}</TableCell>
                            <TableCell sx={{ color: decodeStatus(task.status)[1] }}>
                                {decodeStatus(task.status)[0]}
                            </TableCell>
                            <TableCell>{new Date(task.lastModified).toLocaleString()}</TableCell>
                            {actionsOn && <TableCell><strong>Ações</strong></TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export { TodoTable };
