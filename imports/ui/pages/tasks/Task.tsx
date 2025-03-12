import React, { ChangeEvent, useState } from "react";
import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { TaskModel, TaskStatusModel } from "../../../api/Tasks/TaskModel";
import { useNavigate, useParams } from "react-router-dom";
import { AddCircleOutline, ArrowBackOutlined, EditOutlined } from "@mui/icons-material";
import { Meteor } from "meteor/meteor";
import { useTasks } from "/imports/providers/taskProvider";

interface ITask {
    editing: boolean;
}

const Task: React.FC<ITask> = ({ editing }) => {

    const { tasks, isLoading } = useTasks();
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

    const [taskForm, setTaskForm] = useState<TaskModel>({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || TaskStatusModel.REGISTERED,
        private: task?.private ?? false,
        lastModified: new Date(),
        createdAt: task?.createdAt || new Date(),
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskForm({
            ...taskForm,
            [event.target.name]: event.target.value,
        })
    }

    const handleSave = () => {
        if (editing) {
            Meteor.call('task.edit', id, taskForm, (error: Meteor.Error) => {
                if (error)
                    alert('Erro ao atualizar: ' + error.message);
                else
                    navigate(-1);
            })
        } else {
            Meteor.call('task.insert', taskForm, (error: Meteor.Error) => {
                if (error)
                    alert('Erro ao criar: ' + error.message);
                else
                    navigate(-1);
            })
        }
    }

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
                        name='title'
                        value={taskForm.title}
                        onChange={handleChange}
                    />

                    <FormControl>
                        <FormLabel>Visibilidade</FormLabel>
                        <RadioGroup row name='private' value={taskForm.private} onChange={handleChange}>
                            <FormControlLabel value={false} control={<Radio />} label="Pública" />
                            <FormControlLabel value={true} control={<Radio />} label="Privada" />
                        </RadioGroup>
                    </FormControl >
                </Box>
                <TextField
                    label='Descrição'
                    value={taskForm.description}
                    name='description'
                    onChange={handleChange}
                    multiline
                    rows={6}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Box sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                    >
                        SALVAR
                    </Button>
                </Box>
            </Box>
        </>

    );
};

export { Task };
