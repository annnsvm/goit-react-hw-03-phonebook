import React from 'react';
import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          {name + ' : ' + number}
          <button
            type="button"
            name="delete"
            onClick={() => onDeleteContact(id)}
            className={css.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
