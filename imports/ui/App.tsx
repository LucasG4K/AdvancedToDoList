import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../providers/userProvider';
import { AppRoutes } from '../routes/appRoutes';

export const App = () => (
  <UserProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </UserProvider>
);
