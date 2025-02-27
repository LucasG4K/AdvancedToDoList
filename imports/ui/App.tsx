import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ThemeProvider } from '@emotion/react';
import { useTracker } from 'meteor/react-meteor-data';

import { Welcome } from './Welcome';
import { Auth } from './component/Auth';
import theme from './component/theme';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  // const isLoading = useSubscribe('tasks');
  // if (isLoading())
  //   return <div>Loading...</div>

  return (
    <ThemeProvider theme={theme}>
      {
        !user ?
          <Auth />
          :
          <Welcome user={user} logout={logout} />
      }
    </ThemeProvider>
  );
}