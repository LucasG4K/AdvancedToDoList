import React from 'react';
import { HomeScreen, Overview, Tasks } from './homeStyles';
import { CardOverview } from './components/cardOverview/cardOverview';
import { useNavigate } from 'react-router-dom';
import { MyAppBar } from '../../components/myAppBar';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { TasksTable } from '../tasks/components/tasksTable';
import { useUser } from '/imports/providers/userProvider';
import { useTasks } from '/imports/providers/taskProvider';


export const Home = () => {
    const { user } = useUser();
    const { countTasks, isLoading,  } = useTasks();
    const navigate = useNavigate();
    const todoListNavigate = () => navigate('/todo-list');

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <MyAppBar user={user!} title={`Olá, ${user?.profile.name}`} />
            <HomeScreen>
                <Overview>
                    <CardOverview title="TAREFAS CADASTRADAS" value={countTasks.registered} />
                    <CardOverview title="TAREFAS EM ANDAMENTO" value={countTasks.inProgress} />
                    <CardOverview title="TAREFAS CONCLUÍDAS" value={countTasks.completed} />
                </Overview>
                <Tasks>
                    <Typography variant="h6">TAREFAS</Typography>
                    <TasksTable detailedTable={false} />
                    <Button variant="contained" onClick={todoListNavigate} sx={{ margin: '12px' }}>
                        Ver Mais
                    </Button>
                </Tasks>
            </HomeScreen>
        </>
    );
};
