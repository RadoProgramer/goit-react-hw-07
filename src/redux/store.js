import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./slices/contactsSlice";
import filtersReducer from "./slices/filtersSlice";
import { combineReducers } from "redux";
import { serializableCheckMiddleware } from "../middleware/apiMiddleware";

const rootReducer = combineReducers({
	contacts: contactsReducer,
	filters: filtersReducer,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: serializableCheckMiddleware,
});

export const persistor = persistStore(store);
