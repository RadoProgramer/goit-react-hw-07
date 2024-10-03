import { useDispatch, useSelector } from "react-redux";
import {
	fetchContacts,
	addContact,
	deleteContact,
} from "../redux/slices/contactsSlice";
import { useEffect } from "react";

const useContacts = () => {
	const dispatch = useDispatch();
	const {
		items: contacts,
		loading,
		error,
	} = useSelector((state) => state.contacts);

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	const addNewContact = (contact) => {
		dispatch(addContact(contact));
	};

	const removeContact = (id) => {
		dispatch(deleteContact(id));
	};

	return {
		contacts,
		loading,
		error,
		addNewContact,
		removeContact,
	};
};

export default useContacts;
