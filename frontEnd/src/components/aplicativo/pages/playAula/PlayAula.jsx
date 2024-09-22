import { useParams } from "react-router-dom";
import styles from "./PlayAula.module.scss"
import { useEffect, useState } from "react";

function PlayAula(props) {
  const tema = props.tema
  const [loading, setLoading] = useState(true);
  const [curso, setCurso] = useState([])
  const { id } = useParams();

  const escolherAula = (event) => {
    const escolha = event.currentTarget.dataset.nomeAula
    console.log(escolha)
  }

  const fetchCurso = async () => {
    setLoading(false)

    try {
      const response = await fetch(`http://localhost:4000/api/getcurso/${id}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setCurso(data)
      } else { 
        console.error('Erro ao buscar cursos:', response.statusText);
      }
    } catch (err) {
      console.error('Erro no fetch:', err);
    }
  };

  // Usa useEffect para buscar os cursos assim que o componente for montado
  useEffect(() => {
    fetchCurso();
  }, []);
  
  if (loading) return <div>Carregando...</div>;
  return (
    <div className={styles.sectionPlayAula} id={tema === 'Escuro' ? styles.temaDark : null}>
        <div className={styles.background}>
          
            {/* Welcome */}
            <div className={styles.welcome}>
              <h2>Você esta estudando :  {curso.nomeCurso}</h2> 
            </div><br />




            {/* Container de posts */}
            <div className={styles.container_De_Aula}>
              <div>
                <div className={styles.aula}>
                  <p className={styles.tipoDePublication}>Especial</p>
                  <div className={styles.perfilDoProfessor}>
                    <div className={styles.imgDoProfessor}></div>
                    <div>
                      <p className={styles.nomeDoProfessor}>Professor:</p>
                      <p className={styles.nomeDoProfessor}>Ramon Rodrigues</p>
                    </div>
                  </div>
                  <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                    <iframe
                      src="https://player.vimeo.com/video/1004536548?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                      title="Teste" className={styles.videoAula}
                    ></iframe>
                  </div>
                </div>


                <div className={styles.aula}>
                  <div className={styles.perfilDoPublicador}>
                    <div className={styles.imgDePerfil}></div>
                    <div>
                      <p className={styles.nomeDoUsuario}>Ramon Rodrigues</p>
                      <p className={styles.dataDePublication}>10/01/22</p>
                    </div>
                  </div>
                  <div className={styles.descrition}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam tenetur temporibus expedita in illo beatae dignissimos nulla adipisci fugiat, praesentium ipsa, 
                  </div>
                  <img src="/logo-2.png" alt="background-home" className={styles.img_background}/>
                  <div className={styles.curtidas}>
                    <span><i class="bi bi-hand-thumbs-up"></i> 16</span>
                    <span><i class="bi bi-hand-thumbs-down"></i> 3</span>
                  </div>
                </div>
              </div>




              {/* proximas aulas */}
              
              <div className={styles.container_proxima_aula}>
                <div className={styles.proximasAulas}>
                  <p className={styles.tipoDePublication}>Próximos</p>

                  


                  {curso && curso.aulas && curso.aulas.length > 0 ? (
                    curso.aulas.map((aula) => (
                      <div className={styles.cardProximasAulas}
                      data-nome-aula={aula.nomeAula} onClick={escolherAula}>
                        {aula.capaAula ? (
                          <img src={aula.capaAula} alt="Capa da aula" className={styles.imgProximaAula}/>
                        ) : (
                          <img src="/iconeDeCursoIA2.webp" alt="Capa da aula" className={styles.imgProximaAula}/>
                        )}

                        <div>
                          <p>{aula.nameAula}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Nenhuma aula disponível</p> // Exibe mensagem se não houver aulas
                  )}



                </div>
              </div>

            </div>
        </div>
    </div>
  )
}

export default PlayAula
