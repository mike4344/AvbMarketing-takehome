import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ContactProvider} from './Context/currentContactContext'
import {ModalProvider} from './Context/Modal'

ReactDOM.render(
  <React.StrictMode>
    <ContactProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
    </ContactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
