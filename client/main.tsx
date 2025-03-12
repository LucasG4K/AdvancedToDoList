import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { App } from '/imports/ui/App';
import defaultTheme from '../imports/ui/themes/defaultTheme';

Meteor.startup(() => {
  const container = document.getElementById('react-target');

  if (!container) {
    console.error("Elemento #react-target não encontrado!");
    return;
  }

  const root = createRoot(container);
  root.render(
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  );
});
