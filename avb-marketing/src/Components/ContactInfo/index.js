import React, {useState} from "react";
import EmailList from "../EmailList"
import useContactContext from "../../Context/currentContactContext"

export default function ContactInfo() {
	const {contactContext, isModified, setIsModified} = useContactContext()
	const [firstName, setFirstName] = useState(contactContext.firstName)
	const [lastName, setLastName] = useState(contactContext.lastName)
	const [emailList, setEmailList] = useState([...contactContext.email])
	useEffect(()=>{
		if(firstName !== contactContext.firstName || lastName !== contactContext.lastName){
			 setIsModified(true)
		} else if (emailList.length !== contactContext.emails.length || emailList[emailList.length - 1] !== contactContext.emails[emailList.length - 1]){
			setIsModified(true)
		} else {
			setIsModified(false)
		}

	},[firstName, lastName, emailList])
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
			<EmailList emailList={emailList} setEmailList={setEmailList} />
			<div className="contact_update-container">
				<button className='contact_delete'
				type="button"
				onClick={handleDeleteContact}
				>Delete</button>
				<div className="contact_update_save_container">
					<button className={`contact_cancel ${isModified? 'active' : ''}`}
					type="button"
					onClick={handleCancelContact}
					>Cancel</button>
					<button
					className={`contact_save ${isModified? 'active' : ''}`}
					type="button"
					onClick={handleSaveContact}
					>Save</button>
				</div>
			</div>
		</div>
	);
}
