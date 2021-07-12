import React, {useState, useEffect} from "react";
import EmailList from "../EmailList"
import {useContactContext} from "../../Context/currentContactContext"
import ConfirmationModal from "../ConfirmationModal";

export default function ContactInfo() {
	const {currentContact, isModified, setIsModified, setStagingContact, isNewContact} = useContactContext()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [emailList, setEmailList] = useState([])


	const [addingEmail, setAddingEmail]= useState(false)
	const [emailToAdd, setEmailToAdd]= useState(false)
	const [emailTarget, setEmailTarget] = useState('')

	const emailListAddHandler = () =>{
		setEmailList(prevEmailList => [...prevEmailList, emailToAdd])
	}
	const emailListRemoveHandler = () => {
		setEmailList(prevEmailList => prevEmailList.filter(email => email !== emailTarget))
	}

	useEffect(() => {
		if (currentContact){
			setFirstName(currentContact.firstName)
			setLastName(currentContact.lastName)
			setEmailList([...currentContact.emails])
			setEmailToAdd(false)
		}
	}, [currentContact])

	// useEffect(()=>{
	// 	if (currentContact){
	// 	if(firstName !== currentContact.firstName || lastName !== currentContact.lastName){
	// 		 setIsModified(true)
	// 		 setStagingContact(contact => {
	// 			 contact.firstName = firstName
	// 			 contact.lastName = lastName
	// 			 return contact
	// 		 })
	// 	} else if (emailList.length !== currentContact.emails.length || emailList[emailList.length - 1] !== currentContact.emails[emailList.length - 1]){
	// 		setIsModified(true)
	// 		setStagingContact(contact=> {
	// 			contact.emails=[...emailList]
	// 			return contact
	// 		})
	// 	} else {
	// 		setIsModified(false)
	// 	}

	// }
	// },[firstName, lastName, emailList])
	return (
		<div className=''>
			<div className="contact_name_container">
				<label>First Name
					<input type="text" name="first_name" value={firstName} onChange={event => setFirstName(event.target.value)}></input>
				</label>
				<label>Last Name
					<input type="text" name="last_name" value={lastName} onChange={event => setLastName( event.target.value)}></input>
				</label>
			</div>
			<div className=''>
			{/* each email will have an on hover function that will make a delete button show */}
			{currentContact && emailList.map((email, i) => (
				<div key={`email: ${i}`} className={`contact_email ${email === emailTarget ? 'selected': ''}`}
				onMouseEnter={() => setEmailTarget(email)}
				onMouseLeave={()=> {
					if(email === emailTarget) setEmailTarget('')
				}}
				>
					{email}
					{emailTarget === email && (
						<button className='delete_email' onClick={emailListRemoveHandler}>
							<div className='circle red small'>
								<div className='horizontal_white_line'/>
							</div>
						</button>
					)}
				</div>
				))}
			{!addingEmail && <div className='add_email' onClick={()=>setAddingEmail(isAdding => !isAdding)}>
				<div className='circle blue small'>
					<div className='vertical_white_line' />
					<div className='horizontal_white_line' />
				</div>
				add email
			</div>}
			{addingEmail && <div className='add_email_form'>
			<label className='label'>
				email address
				<input type="email"
				value={emailToAdd}
				onChange={event => setEmailToAdd(event.target.value)}
				/>
			</label>
			<button className='contact_save' onClick={emailListAddHandler}>confirm</button>
			</div>}
		</div>
			<div className="contact_update-container">

					<ConfirmationModal classList='contact_delete'
						purpose='delete'
						disabled={false}
					/>
				<div className="contact_update_save_container">
					<ConfirmationModal classList={`contact_cancel ${isModified? 'active' : ''}`}
						purpose='cancel'
						disabled={((firstName === currentContact.firstName && lastName === currentContact.lastName && !emailToAdd && emailList.length === currentContact.emails.length ) || isNewContact)}
					/>
					<ConfirmationModal classList={`contact_save ${isModified? 'active' : ''}`}
						purpose='save'
						currentChanges = {{firstName, lastName, emails:emailList}}
						disabled={((firstName === currentContact.firstName && lastName === currentContact.lastName && !emailToAdd && emailList.length === currentContact.emails.length ) || isNewContact)}
					/>
				</div>
			</div>
		</div>
	);
}
