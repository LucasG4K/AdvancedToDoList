import React, { ChangeEvent } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { MyAppBar } from "../../components/myAppBar";
import { TaskList } from "./components/taskList";
import { AddCircleOutlineOutlined, ArrowBackOutlined, SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../providers/userProvider";
import { useTasks } from "../../../providers/taskProvider";
import { LoadingScreen } from "../../components/loadingScreen";

const TodoList: React.FC = React.memo(() => {
    const { user } = useUser();
    const { isLoadingTasks, handleSearch } = useTasks();

    if (isLoadingTasks) {
        return <LoadingScreen />
    }

    const navigate = useNavigate();

    return (
        <>
            <MyAppBar title="TAREFAS" />
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
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '50vw', mx: 'auto' }}>
                <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)} fullWidth label={'Pesquisar Tarefa'} InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <SearchOutlined />
                    </InputAdornment>)
                }} />
            </Box>
            <TaskList detailedTable={true} userId={user!._id} />
        </>
    );
});

export { TodoList };
