import styles from "./Discontrair.module.scss"

function Discontrair(props) {
  const tema = props.tema
  console.log(tema)

  return (
    <div className={styles.discontrair} id={tema === 'Escuro' ? styles.temaDark : null}>
        <div className={styles.background}>
          
            {/* Welcome */}
            <div className={styles.welcome}>
              <h2>Welcome! à nossa Plataforma de Comunidade!, Capelinha</h2> 
            </div><br />


            {/* Container de posts */}
            <div className={styles.container_De_Posts}>
              <div>
                <div className={styles.post}>
                  <p className={styles.tipoDePublication}>ADM</p>
                  <div className={styles.perfilDoPublicador}>
                    <div className={styles.imgDePerfil}></div>
                    <div>
                      <p className={styles.nomeDoUsuario}>Professor:</p>
                      <p className={styles.dataDePublication}>Ramon Rodrigues</p>
                    </div>
                  </div>
                  {/* <img src="/logo-1.png" alt="background-home" className={styles.img_background}/> */}
                  <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                    <iframe
                      src="https://player.vimeo.com/video/1004536548?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                      title="Teste" className={styles.img_background}
                    ></iframe>
                  </div>
                  
                </div>

                <div className={styles.post}>
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
                  {/* <div className={styles.curtidas}>
                    <span><i class="bi bi-hand-thumbs-up-fill"></i> 16</span>
                    <span><i class="bi bi-hand-thumbs-down-fill"></i> 3</span>
                  </div> */}
                  <div className={styles.curtidas}>
                    <span><i class="bi bi-hand-thumbs-up"></i> 16</span>
                    <span><i class="bi bi-hand-thumbs-down"></i> 3</span>
                  </div>
                </div>
              </div>

              {/* Anucios */}
              <div className={styles.container_anuncios}>
                <div className={styles.anuncios}>
                  <p className={styles.tipoDePublication}>Próximos</p>

                  <div className={styles.cardProximasAulas}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEScTsqIPluvXxy3x5e5V9Nv-tqsctPtWqFw&s" alt="Capa da aula" className={styles.imgProximaAula}/>
                    <div>
                      <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>

                  <div className={styles.cardProximasAulas}>
                    <img src="https://marketplace.canva.com/EAE6hxWHL2Y/1/0/1600w/canva-thumbnail-vlog-viagem-duas-fotos-texto-preto-e-branco-com-sombra---miniatura-do-youtube-cBO8eDS70S8.jpg" alt="Capa da aula" className={styles.imgProximaAula}/>
                    <div>
                      <p>Lorem ipsum dolor sit amet ipsum dolor sit amet.</p>
                    </div>
                  </div>

                  <div className={styles.cardProximasAulas}>
                    <img src="https://i.ytimg.com/vi/uihCdanYKps/maxresdefault.jpg" alt="Capa da aula" className={styles.imgProximaAula}/>
                    <div>
                      <p>Lorem ipsum dolor sit amet ipsum dolor.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
        </div>
    </div>
  )
}

export default Discontrair
