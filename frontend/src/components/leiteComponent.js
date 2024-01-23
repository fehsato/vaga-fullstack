
import React, { useEffect, useState } from 'react';
import { getLeiteById, getAllLeites } from '../services/leiteService';

const LeiteComponent = () => {
  const [leite, setLeite] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leiteData = await getLeiteById(1);
        setLeite(leiteData);
      } catch (error) {
        // Trate o erro, se necessário
      }
    };

    fetchData();
  }, []);

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

export default LeiteComponent;
