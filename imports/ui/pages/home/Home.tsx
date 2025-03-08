import React from 'react';
import { HomeScreen, Overview, Tasks } from './homeStyles';
import { CardOverview } from './components/cardOverview/cardOverview';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../api/User/UserTypes';
import { MyAppBar } from '../../component/myAppBar';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { TodoTable } from '../tasks/components/todoTable';
import { TaskModel } from '/imports/api/Tasks/TaskTypes';

interface HomeProps {
    user: User;
    tasks: TaskModel[];
    isLoading: boolean;
}

export const Home = ({ user, tasks, isLoading }: HomeProps) => {
    const navigate = useNavigate();
    const todoListNavigate = () => navigate('/todo-list');

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const registeredTasksCount = tasks.filter((task: TaskModel) => task.status === 'REGISTERED').length;
    const inProgressTasksCount = tasks.filter((task: TaskModel) => task.status === 'IN_PROGRESS').length;
    const completedTasksCount = tasks.filter((task: TaskModel) => task.status === 'COMPLETED').length;

    return (
        <>
            <MyAppBar user={user} title={`Olá, ${user.profile.name}`} />
            <HomeScreen>
                <Overview>
                    <CardOverview title="TAREFAS CADASTRADAS" value={registeredTasksCount} />
                    <CardOverview title="TAREFAS EM ANDAMENTO" value={inProgressTasksCount} />
                    <CardOverview title="TAREFAS CONCLUÍDAS" value={completedTasksCount} />
                </Overview>
                <Tasks>
                    <Typography variant="h6">TAREFAS</Typography>
                    <TodoTable actionsOn={false} tasks={tasks.slice(0, 3)} />
                    <Button variant="contained" onClick={todoListNavigate} sx={{ margin: '12px' }}>
                        Ver Mais
                    </Button>
                </Tasks>
            </HomeScreen>
        </>
    );
};
