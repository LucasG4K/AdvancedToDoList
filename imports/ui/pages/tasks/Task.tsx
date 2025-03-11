import React, { useState } from "react";
import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { TaskModel } from "/imports/api/Tasks/TaskTypes";
import { useNavigate, useParams } from "react-router-dom";
import { AddCircleOutline, ArrowBackOutlined, EditOutlined } from "@mui/icons-material";

interface ITask {
    tasks?: TaskModel[];
    isLoading: boolean;
    editing: boolean;
}

const Task: React.FC<ITask> = ({ tasks = [], isLoading, editing }) => {
    const { id } = useParams(); // id deve ser o mesmo nome da rota definida no App.tsx
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

    const navigate = useNavigate();
    const [titleForm, setTitleForm] = useState(task?.title || '');
    const [descriptionForm, setDescriptionForm] = useState(task?.description || '');
    const [visibilityForm, setVisibilityForm] = useState(task?.private ?? false);

    return (
        <>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', m: 2 }}>
                <Button
                    startIcon={<ArrowBackOutlined />}
                    sx={{ color: 'black' }}
                    onClick={() => navigate(-1)}
                >
                    Voltar
                </Button>

                <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 1 }}>
                    {editing ? (
                        <>
                            <EditOutlined />
                            <Typography variant="h6">EDITAR TAREFA</Typography>
                        </>
                    ) : (
                        <>
                            <AddCircleOutline />
                            <Typography variant="h6">NOVA TAREFA</Typography>
                        </>
                    )}
                </Box>
            </Box>

            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <TextField
                        sx={{ width: '60%' }}
                        label='Título'
                        value={titleForm}
                        onChange={(element) => setTitleForm(element.target.value)}
                    />

                    <FormControl>
                        <FormLabel>Visibilidade</FormLabel>
                        <RadioGroup row value={visibilityForm} onChange={() => setVisibilityForm(!visibilityForm)}>
                            <FormControlLabel value={false} control={<Radio />} label="Pública" />
                            <FormControlLabel value={true} control={<Radio />} label="Privada" />
                        </RadioGroup>
                    </FormControl >
                </Box>
                <TextField
                    label='Descrição'
                    value={descriptionForm}
                    onChange={(element) => setDescriptionForm(element.target.value)}
                    multiline
                    rows={6}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Box sx={{ m:2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained">SALVAR</Button>
                </Box>
            </Box>
        </>

    );
};

export { Task };
