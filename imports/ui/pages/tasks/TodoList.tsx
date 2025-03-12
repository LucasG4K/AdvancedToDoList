import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { MyAppBar } from "../../components/myAppBar";
import { TasksTable } from "./components/tasksTable";
import { AddCircleOutlineOutlined, ArrowBackOutlined } from "@mui/icons-material";
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
        <Box>
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
            <TasksTable detailedTable={true} userId={user!._id} />
        </Box>
    );
};

export { TodoList };
