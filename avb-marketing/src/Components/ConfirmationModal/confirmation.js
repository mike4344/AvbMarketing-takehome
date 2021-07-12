import React, {useState, useEffect} from "react";
import { useContactContext } from "../../Context/currentContactContext";


export default function Confirmation({purpose, currentChanges, onClose}) {
    const {currentContact,setCurrentContact, isNewContact, setIsNewContact, setChangesCommitted} = useContactContext()
    const [message, setMessage] = useState('')
    const [handlePurpose, setHandlePurpose] = useState(null)
    console.log(purpose)
    useEffect(() => {
        switch (purpose) {
            case 'save':
                setMessage('Are you sure you want to save the contact?')
                let saveContact = () =>  () =>{
                    fetch(`https://avb-contacts-api.herokuapp.com/contacts${isNewContact ? '/': `/${currentContact.id}`}`, {
                        method: isNewContact ? 'POST' : 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({id:currentContact?.id, ...currentChanges})
                })
                    .then(response => response.json())
                    .then(data => {
                        setCurrentContact({...data})
                        setIsNewContact(false)
                        setChangesCommitted(committed => !committed)
                        onClose()
                    })
                    .catch(error => {
                        throw new Error(`Error while attempting to commit changes: ${error}`)
                    })
                }
                setHandlePurpose(saveContact)
                break
            case 'delete':
                setMessage('Are you sure you want to delete this contact? This change cannot be undone.')
                let deleteContact = () => () => {
                    isNewContact ? setCurrentContact(false) : fetch(`https://avb-contacts-api.herokuapp.com/contacts/${currentContact.id}`,{
                        method: 'DELETE'
                    })
                    .then(response =>{
                        if(response.ok) setChangesCommitted(committed => !committed)
                        onClose()
                    })
                    .catch(error=>{
                        throw new Error(`There was an issue deleting this contact: ${error}`)
                    })
                }
                setHandlePurpose(deleteContact)
                break
            default:
                setMessage('Are you sure you want to discard all changes? this action cannot be undone.')
                let cancelContact = () => () => {
                    setCurrentContact(contact => isNewContact ? false: {...contact})
                    setChangesCommitted(committed => !committed)
                    onClose()
                }
                setHandlePurpose(cancelContact)
                }
    }, [])
    return (
        <div className=''>
            {message}
            <div className= 'confirmation_button_container'>
                <button type= 'button'
                onClick={onClose}>
                    Cancel
                </button>
                <button type= 'button'
                onClick={handlePurpose}>
                    {purpose === 'save'? 'Confirm Changes': purpose === 'cancel' ? 'Discard Changes?' : 'Delete Contact Permanently?'}
                </button>
            </div>
		</div>
	);
}
