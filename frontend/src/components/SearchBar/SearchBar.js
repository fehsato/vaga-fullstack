import React, { useState } from 'react';
import ButtonSearch from '../ButtonSearch/ButtonSearch';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className={styles.container}>
      <input className={styles.input}
        type="text"
        placeholder="Digite aqui..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ButtonSearch onClick={handleSearch} />
    </div>
  );
}

export default SearchBar;
