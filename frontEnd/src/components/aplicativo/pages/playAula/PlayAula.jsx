import styles from "./PlayAula.module.scss"
import dataCurse from "../../../../../dadosJson/cursos.json"

function PlayAula(props) {
  const tema = props.tema
  console.log(tema)


    const escolherAula = (event) => {
      const escolha = event.currentTarget.dataset.nomeAula
      console.log(escolha)
    }


  return (
    <div className={styles.sectionPlayAula} id={tema === 'Escuro' ? styles.temaDark : null}>
        <div className={styles.background}>
          
            {/* Welcome */}
            <div className={styles.welcome}>
              <h2>Você esta estudando :  {dataCurse.nomeCurso}</h2> 
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

                  {dataCurse.cursos[0].aulas.map((element, index) => (
                    <div className={styles.cardProximasAulas}
                    data-nome-aula={element.nomeAula} onClick={escolherAula}>
                      {element.capaAula ? (
                        <img src={element.capaAula} alt="Capa da aula" className={styles.imgProximaAula}/>
                      ) : (
                        <img src="/iconeDeCursoIA2.webp" alt="Capa da aula" className={styles.imgProximaAula}/>
                      )}
                      
                      <div>
                        <p>{element.nomeAula}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
        </div>
    </div>
  )
}

export default PlayAula
