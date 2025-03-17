import React from 'react';
import { HomeScreen, Overview, Tasks } from './homeStyles';
import { CardOverview } from './components/cardOverview/cardOverview';
import { useNavigate } from 'react-router-dom';
import { MyAppBar } from '../../components/myAppBar';
import { Button, Typography } from '@mui/material';
import { TaskList } from '../todoList/components/taskList';
import { useUser } from '/imports/providers/userProvider';
import { useTasks } from '/imports/providers/taskProvider';
import { LoadingScreen } from '../../components/loadingScreen';


export const Home = () => {
    const { user } = useUser();
    const { countTasks, isLoadingTasks, totalCount } = useTasks();
    const navigate = useNavigate();
    const todoListNavigate = () => navigate('/todo-list');

    if (isLoadingTasks) {
        return <LoadingScreen />
    }

    return (
        <>
            <MyAppBar title={`Olá, ${user?.profile.name}`} />
            <HomeScreen>
                <Overview>
                    <CardOverview title="TAREFAS CADASTRADAS" value={countTasks.registered} />
                    <CardOverview title="TAREFAS EM ANDAMENTO" value={countTasks.inProgress} />
                    <CardOverview title="TAREFAS CONCLUÍDAS" value={countTasks.completed} />
                </Overview>
                <Tasks>
                    <Typography variant="h6"><span style={{ fontWeight: 'bold' }} >{`TAREFAS (${totalCount})`}</span></Typography>
                    <TaskList detailedTable={false} />
                    <Button variant="contained" onClick={todoListNavigate} sx={{ margin: '12px' }}>
                        Ver Mais
                    </Button>
                </Tasks>
            </HomeScreen>
        </>
    );
};
