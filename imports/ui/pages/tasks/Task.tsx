import React, { ChangeEvent, useState } from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { TaskModel, TaskStatusModel } from "../../../api/Tasks/TaskModel";
import { useNavigate, useParams } from "react-router-dom";
import { AddCircleOutline, ArrowBackOutlined, Circle, DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { useTasks } from "/imports/providers/taskProvider";
import MyDialog from "../../components/myDialog";
import { Header, TaskScreen } from "./taskStyles";
import { useUser } from "/imports/providers/userProvider";
import { LoadingScreen } from "../../components/loadingScreen";
import { MySnackBar } from "../../components/mySnackBar";

interface ITask {
    editingScreen: boolean;
}

const Task: React.FC<ITask> = React.memo(({ editingScreen }) => {

    const { tasks, isLoadingTasks, handleCreateTask, handleEditTask, handleDeleteTask } = useTasks();
    const { user } = useUser();
    const { id } = useParams(); // id deve ser o mesmo nome da rota definida no App.tsx
    const task = editingScreen ? tasks.find(value => value._id === id) : undefined;

    const [editingDisable, setEditingDisable] = useState<boolean>(editingScreen);
    const [popSnackBarUp, setPopSnackBarUp] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    const navigate = useNavigate();

    const [taskForm, setTaskForm] = useState<TaskModel>({
        userName: task?.userName || '',
        title: task?.title || '',
        description: task?.description || '',
        due: task?.due || null,
        status: task?.status || TaskStatusModel.REGISTERED,
        private: task?.private ?? false,
        lastModified: task?.lastModified || new Date(),
        createdAt: task?.createdAt || new Date(),
    } as TaskModel);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTaskForm({
            ...taskForm,
            [name]: value,
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = taskFormError;

        // Coletando erros para exibir
        const errors = Object.values(validationErrors).filter(error => error !== "");

        if (errors.length > 0) {
            // Se houver erros, mostrar uma mensagem amigável
            const errorMessage = errors.join("\n"); // Junta todos os erros em uma string separada por novas linhas
            alert(`Por favor, corrija os seguintes erros:\n${errorMessage}`);
            return;
        }

        try {
            if (editingScreen) {
                await handleEditTask(id!, taskForm, handleSaveSuccess);
            } else {
                await handleCreateTask(taskForm, handleSaveSuccess)
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    };

    const handleLocaleDateString = (date: Date) => {
        return date.toLocaleString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleOpenDialog = (_id: string) => {
        setSelectedTaskId(_id);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        handleDeleteTask(selectedTaskId!, handleDeleteSuccess);
    };

    const handleSaveSuccess = () => {
        setSnackBarMessage(editingScreen ? 'alterada com sucesso' : 'criada com sucesso');
        setEditingDisable(true);
        setPopSnackBarUp(true);

        if (!editingScreen) {
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        }
    };


    const handleDeleteSuccess = () => {
        setDialogOpen(false);
        setSnackBarMessage('excluída');
        setEditingDisable(true);
        setPopSnackBarUp(true);

        setTimeout(() => {
            navigate(-1);
        }, 2000);
    }

    const decodeStatus = (status: TaskStatusModel): { status: string; color: string; options: Array<TaskStatusModel> } => {
        switch (status) {
            case TaskStatusModel.REGISTERED:
                return {
                    status: "Cadastrada",
                    color: "red",
                    options: [TaskStatusModel.IN_PROGRESS],
                };
            case TaskStatusModel.IN_PROGRESS:
                return {
                    status: "Em Andamento",
                    color: "orange",
                    options: [TaskStatusModel.REGISTERED, TaskStatusModel.COMPLETED],
                };
            case TaskStatusModel.COMPLETED:
                return {
                    status: "Concluída",
                    color: "green",
                    options: [TaskStatusModel.IN_PROGRESS],
                };
            default:
                return { status: "", color: "", options: [] };
        }
    };

    const [taskFormError, setTaskFormError] = useState({
        title: '',
    });

    React.useEffect(() => {
        setTaskFormError({
            title: taskForm.title === "" || taskForm.title.length > 1 ? "" : "O título deve ter pelo menos 2 caracteres",
        });
    }, [taskForm]); // O efeito será executado sempre que o taskForm mudar

    if (editingScreen && !task && !popSnackBarUp) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">
                    Tarefa não encontrada!
                </Typography>
            </Box>
        );
    }

    if (isLoadingTasks) {
        return <LoadingScreen />
    }


    return (

        <TaskScreen>
            <Header>
                <Button
                    startIcon={<ArrowBackOutlined />}
                    sx={{ color: 'black' }}
                    onClick={() => navigate(-1)}
                >
                    Voltar
                </Button>

                <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 1 }}>
                    {editingScreen ? (
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

                {editingScreen && user?._id === task?.userId && <Grid item sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => setEditingDisable(!editingDisable)} sx={{ color: 'green' }}>
                        <EditOutlined />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDialog(task!._id!)} sx={{ color: 'red' }}>
                        <DeleteOutlineOutlined />
                    </IconButton>
                    <MyDialog
                        open={dialogOpen}
                        title="Confirmação"
                        message="Deseja realmente deletar esta tarefa?"
                        onClose={() => setDialogOpen(false)}
                        onConfirm={handleConfirmDelete}
                    />
                </Grid>}
            </Header>

            <Box component='form' onSubmit={handleSubmit} sx={{ p: 2 }}>
                {/* Primeira linha: Título + Visibilidade */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }} >
                    <TextField
                        disabled={editingDisable}
                        required
                        error={!!taskFormError.title}
                        helperText={taskFormError.title}
                        sx={{ width: '60%' }}
                        label='Título'
                        name='title'
                        value={taskForm.title}
                        onChange={handleChange}
                    />

                    <FormControl disabled={editingDisable}>
                        <FormLabel>Visibilidade</FormLabel>
                        <RadioGroup row name='private' value={taskForm.private} onChange={handleChange} >
                            <FormControlLabel value={false} control={<Radio />} label="Pública" />
                            <FormControlLabel value={true} control={<Radio />} label="Privada" />
                        </RadioGroup>
                    </FormControl>
                </Box>

                {/* Segunda linha: Datas */}
                {editingScreen && <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <TextField
                        label="Criado Por"
                        value={taskForm.userName}
                        fullWidth
                        disabled
                    />
                    <TextField
                        label="Criado em"
                        value={handleLocaleDateString(new Date(taskForm.createdAt))}
                        fullWidth
                        disabled
                    />
                    <TextField
                        label="Última modificação"
                        value={handleLocaleDateString(new Date(taskForm.lastModified))}
                        fullWidth
                        disabled
                    />
                </Box>}

                {/* Terceira linha: Status e Data da Tarefa*/}
                <Box sx={{ display: 'flex', mt: 2, width: '50%', gap: 2 }}>
                    {editingScreen &&
                        <TextField
                            disabled={editingDisable}
                            fullWidth
                            label="Status"
                            select
                            name="status"
                            value={taskForm.status}
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                        >
                            {[TaskStatusModel.REGISTERED, TaskStatusModel.IN_PROGRESS, TaskStatusModel.COMPLETED].map((newStatus) => (
                                <MenuItem key={newStatus} value={newStatus}>
                                    <Circle
                                        sx={{
                                            verticalAlign: "middle",
                                            fontSize: "14px",
                                            color: decodeStatus(newStatus).color,
                                            mr: 1,
                                        }}
                                    />
                                    {decodeStatus(newStatus).status}
                                </MenuItem>
                            ))}
                        </TextField>
                    }

                    <TextField
                        disabled={editingDisable}
                        fullWidth
                        label="Data da Tarefa"
                        name="due"
                        type="date"
                        value={taskForm.due ? taskForm.due.toISOString().split('T')[0] : ""}
                        onChange={(e) => setTaskForm((prev) => ({ ...prev, due: e.target.value ? new Date(e.target.value) : null }))}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                {/* Quarta linha: Descrição */}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <TextField
                        disabled={editingDisable}
                        label='Descrição'
                        value={taskForm.description}
                        name='description'
                        onChange={handleChange}
                        multiline
                        rows={6}
                        fullWidth
                    />
                </Box>

                {/* Botão de salvar */}
                <Box sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button disabled={editingDisable} type='submit' variant="contained">
                        SALVAR
                    </Button>
                </Box>
            </Box>
            <MySnackBar
                open={popSnackBarUp}
                message={`Tarefa ${snackBarMessage}!`}
                severity={snackBarMessage === 'excluída' ? "warning" : 'success'}
                onClose={() => setPopSnackBarUp(false)}
            />
        </TaskScreen>

    );
});

export { Task };
