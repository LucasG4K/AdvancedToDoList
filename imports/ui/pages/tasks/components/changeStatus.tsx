import React, { useState } from 'react';
import { Box, TableCell, Menu, MenuItem } from '@mui/material';
import { TaskModel, TaskStatusModel } from '/imports/api/Tasks/TaskModel';
import { Circle, KeyboardArrowDownOutlined } from '@mui/icons-material';
import { useTasks } from '/imports/providers/taskProvider';

interface Props {
    task: TaskModel;
}

const ChangeStatus = ({ task }: Props) => {

    const { handleChangeStatus } = useTasks();
    const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

    const decodeStatus = (status: TaskStatusModel): [string, string] => {
        switch (status) {
            case TaskStatusModel.REGISTERED:
                return ['Cadastrada', 'red'];
            case TaskStatusModel.IN_PROGRESS:
                return ['Em Andamento', 'orange'];
            case TaskStatusModel.COMPLETED:
                return ['Concluída', 'green'];
            default:
                return ['', ''];
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

    return (
        <TableCell>
            <Box
                sx={{
                    width: '190px',
                    color: decodeStatus(task.status)[1],
                    cursor: 'pointer',
                    padding: '2px',
                    border: '1px solid gray',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1, // Espaçamento entre ícone e texto
                    '&:hover': { backgroundColor: '#f0f0f0' }, // Efeito hover
                }}
                onClick={(e) => handleOpenMenu(e, task._id!)}
            >
                <Circle sx={{ verticalAlign: 'middle', fontSize: '14px' }} />
                {decodeStatus(task.status)[0]}
                <KeyboardArrowDownOutlined sx={{ fontSize: '18px', opacity: 0.7 }} />
            </Box>

            <Menu
                anchorEl={anchorEl[task._id!]}
                open={Boolean(anchorEl[task._id!])}
                onClose={() => handleCloseMenu(task._id!)}
            >
                {getNextStatusOptions(task.status).map((newStatus) => (
                    <MenuItem
                        dense
                        key={newStatus}
                        onClick={() => {handleChangeStatus(task._id!, newStatus); }}
                        sx={{ width: '100%' }}
                    >
                        <Circle
                            sx={{
                                verticalAlign: 'middle',
                                fontSize: '14px',
                                color: decodeStatus(newStatus)[1],
                                m: 1,
                            }}
                        />
                        {decodeStatus(newStatus)[0]}
                    </MenuItem>
                ))}
            </Menu>
        </TableCell>
    );
};

export default ChangeStatus;
