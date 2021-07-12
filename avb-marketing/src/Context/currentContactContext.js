import React, { useContext,useState} from 'react';


const contactContext = React.createContext();

export function ContactProvider({ children }) {
  const [currentContact, setCurrentContact] = useState(false);
  const [isNewContact, setIsNewContact] = useState(false)
  const [changesCommitted, setChangesCommitted] = useState(false)

  return (
    <>
      <contactContext.Provider value={{currentContact, setCurrentContact,
        isNewContact, setIsNewContact,
        changesCommitted, setChangesCommitted
}}>
        {children}
      </contactContext.Provider>
    </>
  );
}
export function useContactContext () {
    return useContext(contactContext);
}
