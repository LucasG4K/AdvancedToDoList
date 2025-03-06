import React, { useMemo } from 'react';
import { Meteor } from 'meteor/meteor';
import { ThemeProvider } from '@emotion/react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import theme from './theme';
import { Auth } from './component/Auth';
import { User } from '../api/user/UserTypes';
import { Home } from './pages/home/Home';
import { TodoList } from './pages/tasks/TodoList';
import { TasksCollection } from '/imports/api/Tasks/TasksCollection';
import { Box, CircularProgress } from '@mui/material';

export const App = () => {
  const user = useTracker(() => Meteor.user() as User);
  const isLoading = useSubscribe('tasks');

  const tasks = useMemo(() => { // memo para não renderizar novamente (evita loop infinito)
    if (!isLoading()) {
      const tasks = TasksCollection.find(
        { $or: [{ private: false }, { userId: user?._id }] },
        { sort: { createdAt: -1 } }
      ).fetch();

      return tasks.map(task => {
        const taskUser = Meteor.users.findOne(task.userId) as User || null;
        return {
          ...task,
          userName: taskUser?.profile?.name || 'Unknown',
        }
      })
    }
    return [];
  }, [user, isLoading]);

  if (isLoading()) {
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
          <Route path='todo-list' element={<TodoList user={user} tasks={tasks} isLoading={isLoading()} />} />
          <Route path='*' element={<Home user={user} tasks={tasks} isLoading={isLoading()} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
