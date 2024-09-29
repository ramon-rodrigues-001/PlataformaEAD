import { useParams } from "react-router-dom";
import styles from "./PlayAula.module.scss"
import { useEffect, useState } from "react";

function PlayAula(props) {
  const tema = props.tema
  const [loading, setLoading] = useState(true);
  const [curso, setCurso] = useState([])
  const [aula, setAula] = useState('')
  const { id } = useParams();



  // pegar a aulas que ecolheu assistir
  const escolherAula = async (event) => {
    const aulaid = event.currentTarget.dataset.idAula

    try {
      const response = await fetch(`http://localhost:4000/api/getaula/${id}/${aulaid}`, {
        method: 'GET',
      })
      if (response.status !== '404') {
        const data = await response.json();
        setAula(data)
      } else { 
        console.error('Erro ao buscar aula:')
      }
    } catch (erro) {
      console.error('Erro no fetch:', erro);
    }
  }



  // Pegar o curso que foi escolhido
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
  


  // retornar o iframe com a url auterado dinamicamente
  const VimeoPlayer = ({ videoId }) => {
    // Constrói a URL do vídeo de forma dinâmica
    const vimeoUrl = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`;
  
    return (
      <iframe
        src={vimeoUrl}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        title="Vimeo Video"
        className={styles.videoAula}
      ></iframe>
    );
  };


  if (loading) return <div>Carregando...</div>; // Esperar o codigo compilar
  return (
    <div className={styles.sectionPlayAula} id={tema === 'Escuro' ? styles.temaDark : null}>
        <div className={styles.background}>
          
            {/* Welcome */}
            <div className={styles.welcome}>
              <h2>{curso.nomeCurso}</h2> 
            </div><br />


            {/* Container de assistir Aula */}
            <div className={styles.container_De_Aula}>
              <div>
                <div className={styles.aula}>
                  <p className={styles.tipoDePublication}>{aula.lembrete}</p>
                  <div className={styles.perfilDoProfessor}>
                    <div className={styles.imgDoProfessor}></div>
                    <div>
                      <p className={styles.nomeDoProfessor}>Professor:</p>
                      <p className={styles.nomeDoProfessor}>Ramon Rodrigues</p>
                    </div>
                  </div>
                  <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                    <VimeoPlayer videoId={aula.linkAula} />
                  </div>
                </div>



                {/* Discrição */}
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
                      data-id-aula={aula._id} onClick={escolherAula}>
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
