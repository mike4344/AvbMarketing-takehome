import React from "react";
import { useContactContext } from "../../Context/currentContactContext";
import './contact.css'

export default function Contact({contact, contactKey}) {
const {currentContact, setCurrentContact} = useContactContext()

	return (
		<div className={`contact ${currentContact.id === contact.id ? 'selected' : ''}`} key={contactKey} onClick={()=>setCurrentContact(contact)}>
            {`${contact.firstName} ${contact.lastName}`}
		</div>
	)
}
