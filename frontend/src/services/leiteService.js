import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getLeiteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/leite/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter o leite:', error);
    throw error;
  }
};

export const getAllLeites = async () => {
  try {
    const response = await axios.get(`${API_URL}/leite`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter todos os leites:', error);
    throw error;
  }
};

// Outras funções para adicionar, excluir, atualizar leites, etc.
