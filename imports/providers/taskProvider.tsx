import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/Tasks/TasksCollection';
import { useUser } from './userProvider';
import { TaskModel, TaskStatusModel } from '../api/Tasks/TaskModel';
import { Meteor } from 'meteor/meteor';
import { Box, CircularProgress } from '@mui/material';

interface TaskContextType {
    tasks: TaskModel[];
    isLoading: boolean;
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    hasMore: boolean;
    handleChangeStatus: (_id: string, newStatus: TaskStatusModel) => void;
    countTasks: {
        registered: number;
        inProgress: number;
        completed: number;
    }
}



const TaskContext = createContext<TaskContextType | undefined>(undefined);
const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks deve ser usado dentro de um TaskProvider');
    }
    return context;
};



const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser();
    const [page, setPage] = useState(1);
    const limit = 4;
    const skip = (page - 1) * limit;

    const handleChangeStatus = (_id: string, newStatus: TaskStatusModel) => {
        Meteor.call('task.status', { _id, taskStatus: newStatus }, (error: any) => {
            if (error) {
                alert("Erro ao atualizar a tarefa: " + error.reason);
            }
        });
    };

    const isLoading = useSubscribe('tasks', { limit, skip })();

    const { tasks, totalCount, countTasks } = useTracker(() => {
        const fetchedTasks = TasksCollection.find(
            { $or: [{ private: false }, { userId: user?._id }] },
            { sort: { createdAt: -1 }, limit, skip }
        ).fetch();

        const total = TasksCollection.find(
            { $or: [{ private: false }, { userId: user?._id }] }
        ).count();

        const countTasks = {
            registered: TasksCollection.find(
                {
                    $or: [{ private: false}, {userId: user?._id }],
                    status: TaskStatusModel.REGISTERED,
                }
            ).count(),
            inProgress: TasksCollection.find(
                {
                    $or: [{ private: false}, {userId: user?._id }],
                    status: TaskStatusModel.IN_PROGRESS,
                }
            ).count(),
            completed: TasksCollection.find(
                {
                    $or: [{ private: false}, {userId: user?._id }],
                    status: TaskStatusModel.COMPLETED,
                }
            ).count(),
        };

        return {
            tasks: fetchedTasks.map(task => ({
                ...task,
                userName: Meteor.users.findOne(task.userId)?.username || 'Desconhecido',
            })),
            totalCount: total,
            countTasks: countTasks,
        };
    }, [isLoading, page]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page < totalPages;

    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [totalPages]);

    if (isLoading && page === 1) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <TaskContext.Provider value={{ tasks, isLoading, page, totalPages, setPage, hasMore, handleChangeStatus, countTasks }}>
            {children}
        </TaskContext.Provider>
    );
};


export { TaskProvider, useTasks };