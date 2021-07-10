import React from 'react';
import Contacts from './Components/Contacts'
import ContactInfo from './Components/ContactInfo';
import './App.css';

function App() {
  return (
    <div className="app_container">
      <Contacts />
      <ContactInfo />
    </div>
  );
}

export default App;
