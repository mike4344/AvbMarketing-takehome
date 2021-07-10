import React, { useContext,useState} from 'react';


const contactContext = React.createContext();

export function contactProvider({ children }) {
  const [currentContact, setCurrentContact] = useState();
  const [isModified, setIsModified] = useState(false);

  return (
    <>
      <contactContext.Provider value={{currentContact, setCurrentContact, isModified, setIsModified}}>
        {children}
      </contactContext.Provider>
    </>
  );
}
export function useContactContext () {
    return useContext(contactContext);
}
