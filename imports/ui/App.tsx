import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../providers/userProvider';
import { AppRoutes } from '../routes/appRoutes';
import { TaskProvider } from '../providers/taskProvider';

export const App = () => (
  <UserProvider>
    <TaskProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TaskProvider>
  </UserProvider>
);
