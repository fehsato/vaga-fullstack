import React, { useState } from 'react';
import ButtonSearch from '../ButtonSearch/ButtonSearch';
import styles from './SearchBar.module.css';

//Define um componente, onde recebe uma propriedade de uma função a ser chamada quando ocorrer uma pesquisa 
function SearchBar({ onSearch }) {

  //Utiliza o hook para criar um estado e uma função para atualizar o estado. Ele inicializa com a string vazia
  const [searchTerm, setSearchTerm] = useState('');

  //Define uma função que é chamada quando o valor do input é alterado. Logo em seguida ele atualiza o estado com o valor do input
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //Define uma função para ser chamada quando o botão de pesquisa é acionado. Ele chama a função 'onSearch' com o valor atual do estado
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  //Renderiza o componente com base no estado. 
  //O input é renderizado para receber o termo de pesquisa. Ele tem um placeholder, um valor controlado pelo estado e um evento que chama a função que altera o valor. 
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

//Exporta para que o componente possa ser usado em outros lugares da aplicação
export default SearchBar;
