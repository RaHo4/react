import { createReducer } from "@reduxjs/toolkit";
import {
  setContact,
  removeContact,
  filterContacts,
} from "./contactsActions";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getUsers = createAsyncThunk("contacts/getContacts", async () => {
  const response = await axios.get(
    "https://6400bd3663e89b0913b5f740.mockapi.io/contacts"
  );
  return response.data;
});

const contactsReducer = createReducer(
  {
    contacts: {
      items: [],
      filter: "",
      loading: false,
      error: null,
    },
  },
  (builder) => {
    builder
      .addCase(setContact, (state, action) => ({
        ...state,
        contacts: {
          ...state.contacts,
          items: state.contacts.items.concat(
            action.payload.filter(
              (contact) =>
                !state.contacts.items.some(
                  (preloaded) => preloaded.id === contact.id
                )
            )
          ),
        },
      }))
      .addCase(removeContact, (state, action) => ({
        ...state,
        contacts: {
          ...state.contacts,
          items: action.payload,
        },
      }))
      .addCase(filterContacts, (state, action) => ({
        ...state,
        contacts: {
          ...state.contacts,
          filter: action.payload,
        },
      }))
      .addCase(getUsers.pending, (state, action) => {
        return { ...state, contacts: { ...state.contacts, loading: true } };
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        return {
          ...state,
          contacts: {
            ...state.contacts,
            items: action.payload,
            loading: false,
          },
        };
      })
      .addCase(getUsers.rejected, (state, action) => {
        return {
          ...state,
          contacts: {
            ...state.contacts,
            loading: false,
            error: action.error.message,
          },
        };
      })
      .addDefaultCase((state, action) => state);
  }
);

export { contactsReducer, getUsers };
