import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';

// Componente para o botão de busca
function ButtonSearch({ onClick }) {
  return (
    <button onClick={onClick}>
      Buscar
    </button>
  );
}

// Componente para a barra de pesquisa
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  // Manipula a alteração no campo de pesquisa
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // Executa a busca ao clicar no botão
  const handleSearch = () => {
    onSearch(searchTerm);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Digite aqui..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ButtonSearch onClick={handleSearch} />
    </div>
  );
}

// Componente para a navegação entre páginas
function PageNavigation({ pageNumbers, setCurrentPage }) {
  return (
    <div>
      {/* Renderiza os botões de navegação entre páginas */}
      {pageNumbers.map(number => (
        <button key={number} onClick={() => setCurrentPage(number)}>
          {number}
        </button>
      ))}
    </div>
  );
}

// Componente principal
function MyApp() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLeite, setEditLeite] = useState({ id: null, nome: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Efeito para executar a busca inicial ao carregar a página
  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  // Função para gerenciar a abertura/fechamento do modal
  const handleModal = (leite, isOpen) => {
    if (leite) {
      setEditLeite({ id: leite.id, nome: leite.nome });
    } else {
      setEditLeite({ id: null, nome: '' });
    }
    setIsModalOpen(isOpen);
  };

  // Função para realizar a busca
  const handleSearch = async (searchTerm) => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/leites${searchTerm ? `?termo=${searchTerm}` : ''}`);
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        const errorMessage = await response.text();
        console.error('Erro na solicitação:', response.status, errorMessage);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar um item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Atualiza os resultados após a exclusão
        handleSearch();
      } else {
        const errorMessage = await response.text();
        console.error('Erro na solicitação:', response.status, errorMessage);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error.message);
    }
  };

  // Função para salvar uma edição ou adição
  const handleSave = async (url, method, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Atualiza os resultados após a ação (edição ou adição)
        handleSearch();
        // Fecha o modal
        handleModal(null, false);
      } else {
        const errorMessage = await response.text();
        console.error('Erro na solicitação:', response.status, errorMessage);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error.message);
    }
  };

  // Função para abrir o modal de edição
  const handleEdit = (leite) => {
    handleModal(leite, true);
  };

  // Lógica para cálculos de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  // Lógica para renderização dos números das páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1>Catálogo de Leite</h1>
      <div>
        {/* Componente de barra de pesquisa */}
        <SearchBar onSearch={handleSearch} />
        <button onClick={() => handleModal(null, true)}>
          Cadastrar Novo Item
        </button>
      </div>

      {/* Mostra mensagem de carregamento se estiver carregando */}
      {loading && <p>Carregando...</p>}

      {/* Renderiza a tabela com os itens da página atual */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeia e renderiza os itens da página atual */}
          {currentItems.map((leite) => (
            <tr key={leite.id}>
              <td>{leite.id}</td>
              <td>{leite.nome}</td>
              <td>
                <button onClick={() => handleEdit(leite)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(leite.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Componente de navegação entre páginas */}
      <PageNavigation pageNumbers={pageNumbers} setCurrentPage={setCurrentPage} />

      {/* Modal para a edição ou adição de itens */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => handleModal(null, false)}
        contentLabel={editLeite.id ? "Editar Item" : "Cadastrar Novo Item"}
      >
        <h2>{editLeite.id ? "Editar Item" : "Cadastrar Novo Item"}</h2>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={editLeite.nome}
            onChange={(e) => setEditLeite({ ...editLeite, nome: e.target.value })}
          />
        </label>
        <button onClick={() => handleSave(editLeite.id ? `http://localhost:8080/${editLeite.id}` : 'http://localhost:8080/', editLeite.id ? 'PUT' : 'POST', { nome: editLeite.nome })}>
          Salvar
        </button>
        <button onClick={() => handleModal(null, false)}>
          Cancelar
        </button>
      </Modal>
    </div>
  );
}

export default MyApp;
