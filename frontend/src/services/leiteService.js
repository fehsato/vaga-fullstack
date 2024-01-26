import axios from 'axios';

//Define uma constante API_URL com a base da URL da API
const API_URL = 'http://localhost:8080';

//Exporta uma função chamada 'getLeiteById' que aceita um parâmetro 'id'.
export const getLeiteById = async (id) => {
  try {
    //Utiliza o Axios para fazer uma requisição GET à API para obter informações de um leite específico pelo ID.
    const response = await axios.get(`${API_URL}/leite/${id}`);
    return response.data;
  } catch (error) {
    //Em caso de erro, imprime um erro no console e lança a exceção
    console.error('Erro ao obter o leite:', error);
    throw error;
  }
};

//Exporta uma função chamada 'getAllLeites'
export const getAllLeites = async () => {
  try {
    //Utiliza o Axios para fazer uma requisição GET à API para obter informações de todos os leites
    const response = await axios.get(`${API_URL}/leite`);
    return response.data;
  } catch (error) {
    //Em caso de erro, imprime um erro no console e lança a exceção
    console.error('Erro ao obter todos os leites:', error);
    throw error;
  }
};
