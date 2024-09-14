import { useParams } from "react-router-dom";
import "./Aulas.css"
import { useEffect, useState } from "react";

function Aulas() {
    const { id } = useParams();
    const [aulas, setAulas] = useState([]);
    const [loading, setLoading] = useState(true); 
  
    // Função para buscar as aulas da API
    const fetchAulas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/getAulas/${id}`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setAulas(data); // Armazena os cursos no state
          setLoading(false); // Para de exibir o indicador de carregamento
        } else {
          console.error('Erro ao buscar Aulas:', response.statusText);
        }
      } catch (err) {
        console.error('Erro no fetch:', err);
      }
    };
  
    // Usa useEffect para buscar as Aulas assim que o componente for montado
    useEffect(() => {
      fetchAulas();
    }, []);
  
    return (
      <div className="container_cards">
        {loading ? ( // Exibe "Carregando..." enquanto os dados não são carregados
          <p>Carregando...</p>
        ) : (
          <>
            <div id="container_aulas">
                <a href="#">
                    <div className="aulas" id="criarCurso">
                        Criar aula
                    </div>
                </a>
                
                <div className="aulas">
                    Criar aula
                </div>
            </div>
             
            {/* Renderiza os cursos obtidos do back-end */}
            {/* {aulas.length > 0 ? (
              aulas.map((aula) => (
                <div>
                    <p>{aula.}</p>
                </div>
              ))
            ) : (
              <p>Nenhum curso encontrado.</p>
            )} */}
          </>
        )}

      </div>
    );
}

export default Aulas