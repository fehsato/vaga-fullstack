import React from 'react';
import styles from './PageNavegation.module.css';

function PageNavigation({ pageNumbers, setCurrentPage }) {
  return (
    <div className={styles.pageNavigationContainer}>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => setCurrentPage(number)}>
          {number}
        </button>
      ))}
    </div>
  );
}

export default PageNavigation;
