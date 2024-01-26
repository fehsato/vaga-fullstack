import React, { useState } from 'react';
import styles from './LeiteTable.module.css';

//Define um componente que aceita diversas propriedades
function LeiteTable({ currentItems, handleEdit, handleDelete, sortColumn, setSortColumn, sortDirection, setSortDirection }) {

  //É uma função chamada quando o botão de ordenação é clicado. Atualiza a coluna de classificação (setSortColumn) e a direção da classificação (setSortDirection) com base na coluna clicada.
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  //Define uma função que retorna uma seta na coluna
  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? '▲' : '▼';
    }
    return null;
  };

  //Cria uma cópia dos itens atuais e os ordenas de acordo com a direção
  const sortedItems = [...currentItems].sort((a, b) => {
    const order = sortDirection === 'asc' ? 1 : -1;
    if (sortColumn === 'id') {
      return order * (a.id - b.id);
    }
    return 0;
  });

  //Renderiza o componente em uma tabela, cabeçalho e corpo.
  return (

    //O cabeçalho tem três itens, onde o iten 'ID' tem um botão que chama a ordenação
    //Os itens são mapeados e renderizados em linhas na tabela, onde cada linha possui botões de edição e exclusão de itens
    <table className={styles.table}>
      <thead>
        <tr>
          <th onClick={() => handleSort('id')}>
            ID {getSortIcon('id')}
          </th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((leite) => (
          <tr key={leite.id}>
            <th>{leite.id}</th>
            <td>{leite.nome}</td>
            <td className={styles.actions}>
              <button className={styles.edit} onClick={() => handleEdit(leite)}>
                Editar
              </button>
              <button className={styles.delete} onClick={() => handleDelete(leite.id)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

//Exporta para que o componente possa ser usado em outros lugares da aplicação
export default LeiteTable;

