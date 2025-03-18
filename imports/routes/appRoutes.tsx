import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth } from '../ui/pages/auth/Auth';
import { Home } from '../ui/pages/home/Home';
import { TodoList } from '../ui/pages/todoList/TodoList';
import { Profile } from '../ui/pages/profile/Profile';
import { Task } from '../ui/pages/tasks/Task';
import { useUser } from '../providers/userProvider';
import { TaskProvider } from '../providers/taskProvider';

export const AppRoutes = () => {
    const { user } = useUser();

    if (user) {
        return (
            <TaskProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/todo-list" element={<TodoList />} />
                    <Route path="/todo-list/edit/:id" element={<Task editingScreen={true} />} />
                    <Route path="/todo-list/new-task" element={<Task editingScreen={false} />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </TaskProvider>
        );
    } else {
        return (
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<Auth />} />
            </Routes>
        );

    }
};

