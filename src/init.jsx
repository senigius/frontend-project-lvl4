import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import { AuthProvider } from './contexts/index.jsx';
import store from './slices/index.js';

export default () => {
  ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Provider>
        </React.StrictMode>,
        document.getElementById('chat'),
  );
};
