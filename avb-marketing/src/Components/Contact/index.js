import React, {useState, useEffect} from "react";
import { useContactContext } from "../../../Context/currentContactContext";

export default function Contact({contact}) {
const {currentContact, setCurrentContact} = useContactContext()

	return (
		<div onClick={setCurrentContact(contact)}>

		</div>
	)
}
