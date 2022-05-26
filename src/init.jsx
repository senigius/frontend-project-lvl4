import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { AuthProvider } from './contexts/index.jsx';

export default () => {
  ReactDOM.render(
        <React.StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </React.StrictMode>,
        document.getElementById('chat'),
  );
};
