import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { TaskModel } from "/imports/api/Tasks/TaskTypes";
import { useParams } from "react-router-dom";

interface ITask {
    tasks?: TaskModel[];
    isLoading: boolean;
    editing: boolean;
}

const Task: React.FC<ITask> = ({ tasks = [], isLoading, editing }) => {
    const { id } = useParams(); // id dever ser o mesmo nome da rota definida no App.tsx
    const task = editing ? tasks.find(value => value._id === id) : undefined;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (editing && !task) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">
                    Tarefa não encontrada!
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography>Teste</Typography>
            {editing && task && (
                <>
                    <Typography>{task.title}</Typography>
                    <Typography>{task.description}</Typography>
                </>
            )}
        </Box>
    );
};

export { Task };
