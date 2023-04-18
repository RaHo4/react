import { createAction } from '@reduxjs/toolkit';

export const setContact = createAction('contacts/setContact');
export const removeContact = createAction('contacts/removeContact');
export const filterContacts = createAction('contacts/filterContacts');
export const getContacts = createAction('contacts/getUsers')