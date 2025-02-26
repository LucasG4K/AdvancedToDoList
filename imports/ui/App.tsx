import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ThemeProvider } from '@emotion/react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';

import { Welcome } from './Welcome';
import { Auth } from './component/Auth';
import theme from './component/theme';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  console.log(!!user);
  const logout = () => Meteor.logout();

  const isLoading = useSubscribe('');
  if (isLoading())
    return <div>Loading...</div>

  return (
    <ThemeProvider theme={theme}>
      {
        !user ?
          <Auth />
          :
          <Welcome logout={logout} />
      }
    </ThemeProvider>
  );
}