import React, { useState, useEffect } from 'react';
import LeiteModal from './components/LeiteModal/LeiteModal';
import LeiteTable from './components/LeiteTable/LeiteTable';
import PageNavigation from './components/PageNavegation/PageNavigation';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './App.css';

function MyApp() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLeite, setEditLeite] = useState({ id: null, nome: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const handleModal = (leite, isOpen) => {
    if (leite) {
      setEditLeite({ id: leite.id, nome: leite.nome });
    } else {
      setEditLeite({ id: null, nome: '' });
    }
    setIsModalOpen(isOpen);
  };

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

  const handleEdit = (leite) => {
    handleModal(leite, true);
  };

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

    // Modifique a função handleSort para ordenar a lista
    const handleSort = (column) => {
      if (sortColumn === column) {
    // Se já estiver ordenando pela mesma coluna, alterne a direção
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  }   else {
    // Se estiver ordenando por uma nova coluna, defina a coluna e a direção padrão
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
};

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="myAppContainer">
      <div className="header">
        <h1 className="titulo">Catálogo de Leite 🥛</h1>
        <div className="buttonContainer">
          <SearchBar onSearch={handleSearch} />
          <button className="buttonCadastrar"onClick={() => handleModal(null, true)}>Cadastrar Novo Item</button>
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
