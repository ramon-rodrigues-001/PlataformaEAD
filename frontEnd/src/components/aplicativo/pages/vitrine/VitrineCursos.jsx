import styles from "./VitrineCursos.module.scss"
import { useEffect, useState } from "react";

function VitrineCursos() {
  const [trilhas, setTrilhas] = useState([]);
  const [cursos, setCursos] = useState([]); // Estado para armazenar os cursos
  const [loading, setLoading] = useState(true); // Estado para exibir um indicador de carregamento



  const fetchTrilhas = async () => {
    try {
      // MUDAR URL ABAIXO
      const response = await fetch('http://localhost:4000/api/gettrilhas', {
        method: 'GET'
      })
      if (response.ok) {
        const data = await response.json();
        setTrilhas(data); // Armazena os cursos no state
        console.log(data) 
      } else {
        console.error('Erro ao buscar cursos:', response.statusText);
      }
    } catch(erro) {
      console.log('Erro ao buscar por trilhas: ' + erro)
    }
  }


  // Função para buscar os cursos da API
  const fetchCursos = async () => {
    try {
      // MUDAR URL ABAIXO
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
    fetchTrilhas() 
  }, []);





  return (
    <section className={styles.SectionVitrineCursos}>
      <div className={styles.navbar}>
          <div className={styles.nav_item}>
            {/* <i class="bi bi-plus-square-dotted"></i> */}
            Todos Cursos
          </div>

          <div className={styles.center_button}>
            <a href='/assistir'>
              <img src="https://images.freeimages.com/fic/images/icons/2711/free_icons_for_windows8_metro/512/play.png" alt="" />
            </a>  
          </div>

          <div className={styles.nav_item} id={styles.direita}>
            {/* <i class="bi bi-plus-lg"></i> */}
            Meus Cursos
          </div>
      </div>




      {loading ? ( // Exibe "Carregando..." enquanto os dados não são carregados
          <p>Carregando...</p>
        ) : (
          trilhas.length > 0 ? (
            trilhas.map((trilha) => {
              const cursosDaTrilha = cursos.filter((curso) => curso.idTrilhaPai === trilha._id);
              const totalAulas = cursosDaTrilha.reduce((acc, curso) => acc + curso.aulas.length, 0);

              

              return (
                <>
                <h3 className={styles.titleGrupoCurso}>{trilha.nomeTrilha}</h3>
                <p className={styles.detalhesGrupoCurso}>
                  {trilha.cursosIDs.length} Modulos 
                  - {totalAulas} aulas
                </p>

                <div className={styles.containerDeCardsDeCursos}>
                {cursos.length > 0 ? (
                    cursosDaTrilha.map((curso) => (
                      
                      <a href={`assistir/${curso._id}`}>
                        <div className={styles.cardDeCurso}>
                          <span className={styles.simboloPrivado}>
                            <i class="bi bi-lock"></i> 
                            Privado
                          </span>

                          <img src={curso.capaCurso} alt="Capa do curso" />

                          <div className={styles.textCard}>
                              <h2>{curso.nomeCurso}</h2>
                              <p>[ {curso.detalheCurso} ]</p>
                              <p className={styles.discritionCurso}>"{curso.descritionCurso}"</p>
                              <p>
                                23 aulas <br />
                                4h 22 min
                              </p>
                              <p>
                                <i class="bi bi-lock"></i>  
                                Privado
                              </p>
                          </div>
                        </div>
                      </a>
                    ))) : (
                        <p>Nenhum curso encontrado.</p>
                    )
                  } 
                </div>
                </>
              )
              
            })
          ) : (
            <div>Nenhuma trilha de estudo encontrada.</div>
          )
        )
      }
    </section>
  )
}

export default VitrineCursos