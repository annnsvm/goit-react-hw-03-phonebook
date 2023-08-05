import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from '../ContactList';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  componentDidMount() {
    const contactsLS = JSON.parse(localStorage.getItem('contacts'));
    if (contactsLS) {
      try {
        this.setState({ contacts: contactsLS });
      } catch (error) {
        console.error('Error parsing stored contacts:', error);
      }
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const isExist = contacts.find(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    } else {
      const newContact = {
        name,
        number,
        id: nanoid(),
      };
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContact = this.getVisibleContact();
    return (
      <div className={css.block}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <h2 className={css.text}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />

        <ContactList
          contacts={visibleContact}
          onDeleteContact={this.deleteContact}
        ></ContactList>
      </div>
    );
  }
}
