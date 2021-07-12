import React, { useContext,useState, useEffect} from 'react';


const contactContext = React.createContext();

export function ContactProvider({ children }) {
  const [currentContact, setCurrentContact] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isNewContact, setNewContact] = useState(false)
  const [stagingContact, setStagingContact] = useState()
  const [changesCommitted, setChangesCommitted] = useState(false)
  console.log(currentContact, 'context')
  useEffect(() =>{
    setStagingContact({...currentContact})
  },[currentContact])

  return (
    <>
      <contactContext.Provider value={{currentContact, setCurrentContact,
        isModified, setIsModified,
        isNewContact, setNewContact,
        stagingContact, setStagingContact,
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
