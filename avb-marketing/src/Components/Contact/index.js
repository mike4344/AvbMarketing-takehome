import React from "react";
import { useContactContext } from "../../Context/currentContactContext";
import ConfirmationModal from "../ConfirmationModal";

export default function Contact({contact, key}) {
const {currentContact, setCurrentContact, isModified} = useContactContext()

	return (
		<div className={`contact ${currentContact.id === contact.id ? 'selected' : ''}`} key={key} onClick={setCurrentContact(contact)}>
            {`${contact.firstName} ${contact.lastName}`}
		</div>
	)
}
