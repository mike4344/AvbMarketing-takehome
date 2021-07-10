import React, {useState} from "react";
import EmailList from "../EmailList"
import useContactContext from "../../Context/currentContactContext"
import ConfirmationModal from "../ConfirmationModal";

export default function ContactInfo() {
	const {currentContact, isModified, setIsModified, setStagingContact, isNewContact} = useContactContext()
	const [firstName, setFirstName] = useState(currentContact.firstName)
	const [lastName, setLastName] = useState(currentContact.lastName)
	const [emailList, setEmailList] = useState([...currentContact.email])
	useEffect(()=>{
		if(firstName !== currentContact.firstName || lastName !== currentContact.lastName){
			 setIsModified(true)
			 setStagingContact(contact => {
				 contact.firstName = firstName
				 contact.lastName = lastName
				 return contact
			 })
		} else if (emailList.length !== currentContact.emails.length || emailList[emailList.length - 1] !== contactContext.emails[emailList.length - 1]){
			setIsModified(true)
			setStagingContact(contact=> {
				contact.emails=[...emailList]
				return contact
			})
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

					<ConfirmationModal classList='contact_delete'
						purpose='delete'
						disabled={false}
					/>
				<div className="contact_update_save_container">
					<ConfirmationModal classList={`contact_cancel ${isModified? 'active' : ''}`}
						purpose='cancel'
						disabled={!isModified && !isNewContact}
					/>
					<ConfirmationModal classList={`contact_save ${isModified? 'active' : ''}`}
						purpose='save'
						disabled={!isModified && !isNewContact && firstName === '' && lastName === ''}
					/>
				</div>
			</div>
		</div>
	);
}
