import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from '../../components/src/registerServiceWorker';
import { AlertDialogProvider } from '../../components/src/AlertBoxContext';
import { ToastProvider } from '../../components/src/ToastContext';
import { DialogProvider } from '../../components/src/DialogContext';
import ThemeProvider from '../../components/src/Theme/ThemeContext';

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <ThemeProvider>
      <Router>
        <>
          <AlertDialogProvider>
            <DialogProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </DialogProvider>
          </AlertDialogProvider>
        </>
      </Router>
    </ThemeProvider>
  </Suspense>,
  document.getElementById('root')
);
registerServiceWorker();
