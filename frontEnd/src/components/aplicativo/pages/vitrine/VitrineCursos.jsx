import styles from "./VitrineCursos.module.scss"
import { useEffect, useState } from "react";

function VitrineCursos() {
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
          <div className={styles.containerDeCardsDeCursos}>
                {/* <p>JavaScript Avançado</p> */}
               {cursos.length > 0 ? (
                  cursos.map((curso) => (
                    <a href={`assistir/${curso._id}`}>
                      <div className={styles.cardDeCurso}>
                        <img src={curso.capaCurso} alt="Capa do curso" />

                        <div className={styles.textCard}>
                            <h2>{curso.nomeCurso}</h2>
                            <p>[ {curso.detalheCurso} ]</p>
                            <p className={styles.discritionCurso}>"{curso.descritionCurso}"</p>
                        </div>
                      </div>
                    </a>
                  ))) : (
                      <p>Nenhum curso encontrado.</p>
                  )
                } 
          </div>
          
        )
      }


      <br />


      <h3 className={styles.titleGrupoCurso}>FUNDAMENTOS (FULL-STACK)</h3>
      <div className={styles.containerDeCardsDeCursos}>
        <div className={styles.cardDeCurso}>
          <span className={styles.simboloPrivado}>
            <i class="bi bi-lock"></i> 
            Privado
          </span>

          <img src="https://i.pinimg.com/originals/ab/5d/55/ab5d5545f0f0ae703a77c023074edc34.jpg" alt="" />
          
          <div className={styles.textCard}>
              <h2>JAVASCRIPT AVANÇADO</h2>
              <p>[ Fundamentos II ]</p>
              <p className={styles.discritionCurso}>"Este não é para os fracos; espero que tenha praticado com o módulo anterior."</p>
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

        <div className={styles.cardDeCurso}>
          <span className={styles.simboloPrivado}>
            <i class="bi bi-unlock"></i> 
            Liberado
          </span>

          <img src="https://w0.peakpx.com/wallpaper/469/148/HD-wallpaper-fullstack-development-nodejs-programmer-technology-thumbnail.jpg" alt="" />

          <div className={styles.textCard}>
              <h2>JAVASCRIPT DOM</h2>
              <p>[ Fundamentos III ]</p>
              <p className={styles.discritionCurso}>"Curioso você. Divirta-se com este curso grátis de JavaScript. Conheça a plataforma e os professores."</p>
              <p>
                12 aulas <br />
                1h 45 min
              </p>
              <p>
                <i class="bi bi-unlock"></i>  
                Liberado
              </p>
          </div>
        </div>
      </div>








    </section>
  )
}

export default VitrineCursos