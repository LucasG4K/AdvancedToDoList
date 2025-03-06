import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Task, TaskStatus } from "/imports/api/Tasks/TaskTypes";

interface ITodoTableProps {
    actionsOn: boolean;
    tasks: Task[];
}

const TodoTable: React.FC<ITodoTableProps> = React.memo(({ tasks, actionsOn }) => {
    const getStatusColor = (status: TaskStatus): string => {
        switch (status) {
            case TaskStatus.COMPLETED:
                return "green";
            case TaskStatus.IN_PROGRESS:
                return "orange";
            case TaskStatus.REGISTERED:
            default:
                return "red";
        }
    };
    return (
        <TableContainer component={Paper} sx={{ width: "95%", margin: "auto", marginTop: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Título</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Última Modificação</strong></TableCell>
                        <TableCell><strong>Usuário</strong></TableCell>
                        {actionsOn && <TableCell><strong>Ações</strong></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task._id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell sx={{ color: getStatusColor(task.status) }}>
                                {task.status}
                            </TableCell>
                            <TableCell>{new Date(task.lastModified).toLocaleString()}</TableCell>
                            <TableCell>{task.userName}</TableCell>
                            {actionsOn && <TableCell><strong>Ações</strong></TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export { TodoTable };
