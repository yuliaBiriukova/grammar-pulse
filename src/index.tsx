import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {clientId} from "./common/googleAuth";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
            <App />
        </GoogleOAuthProvider>
    </Provider>
);