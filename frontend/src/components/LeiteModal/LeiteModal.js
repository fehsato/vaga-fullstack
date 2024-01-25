import React from 'react';
import Modal from 'react-modal';
import styles from './LeiteModal.module.css';

function LeiteModal({ isModalOpen, handleModal, editLeite, setEditLeite, handleSave }) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => handleModal(null, false)}
      contentLabel={editLeite.id ? "Editar Item" : "Cadastrar Novo Item"}
      className={styles.modal}
    >
      <h2 className={styles.modalTitle}>{editLeite.id ? "Editar Item" : "Cadastrar Novo Item"}</h2>
      <label className={styles.inputField}>
        Descrição: <br />
        <input
          type="text"
          name="nome"
          value={editLeite.nome}
          onChange={(e) => setEditLeite({ ...editLeite, nome: e.target.value })}
          className={styles.inputText}
        />
      </label> <br />
      <button
        onClick={() => handleSave(editLeite.id ? `http://localhost:8080/${editLeite.id}` : 'http://localhost:8080/', editLeite.id ? 'PUT' : 'POST', { nome: editLeite.nome })}
        className={styles.button}
      >
        Salvar
      </button>
      <button onClick={() => handleModal(null, false)} className={`${styles.buttonCancel} ${styles.cancelButton}`}>
        Cancelar
      </button>
    </Modal>
  );
}

export default LeiteModal;
