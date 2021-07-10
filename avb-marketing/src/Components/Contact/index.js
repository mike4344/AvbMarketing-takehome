import React from "react";
import { useContactContext } from "../../Context/currentContactContext";

export default function Contact({contact, key}) {
const {currentContact, setCurrentContact} = useContactContext()

	return (
		<div className={`contact ${currentContact.id === contact.id ? 'selected' : ''}`} key={key} onClick={setCurrentContact(contact)}>
            `${contact.firstName} ${contact.lastName}`
		</div>
	)
}
