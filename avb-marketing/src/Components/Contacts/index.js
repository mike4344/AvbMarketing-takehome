import React, {useState, useEffect} from "react";
import Contact from "../Contact"
import {useContactContext} from "../../Context/currentContactContext"


export default function Contacts() {
    const {changesCommitted} = useContactContext()
    const [contactList, setContactList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    // Fetch list of current contacts
    useEffect(() =>{

        fetch(`https://avb-contacts-api.herokuapp.com/contacts/paginated?page=${currentPage}&itemsPerPage=20`)
        .then(response=> response.ok ? response.json() : response.status)
        .then(data => {
            setContactList(data.contacts)
            return 'Contact Set'
        })
        .then(success => success ? setLoading(false) : console.log(success))
        .catch(error =>{
            throw new Error(`There was the following error: ${error}`)
        })
        //.finally(() => setLoading(false))
        // return () => {
        //     setLoading(true)
        // }
    },[currentPage, changesCommitted])
	return (
		<div className='contact_container'>
            <div>
                <h1>Contact</h1>
                <div className='blue circle large'>
                    <div className='vertical_white_line' />
                    <div className='horizontal_white_line' />
                </div>
            </div>
            {/* check if fetch request is returned if so map through the objects */}
            {loading && 'Loading...'}
            {!loading && contactList.map(contact =>{
                {/* create contact components and pass through the contacts info to the component */}
                return <Contact contact={contact} key={`contactId: ${contact.id}`}/>
            })}
		</div>
	);
}
