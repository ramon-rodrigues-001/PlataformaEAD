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
                  <iframe src="https://www.youtube.com/embed/zHKHMmEG9vE?si=n_KjfvRmdZsOpBaZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen className={styles.img_background}></iframe>
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
                  <p className={styles.tipoDePublication}>Mais Cursos</p>
                  Vazio
                </div>
              </div>

            </div>
        </div>
    </div>
  )
}

export default Discontrair
