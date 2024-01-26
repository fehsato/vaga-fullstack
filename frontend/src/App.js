import React, { useState, useEffect } from 'react';
import LeiteModal from './components/LeiteModal/LeiteModal';
import LeiteTable from './components/LeiteTable/LeiteTable';
import PageNavigation from './components/PageNavegation/PageNavigation';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './App.css';

function MyApp() {
  //Estados
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLeite, setEditLeite] = useState({ id: null, nome: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  //Efeito para Paginação
  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  //Função para manipular o modal
  const handleModal = (leite, isOpen) => {
    const newEditLeite = leite ? { id: leite.id, nome: leite.nome } : { id: null, nome: '' };
    setEditLeite(newEditLeite);
    setIsModalOpen(isOpen);
  };

  //Função para realizar a pesquisa
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

  //Função para excluir um item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        handleSearch();
      } else {
        const errorMessage = await response.text();
        console.error('Erro na solicitação:', response.status, errorMessage);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error.message);
    }
  };

  //Função para abrir o modal de edição
  const handleEdit = (leite) => {
    handleModal(leite, true);
  };

  //Função para salvar alterações
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
        handleSearch();
        handleModal(null, false);
      } else {
        const errorMessage = await response.text();
        console.error('Erro na solicitação:', response.status, errorMessage);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error.message);
    }
  };

  //Função para lidar com a ordenação da tabela
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  //Cálculos para Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  //Criação de Números de Páginas
  const pageNumbers = Array.from({ length: Math.ceil(searchResults.length / itemsPerPage) }, (_, i) => i + 1);

  //Renderização do Componente
  return (
    <div className="myAppContainer">
      <div className="header">
        <h1 className="titulo">Catálogo de Leite 🥛</h1>
        <div className="buttonContainer">
          <SearchBar onSearch={handleSearch} />
          <button className="buttonCadastrar" onClick={() => handleModal(null, true)}>Cadastrar Novo Item</button>
        </div>
      </div>

      {loading && <p className="loadingMessage">Carregando...</p>}

      <LeiteTable
        currentItems={currentItems}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        handleSort={handleSort}
      />

      <PageNavigation pageNumbers={pageNumbers} setCurrentPage={setCurrentPage} />

      <LeiteModal
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        editLeite={editLeite}
        setEditLeite={setEditLeite}
        handleSave={handleSave}
      />
    </div>
  );
}

export default MyApp;
