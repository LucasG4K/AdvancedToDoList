import React, { ChangeEvent } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField } from "@mui/material";
import { MyAppBar } from "../../components/myAppBar";
import { TaskList } from "./components/taskList";
import { AddCircleOutlineOutlined, ArrowBackOutlined, SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../../providers/taskProvider";

const TodoList: React.FC = React.memo(() => {
    const { setSearch, search, toggleHideComplete, hideCompleted } = useTasks();

    const navigate = useNavigate();

    return (
        <>
            <MyAppBar title="LISTA DE TAREFAS" />
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
                <TextField
                    fullWidth
                    label={'Pesquisar Tarefa'}
                    value={search}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <SearchOutlined />
                        </InputAdornment>)
                    }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mx: 'auto', pt: 2 }}>
                <FormGroup sx={{ gap: 1 }} onChange={toggleHideComplete} >
                    <FormControlLabel
                        control={<Checkbox checked={hideCompleted} />}
                        label='Ocultar Tarefas Concluídas' />
                </FormGroup>
            </Box>
            <TaskList detailedTable={true} />
        </>
    );
});

export { TodoList };
