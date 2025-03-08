import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Menu, MenuItem } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { TaskModel, TaskStatusModel } from "/imports/api/Tasks/TaskTypes";
import { Circle, KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

interface ITodoTableProps {
    actionsOn: boolean;
    userId?: string
    tasks: TaskModel[];
}

const TodoTable: React.FC<ITodoTableProps> = React.memo(({ tasks, userId, actionsOn }) => {

    const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

    const decodeStatus = (status: TaskStatusModel): string[] => { // status - cor
        switch (status) {
            case TaskStatusModel.COMPLETED:
                return ['CONCLUÍDA', 'green'];
            case TaskStatusModel.IN_PROGRESS:
                return ['EM ANDAMENTO', 'orange'];
            case TaskStatusModel.REGISTERED:
            default:
                return ['CADASTRADA', 'red'];
        }
    };

    const getNextStatusOptions = (status: TaskStatusModel): TaskStatusModel[] => {
        switch (status) {
            case TaskStatusModel.REGISTERED:
                return [TaskStatusModel.IN_PROGRESS]; // Cadastrada -> Em Andamento
            case TaskStatusModel.IN_PROGRESS:
                return [TaskStatusModel.REGISTERED, TaskStatusModel.COMPLETED]; // Em Andamento -> Cadastrada / Concluída
            case TaskStatusModel.COMPLETED:
                return [TaskStatusModel.IN_PROGRESS]; // Concluída -> Em Andamento
            default:
                return [];
        }
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>, taskId: string) => {
        setAnchorEl((prev) => ({ ...prev, [taskId]: event.currentTarget }));
    };

    const handleCloseMenu = (taskId: string) => {
        setAnchorEl((prev) => ({ ...prev, [taskId]: null }));
    };

    const handleChangeStatus = (_id: string, newStatus: TaskStatusModel) => {
        Meteor.call("task.status", { _id, taskStatus: newStatus }, (error: any) => {
            if (error) {
                console.error("Erro ao atualizar status:", error);
                alert("Erro ao atualizar a tarefa: " + error.reason);
            }
            Meteor.subscribe("tasks");
        });
        handleCloseMenu(_id);
    };

    const editTaskNavigate = useNavigate();

    return (
        <TableContainer component={Paper} sx={{ width: '95%', margin: 'auto', marginTop: 2, overflowX: 'auto' }}>
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
                            <TableCell>
                                <Box
                                    sx={{
                                        color: decodeStatus(task.status)[1],
                                        cursor: "pointer",
                                        border: "1px solid gray",
                                        borderRadius: "16px",
                                        padding: "6px 12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,  // Espaçamento entre ícone e texto
                                        "&:hover": { backgroundColor: "#f0f0f0" }  // Efeito hover
                                    }}
                                    onClick={(e) => handleOpenMenu(e, task._id)}
                                >
                                    <Circle sx={{ verticalAlign: "middle", fontSize: "14px" }} />
                                    {decodeStatus(task.status)[0]}
                                    <KeyboardArrowDownOutlined sx={{ fontSize: "18px", opacity: 0.7 }} />
                                </Box>
                            </TableCell>

                            <Menu
                                anchorEl={anchorEl[task._id]}
                                open={Boolean(anchorEl[task._id])}
                                onClose={() => handleCloseMenu(task._id)}
                            >
                                {getNextStatusOptions(task.status).map((newStatus) => (
                                    <MenuItem key={newStatus} onClick={() => handleChangeStatus(task._id, newStatus)} sx={{ width: '100%' }}>
                                        <Circle sx={{ verticalAlign: "middle", fontSize: "14px", color: decodeStatus(newStatus)[1], m: 1, }} />
                                        {decodeStatus(newStatus)[0]}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <TableCell>
                                {new Date(task.lastModified).toLocaleString('pt-BR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </TableCell>
                            {actionsOn && (
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
        </TableContainer>
    );
});

export { TodoTable };
