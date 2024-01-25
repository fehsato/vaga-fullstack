import React from 'react';
import styles from './LeiteTable.module.css'

function LeiteTable({ currentItems, handleEdit, handleDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((leite) => (
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
