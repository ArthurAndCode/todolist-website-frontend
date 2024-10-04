
import React from 'react';
import styles from './Checkbox.module.css';

function Checkbox({ checked, onChange }) {
  return (
    <label className={styles.checkboxContainer}>
      Remember me
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.checkmark}></span>
    </label>
  );
}

export default Checkbox;
