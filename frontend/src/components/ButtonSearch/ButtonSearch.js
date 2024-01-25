import React from 'react';
import styles from './ButtonSearch.module.css';


function ButtonSearch({ onClick }) {
  return (
    <button className={styles.container} onClick={onClick}>
      Buscar
    </button>
  );
}

export default ButtonSearch;
