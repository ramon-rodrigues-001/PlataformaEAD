import React, { useState, useEffect } from 'react';
import './Curso.css';

function Cursos() {
  const [cursos, setCursos] = useState([]); // Estado para armazenar os cursos
  const [loading, setLoading] = useState(true); // Estado para exibir um indicador de carregamento

  // Função para buscar os cursos da API
  const fetchCursos = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/getcursos', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setCursos(data); // Armazena os cursos no state
        setLoading(false); // Para de exibir o indicador de carregamento
      } else {
        console.error('Erro ao buscar cursos:', response.statusText);
      }
    } catch (err) {
      console.error('Erro no fetch:', err);
    }
  };

  // Usa useEffect para buscar os cursos assim que o componente for montado
  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <div className="container_cards">
      {loading ? ( // Exibe "Carregando..." enquanto os dados não são carregados
        <p>Carregando...</p>
      ) : (
        <>
          {/* Renderiza os cursos obtidos do back-end */}
          {cursos.length > 0 ? (
            cursos.map((curso) => (
              <div key={curso._id} className="curse">
                <h3>{curso.nomeCurso}</h3>
                <p>{curso.nomeProfessor}</p>
                <img src={curso.capaCurso} alt={curso.nomeCurso} className="curso_img" />
              </div>
            ))
          ) : (
            <p>Nenhum curso encontrado.</p>
          )}
        </>
      )}

      {/* Botão para adicionar um novo curso */}
      <a href="curses/newCurse">
        <div className="curse add-curse">
          +
        </div>
      </a>
    </div>
  );
}

export default Cursos;
