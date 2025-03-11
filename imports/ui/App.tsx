import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ThemeProvider } from '@emotion/react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import theme from './theme';
import { Auth } from './pages/auth/Auth';
import { User, UserProfile } from '../api/User/UserTypes';
import { Home } from './pages/home/Home';
import { TodoList } from './pages/tasks/TodoList';
import { TasksCollection } from '/imports/api/Tasks/TasksCollection';
import { Box, CircularProgress } from '@mui/material';
import { Profile } from './pages/profile/Profile';
import { Task } from './pages/tasks/Task';

export const App = () => {
  const user = useTracker(() => {
    const meteorUser = Meteor.user();

    if (!meteorUser) return null; // Se usuário não carregou, retorna null

    const profile = meteorUser.profile as UserProfile || {};

    return {
      _id: meteorUser._id,
      username: meteorUser.username,
      email: meteorUser.emails?.[0]?.address || "", // Pega o primeiro e-mail
      profile: {
        name: profile.name || "",
        gender: profile.gender || "",
        birthDate: profile.birthDate ? new Date(profile.birthDate) : new Date(),
        avatar: profile.avatar || undefined,
        company: profile.company || undefined,
      },
      createdAt: meteorUser.createdAt ? new Date(meteorUser.createdAt) : new Date(),
    } as User;
  });

  const isLoading = useSubscribe('tasks');
  const isLoadingUser = useSubscribe('users');

  const tasks = useTracker(() => {
    // if (isLoading() || isLoadingUser()) return [];
    return TasksCollection.find(
      { $or: [{ private: false }, { userId: user?._id }] },
      { sort: { createdAt: -1 } }
    ).fetch().map(task => {
      const taskUser = Meteor.users.findOne(task.userId) || null;
      return {
        ...task,
        userName: taskUser?.username || 'Unknown',
      };
    });
  }, [isLoading()]);

  if (isLoading() || isLoadingUser()) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={!user ? <Auth /> : <Home user={user} tasks={tasks} isLoading={isLoading()} />} />
          <Route path='/profile' element={<Profile user={user!} />} />
          <Route path='/todo-list' element={<TodoList user={user!} tasks={tasks} isLoading={isLoading()} />} />
          <Route path='/todo-list/edit/:id' element={<Task tasks={tasks.filter(value => value.userId === user?._id)} isLoading={isLoading()} editing={true} />} />
          <Route path='/todo-list/new-task' element={<Task isLoading={isLoading()} editing={false} />} />
          <Route path='*' element={<Home user={user!} tasks={tasks} isLoading={isLoading()} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
