import React from 'react';
import ReactDOM from 'react-dom/client';

import Application from "./Application";

import App from '../screens/App';

new Application("Paintif24");

if (typeof window !== 'undefined') {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
            </React.StrictMode>
    );
}