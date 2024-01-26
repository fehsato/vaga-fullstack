import React from 'react';
import Modal from 'react-modal';
import styles from './LeiteModal.module.css';

//Define um componente que aceita diversas propriedades
function LeiteModal({ isModalOpen, handleModal, editLeite, setEditLeite, handleSave }) {

  //Renderiza o componente do pacote em várias propriedades
  return (
    <Modal
    //O modal é aberto ou fechado de acordo com o valor de 'isModalOpen'
      isOpen={isModalOpen}
      //'onRequestClose' é uma função para o fechamento do modal quando o usuário deseja
      onRequestClose={() => handleModal(null, false)}
      //'contentLabel' define um rótulo acessível para o conteúdo do modal, dependendo se 'editLeite.id' existe, determina se é um modal de edição ou criação.
      contentLabel={editLeite.id ? "Editar Item" : "Cadastrar Novo Item"}
      className={styles.modal}
    >
      <h2 className={styles.modalTitle}>{editLeite.id ? "Editar Item" : "Cadastrar Novo Item"}</h2>
      <label className={styles.inputField}>
        Descrição: <br />
        <input //Renderiza um input com um evento que atualiza o estado 
          type="text"
          name="nome"
          value={editLeite.nome}
          onChange={(e) => setEditLeite({ ...editLeite, nome: e.target.value })}
          className={styles.inputText}
        />
      </label> <br />
      <button //Renderiza dois botões em que ambos chamam funções específicas quando clicados
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

//Exporta para que o componente possa ser usado em outros lugares da aplicação
export default LeiteModal;
