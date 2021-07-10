import React, { useContext,useState} from 'react';


const contactContext = React.createContext();

export function contactProvider({ children }) {
  const [currentContact, setCurrentContact] = useState();

  return (
    <>
      <contactContext.Provider value={{currentContact, setCurrentContact}}>
        {children}
      </contactContext.Provider>
    </>
  );
}
export function useContactContext () {
    return useContext(contactContext);
}
