import React from 'react';
import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div className={css.block}>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
