import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/Tasks/TasksCollection';
import { useUser } from './userProvider';
import { TaskModel, TaskStatusModel } from '../api/Tasks/TaskModel';
import { Meteor } from 'meteor/meteor';
import { UserModel } from '../api/User/UserModel';

interface TaskContextType {
    tasks: TaskModel[];
    totalCount: number;
    isLoadingTasks: boolean;
    page: number;
    totalPages: number;
    hideCompleted: boolean;
    search: string,
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    setHideCompleted: (hide: boolean) => void;
    toggleHideComplete: () => void;
    handleSave: (editing: boolean, id: string, taskForm: TaskModel) => void;
    handleChangeStatus: (_id: string, newStatus: TaskStatusModel) => void;
    handleDeleteTask: (_id: string) => void;
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
    const [hideCompleted, setHideCompleted] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1);
    const limit = 4;
    const skip = (page - 1) * limit;

    const handleSave = (editing: boolean, id: string, taskForm: TaskModel): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (editing) {
                Meteor.call('task.edit', id, taskForm, (error: Meteor.Error) => {
                    if (error) {
                        reject(new Error('Erro ao atualizar: ' + error.message));
                    } else {
                        resolve();
                    }
                });
            } else {
                Meteor.call('task.insert', taskForm, (error: Meteor.Error) => {
                    if (error) {
                        reject(new Error('Erro ao criar: ' + error.message));
                    } else {
                        resolve();
                    }
                });
            }
        });
    };

    const handleChangeStatus = (_id: string, newStatus: TaskStatusModel): Promise<void> => {
        return new Promise((resolve, reject) => {
            Meteor.call('task.status', { _id, taskStatus: newStatus }, (error: Meteor.Error) => {
                if (error) {
                    reject(new Error('Erro ao atualizar status: ' + error.message));
                } else {
                    resolve();
                }
            });
        });
    };

    const handleDeleteTask = (_id: string) => {
        Meteor.call('task.delete', { _id }, (error: Meteor.Error) => {
            if (error) {
                alert("Erro ao atualizar ao remover tarefa: " + error.reason);
            }
        });
    };

    const isLoadingTasks = useSubscribe('tasks', { limit, skip })();

    const toggleHideComplete = () => {
        setHideCompleted(!hideCompleted);
    }

    const { tasks, totalCount, countTasks } = useTracker(() => {

        const queryFilter = {
            $or: [{ private: false }, { userId: user?._id }],
            ...(hideCompleted ? { status: { $ne: TaskStatusModel.COMPLETED } } : {}),
            ...(search ? { title: { $regex: search, $options: "i" } } : {}),
        };

        const fetchedTasks = TasksCollection.find(
            queryFilter,
            { sort: { due: -1, createdAt: -1 }, limit, skip }
        ).fetch();


        const total = TasksCollection.find(queryFilter).count();

        const countTasks = {
            registered: TasksCollection.find(
                {
                    $or: [{ private: false }, { userId: user?._id }],
                    status: TaskStatusModel.REGISTERED,
                }
            ).count(),
            inProgress: TasksCollection.find(
                {
                    $or: [{ private: false }, { userId: user?._id }],
                    status: TaskStatusModel.IN_PROGRESS,
                }
            ).count(),
            completed: TasksCollection.find(
                {
                    $or: [{ private: false }, { userId: user?._id }],
                    status: TaskStatusModel.COMPLETED,
                }
            ).count(),
        };

        const tasksWithUsers: TaskModel[] = fetchedTasks.map(task => {
            const user = Meteor.users.findOne(task.userId) as UserModel;
            return {
                ...task,
                userName: user?.username || 'Desconhecido',
                ownerImg: user?.profile?.avatar || 'Desconhecido',
            };
        });
        return {
            tasks: tasksWithUsers,
            totalCount: total,
            countTasks: countTasks,
        };

    }, [page, search, isLoadingTasks, hideCompleted]);

    const totalPages = Math.ceil(totalCount / limit);

    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [totalPages]);

    const TaskProviderProps = {
        tasks,
        isLoadingTasks,
        page,
        totalPages,
        totalCount,
        countTasks,
        hideCompleted,
        search,
        setHideCompleted,
        toggleHideComplete,
        setSearch,
        setPage,
        handleSave,
        handleChangeStatus,
        handleDeleteTask,
    };

    return (
        <TaskContext.Provider value={TaskProviderProps}>
            {children}
        </TaskContext.Provider>
    );
};


export { TaskProvider, useTasks };