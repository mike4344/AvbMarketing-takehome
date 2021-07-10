import React, {useState, useEffect} from "react";
import Contact from "../Contact"

export default function Contacts() {
    const [contactList, setContactList] = useState([])
    const [currentContact, setCurrentContact] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // Fetch list of current contacts
    useEffect(() =>{
        fetch(`https://avb-contacts-api.herokuapp.com/contacts/paginated?page=${currentPage}&itemsPerPage=20`)
        .then(response=>{
            if (response.ok) return response.json()
            throw response
        })
        .then(contacts => {
            setContactList(contacts)
        })
        .catch(error =>{
            throw new Error(`There was the following error: ${error}`)
        })
        .finally(() => setLoading(false))
        return () => {
            setLoading(true)
            setError(null)
        }
    },[currentPage])
	return (
		<div className=''>
            {/* check if fetch request is returned if so map through the objects */}
            {loading && 'Loading...'}
            {!loading && contactList.map(contact =>{
                {/* create contact components and pass through the contacts info to the component */}
                return <Contact contact={contact} />
            })}
            {/* Onclick setting currentContact */}
		</div>
	);
}
