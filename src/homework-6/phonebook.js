import React, { Component, useState, useEffect } from "react";
import styles from "./styles.module.css";
import {
  setContact,
  removeContact,
  filterContacts,
} from "./contactsActions";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./contactsReducer";
import axios from "axios";

function ContactForm(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const handleInputChange = ({ target }) => {
    const { value, name } = target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "phone":
        setPhone(value);
        break;
    }
  };

  useEffect(() => {
    setName("");
    setPhone("");
  }, [shouldUpdate, props]);

  const submitButtonClick = (evt) => {
    evt.preventDefault();
    const { addContact } = props;
    setShouldUpdate(!shouldUpdate);
    addContact({ name: `${name}`, phone: phone });
  };

  return (
    <>
      <form className={styles.name_form}>
        <label>Name</label>
        <br></br>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
          value={name}
        />
        <br></br>
        <label>Number</label>
        <br></br>
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputChange}
          value={phone}
        />
      </form>
      <button type="submit" onClick={submitButtonClick}>
        Add contact
      </button>
    </>
  );
}

function Filter(props) {
  const filter = ({ target }) => {
    const { changeFilterState } = props;
    const { value } = target;
    changeFilterState(value);
  };

  return (
    <>
      <input
        type="tel"
        name="filter"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={filter}
      />
    </>
  );
}

function ContactList(props) {
  const { contacts, deleteContact } = props;
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.phone}
          <button onClick={() => deleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactsReducer.contacts);
  const isLoading = useSelector(
    (state) => state.contactsReducer.contacts.loading
  );
  const error = useSelector((state) => state.contactsReducer.contacts.error);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const addContact = (new_contact) => {
    new_contact.id = contacts.items.length + 1;
    if (new_contact.phone === "" || new_contact.phone === "") return;
    if (contacts.items.some((contact) => contact.name === new_contact.name))
      return;

    dispatch(setContact([new_contact]));
    axios.post(
      `https://6400bd3663e89b0913b5f740.mockapi.io/contacts`,
      new_contact
    );
  };

  const setFilterState = (filter) => {
    dispatch(filterContacts(filter));
  };

  const getFilteredContacts = () => {
    const filteredContacts = contacts.items.filter((contact) =>
      contact.name.toLowerCase().includes(contacts.filter.toLowerCase())
    );
    return filteredContacts;
  };

  const deleteContact = (id) => {
    const filteredContacts = contacts.items.filter(
      (contact) => contact.id !== id
    );

    dispatch(removeContact(filteredContacts));
    axios.delete(`https://6400bd3663e89b0913b5f740.mockapi.io/contacts/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter changeFilterState={setFilterState} />
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </>
  );
}

export default App;
