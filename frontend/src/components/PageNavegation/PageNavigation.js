import React from 'react';
import styles from './PageNavegation.module.css';

//Define um componente que aceita duas propriedades (um array e uma função)
function PageNavigation({ pageNumbers, setCurrentPage }) {

  //Renderiza o componente. Utiliza o método 'map' para criar os botões das páginas. É adicionado uma 'key' em cada botão que quando clicado, chama a função da página
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

//Exporta para que o componente possa ser usado em outros lugares da aplicação
export default PageNavigation;
