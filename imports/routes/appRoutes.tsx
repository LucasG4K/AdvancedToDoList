import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth } from '../ui/pages/auth/Auth';
import { Home } from '../ui/pages/home/Home';
import { TodoList } from '../ui/pages/tasks/TodoList';
import { Profile } from '../ui/pages/profile/Profile';
import { Task } from '../ui/pages/tasks/Task';
import { useUser } from '../providers/userProvider';

export const AppRoutes = () => {
    const { user } = useUser();

    return (
        <Routes>
            <Route path="/" element={!user ? <Auth /> : <Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/todo-list" element={<TodoList />} />
            <Route path="/todo-list/edit/:id" element={<Task editing={true} />} />
            <Route path="/todo-list/new-task" element={<Task editing={false} />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
};
