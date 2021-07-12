import React, {useState, useEffect} from "react";
import {useContactContext} from "../../Context/currentContactContext"
import ConfirmationModal from "../ConfirmationModal";

export default function ContactInfo() {
	const {currentContact, isModified, isNewContact} = useContactContext()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [emailList, setEmailList] = useState([])


	const [addingEmail, setAddingEmail]= useState(false)
	const [emailToAdd, setEmailToAdd]= useState('')
	const [emailTarget, setEmailTarget] = useState('')

	const emailListRemoveHandler = () => {
		setEmailList(prevEmailList => prevEmailList.filter(email => email !== emailTarget))
	}

	useEffect(() => {
		if (currentContact){
			setFirstName(currentContact.firstName)
			setLastName(currentContact.lastName)
			setEmailList( currentContact.emails?.length > 0 ? [...currentContact.emails] : currentContact.emails)
			setEmailToAdd('')
		}
	}, [currentContact])

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
			<button className='contact_save' disabled={emailList.includes(emailToAdd)} onClick={()=>setEmailList(prevEmailList => [...prevEmailList, emailToAdd])}>confirm</button>
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
						disabled={!(isNewContact || !(firstName === currentContact.firstName && lastName === currentContact.lastName && !emailToAdd && emailList.length === currentContact.emails.length ))}
					/>
					{console.log(isNewContact)}
					<ConfirmationModal classList={`contact_save ${isModified? 'active' : ''}`}
						purpose='save'
						currentChanges = {{firstName, lastName, emails:emailList}}
						disabled={((firstName === currentContact.firstName && lastName === currentContact.lastName && !emailToAdd && emailList.length === currentContact.emails.length ))}
					/>
				</div>
			</div>
		</div>
	);
}
