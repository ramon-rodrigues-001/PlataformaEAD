import styles from "./VitrineCursos.module.scss"
import { useEffect, useState } from "react";

function VitrineCursos() {
  const [trilhas, setTrilhas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [usuario, setUsuario] = useState([])


  // PEGAR AS TRILHAS
  const fetchTrilhas = async () => {
    const response = await fetch('http://localhost:4000/api/gettrilhas');
    if (response.ok) return await response.json();
    throw new Error("Erro ao buscar trilhas");
  };

  // PEGAR OS CURSOS
  const fetchCursos = async () => {
    const response = await fetch('http://localhost:4000/api/getcursos');
    if (response.ok) return await response.json();
    throw new Error("Erro ao buscar cursos");
  };

  // PEGAR O USUARIO LOGADO
  const fetchUsuario = async () => {
    const userID = localStorage.getItem('userID');
    const response = await fetch(`http://localhost:4000/api/getUser/${userID}`);
    if (response.ok) return await response.json();
    throw new Error("Erro ao buscar usuário");
  };


  // SISTEMA PARA CONTROLHAR AS (FETCH())
  useEffect(() => {
    Promise.all([fetchTrilhas(), fetchCursos(), fetchUsuario()])
      .then(([trilhasData, cursosData, usuarioData]) => {
        setTrilhas(trilhasData);
        setCursos(cursosData);
        setUsuario(usuarioData);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error))
      .finally(() => setLoading(false));
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

                          {usuario.listaCursos ? (
                            usuario.listaCursos.includes(trilha._id) ? 
                              (
                                <span className={styles.simboloLiberado}>
                                  <i class="bi bi-unlock"></i>
                                  Liberado
                                </span>
                              ) : 
                              (
                                <span className={styles.simboloPrivado}>
                                  <i class="bi bi-lock"></i> 
                                  Privado
                                </span>
                              )
                            
                          ): (
                            <span className={styles.simboloPrivado}>
                              <i class="bi bi-lock"></i> 
                              Privado
                            </span>
                          )}
                          
                        

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