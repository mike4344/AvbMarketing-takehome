import React, {useState} from "react";
import EmailList from "../EmailList"
import useContactContext from "../../Context/currentContactContext"

export default function ContactInfo() {

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	return (
		<div className=''>
			<div className="contact_name_container">
				<label>First Name
					<input type="text" name="first_name" value={firstName} onChange={setFirstName(event=> event.target.value)}></input>
				</label>
				<label>Last Name
					<input type="text" name="last_name" value={lastName} onChange={setLastName(event=> event.target.value)}></input>
				</label>
			</div>
			<EmailList />
			<div className="contact_update-container">
				<button className='contact_delete' type="button">Delete</button>
				<div className="contact_update_save_container">
					<button className='contact_cancel' type="button">Cancel</button>
					<button className='contact_save' type="button">Save</button>
				</div>
			</div>
		</div>
	);
}
