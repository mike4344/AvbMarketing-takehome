import React, {useState} from "react";
import { useContactContext } from "../../Context/currentContactContext";

export default function EmailList({emailList, setEmailList}) {
	const [addingEmail, setAddingEmail]= useState(false)
	const [emailToAdd, setEmailToAdd]= useState('')
	const [emailTarget, setEmailTarget] = useState('')

	const handleAddEmail = () => {
		setEmailList(emails => [...emails, emailToAdd])
	}

	return (
		<div className=''>
			{/* each email will have an on hover function that will make a delete button show */}
			{emailList.map((email, i) => (
				<div key={`email: ${i}`} className={`contact_email ${email === emailTarget ? 'selected': ''}`}
				onMouseEnter={setEmailTarget(email)}
				onMouseLeave={()=> {
					if(email === emailTarget) setEmailTarget('')
				}}
				>
					{email}
					{emailTarget === email && (
						<button className='delete_email' onClick={setEmailList(emails => emails.filter(email => email !== emailTarget))}>
							<div className='circle red'>
								<div className='horizontal_white_line'/>
							</div>
						</button>
					)}
				</div>
				))}
			{addingEmail && <div className='add_email' onClick={setAddingEmail(isAdding => !isAdding)}>
				<div className='circle blue'>
					<div className='vertical_white_line' />
					<div className='horizontal_white_line' />
				</div>
				add email
			</div>}
			{!addingEmail && <div className='add_email_form'>
			<label className='label'>
				email address
				<input type="email"
				value={emailToAdd}
				onChange={event => setEmailToAdd(event.target.value)}
				/>
			</label>
			<button className='contact_save' onClick={handleAddEmail}>confirm</button>
			</div>}
		</div>
	);
}
