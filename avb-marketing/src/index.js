import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContactContext from '../Context/currentContactContext'

ReactDOM.render(
  <ContactContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContactContext>,
  document.getElementById('root')
);

