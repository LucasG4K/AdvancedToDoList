import React from "react";
import { Box, Button, CircularProgress, InputAdornment, Menu, TextField } from "@mui/material";
import { MyAppBar } from "../../components/myAppBar";
import { TasksTable } from "./components/tasksTable";
import { AddCircleOutlineOutlined, ArrowBackOutlined, SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../providers/userProvider";
import { useTasks } from "../../../providers/taskProvider";

const TodoList: React.FC = () => {
    const { user } = useUser();
    const { isLoading } = useTasks();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <MyAppBar user={user!} title="TAREFAS" />
            <Box sx={{ display: "flex", justifyContent: "space-between", m: 2 }}>
                <Button
                    startIcon={<ArrowBackOutlined />}
                    sx={{ color: "black" }}
                    onClick={() => navigate(-1)}
                >
                    Voltar
                </Button>
                <Button
                    startIcon={<AddCircleOutlineOutlined />}
                    sx={{ color: "black" }}
                    onClick={() => navigate("/todo-list/new-task")}
                >
                    Nova Tarefa
                </Button>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', width: '50vw', mx:'auto'}}>
                <TextField fullWidth label={'Pesquisar Tarefa'} InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <SearchOutlined />
                    </InputAdornment>)
                }} />
                <Menu open={false}>
                    
                </Menu>
            </Box>
            <TasksTable detailedTable={true} userId={user!._id} />
        </>
    );
};

export { TodoList };
