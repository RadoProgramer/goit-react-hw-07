import axios from 'axios';
import { CONTACTS_ENDPOINT } from '../utils/apiConfig';

export const getContacts = async () => {
  const response = await axios.get(CONTACTS_ENDPOINT);
  return response.data;
};

export const addNewContact = async (contact) => {
  const response = await axios.post(CONTACTS_ENDPOINT, contact);
  return response.data;
};

export const deleteExistingContact = async (id) => {
  await axios.delete(`${CONTACTS_ENDPOINT}/${id}`);
  return id;
};
