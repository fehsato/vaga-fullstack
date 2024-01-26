import React from 'react';
import styles from './ButtonSearch.module.css';

//Define um componente funcional ButtonSearch que recebe uma propriedade onClick
const ButtonSearch = ({ onClick }) => (
  //Adiciona um evento onClick ao botão que chama a função passada como propriedade
  <button className={styles.container} onClick={onClick}>
    Buscar
  </button>
);

//Exporta o componente para que possa ser utilizado em outros lugares da aplicação
export default ButtonSearch;
