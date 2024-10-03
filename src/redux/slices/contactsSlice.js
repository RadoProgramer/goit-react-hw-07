import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getContacts,
	addNewContact,
	deleteExistingContact,
} from "../../api/contactsAPI";

const initialState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchContacts = createAsyncThunk(
	"contacts/fetchAll",
	async (_, { rejectWithValue }) => {
		try {
			return await getContacts();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addContact = createAsyncThunk(
	"contacts/addContact",
	async (contact, { rejectWithValue }) => {
		try {
			return await addNewContact(contact);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteContact = createAsyncThunk(
	"contacts/deleteContact",
	async (id, { rejectWithValue }) => {
		try {
			return await deleteExistingContact(id);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(fetchContacts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchContacts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(addContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.loading = false;
				state.items.push(action.payload);
			})
			.addCase(addContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(deleteContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.loading = false;
				state.items = state.items.filter(
					(contact) => contact.id !== action.payload
				);
			})
			.addCase(deleteContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default contactsSlice.reducer;
