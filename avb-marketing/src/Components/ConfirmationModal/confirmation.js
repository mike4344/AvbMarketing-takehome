import React, {useState, useEffect} from "react";
import { useContactContext } from "../../Context/currentContactContext";


export default function Confirmation({purpose, currentChanges, handleClose}) {
    const {currentContact,setCurrentContact, isNewContact, setChangesCommitted, setIsModified, setStagingContact} = useContactContext()
    const [message, setMessage] = useState('')
    const [handlePurpose, setHandlePurpose] = useState(null)
    console.log(purpose)
    useEffect(() => {

        switch (purpose) {
            case 'save':
                setMessage('Are you sure you want to save the contact?')
                setHandlePurpose(
                    function() {
                        fetch(`https://avb-contacts-api.herokuapp.com/contacts${isNewContact ? '/': `/${currentContact.id}`}`, {
                            method: isNewContact ? 'POST' : 'PUT',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({id:currentContact.id, ...currentChanges})
                        })
                        .then(response =>{
                            return response.json()
                        })
                        .then(data => {
                            setCurrentContact(data)
                            setChangesCommitted(committed => !committed)
                        }).catch(error => {
                            throw new Error(`Error while attempting to commit changes: ${error}`)
                        })
                    }
                    )
                    break
                    case 'delete':
                        setMessage('Are you sure you want to delete this contact? This change cannot be undone.')
                        setHandlePurpose(
                            function () {
                                isNewContact ? setCurrentContact({}) : fetch(`https://avb-contacts-api.herokuapp.com/contacts/${currentContact.id}`,{
                                    method: 'DELETE'
                                })
                                .then(response =>{
                                    if(response.ok) setChangesCommitted(committed => !committed)
                                })
                                .catch(error=>{
                                    throw new Error(`There was an issue deleting this contact: ${error}`)
                                })
                            }
                            )
                            break
                            default:
                                setMessage('Are you sure you want to discard all changes? this action cannot be undone.')
                                setHandlePurpose(
                                    function () {
                                        setStagingContact({...currentContact})
                                        setChangesCommitted(committed => !committed)
                                        setIsModified(false)
                                    }
                                    )

                                }
                            }, [])
    return (
        <div className=''>
            {message}
            <div className= 'confirmation_button_container'>
                <button type= 'button'
                onClick={()=> {
                    setCurrentContact(contact => { return {...contact}})

                    }}>
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
