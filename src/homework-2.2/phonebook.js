import React, { Component } from "react";
import styles from "./styles.module.css";
import { nanoid } from "nanoid";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  submitButtonClick = (evt) => {
    evt.preventDefault();
    const { addContact } = this.props;
    const { name, number } = this.state;

    addContact({ name: `${name}`, number: number, id: nanoid() });
  };

  render() {
    const { contacts, addContact } = this.props;
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
            onChange={this.handleInputChange}
          />
          <br></br>
          <label>Number</label>
          <br></br>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleInputChange}
          />
        </form>
        <button type="submit" onClick={this.submitButtonClick}>
          Add contact
        </button>
      </>
    );
  }
}

class Filter extends Component {
  filter = ({ target }) => {
    const { changeFilterState } = this.props;
    const { value } = target;
    changeFilterState(value);
  };

  render() {
    return (
      <>
        <input
          type="tel"
          name="filter"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.filter}
        />
      </>
    );
  }
}

class ContactList extends Component {
  render() {
    const { contacts, deleteContact } = this.props;
    return (
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    this.setState({contacts});
  }

  addContact = (new_contact) => {
    const contacts = [...this.state.contacts];

    if (new_contact.number === "" || new_contact.name === "") return;
    if (contacts.some((contact) => contact.name === new_contact.name)) return;

    contacts.push(new_contact);
    localStorage.setItem('contacts',  JSON.stringify(contacts));
    this.setState({ contacts });
  };

  setFilterState = (filter) => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const contacts = [...this.state.contacts];

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return filteredContacts;
  };

  deleteContact = (id) => {
    const contacts = [...this.state.contacts];
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter changeFilterState={this.setFilterState} />
        <ContactList
          contacts={this.getFilteredContacts()}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
