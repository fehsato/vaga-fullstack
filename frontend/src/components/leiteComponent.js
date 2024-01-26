
import React, { useEffect, useState } from 'react';
import { getLeiteById, getAllLeites } from '../services/leiteService';

//Definindo o Componente Leite
const LeiteComponent = () => {

  //Usa o useState para criar um estado e uma função para atualizar esse estado. Ele inicia como null
  const [leite, setLeite] = useState(null);

  useEffect(() => {
    //Cria uma função assicrona para tentar obter os dados, e se conseguir, atualiza os dados na tela
    const fetchData = async () => {
      try {
        const leiteData = await getLeiteById(1);
        setLeite(leiteData);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  //Renderiza o item. Se o item não for null, ele renderiza em uma div com informações como id e nome
  return (
    <div>
      {leite && (
        <div>
          <h2>Leite {leite.id}</h2>
          <p>Nome: {leite.nome}</p>
        </div>
      )}
    </div>
  );
};

//Exporta para que o componente possa ser usado em outros lugares da aplicação
export default LeiteComponent;
