// LeiteTable.js
import React, { useState } from 'react';
import styles from './LeiteTable.module.css';

function LeiteTable({ currentItems, handleEdit, handleDelete, sortColumn, setSortColumn, sortDirection, setSortDirection }) {
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? '▲' : '▼';
    }
    return null;
  };

  const sortedItems = [...currentItems].sort((a, b) => {
    const order = sortDirection === 'asc' ? 1 : -1;

    if (sortColumn === 'id') {
      return order * (a.id - b.id);
    }

    return 0;
  });

  return (
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

export default LeiteTable;

