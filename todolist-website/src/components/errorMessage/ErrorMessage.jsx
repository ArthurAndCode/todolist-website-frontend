
import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return message ? <p className={styles.errorMessage}>{message}</p> : null;
};

export default ErrorMessage;
