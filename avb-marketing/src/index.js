import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ContactContext} from './Context/currentContactContext'
import {ModalProvider} from './Context/Modal'

ReactDOM.render(
  <React.StrictMode>
    <ContactContext>
        <ModalProvider>
          <App />
        </ModalProvider>
    </ContactContext>
  </React.StrictMode>,
  document.getElementById('root')
);
