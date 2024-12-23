import styles from "./Noticias.module.scss"

function Noticias(props) {
  const tema = props.tema

  return (
    <div className={styles.divNoticias} id={tema === 'Escuro' ? styles.temaDark : null}>
      <div className={styles.container}>
        <div className={styles.asideComunidade}>
          <h2>Comunidade</h2>

          <div>
            <p className={styles.subTitleAside}>
              <i class="bi bi-collection-fill"></i> Feed
            </p>
            <p className={styles.optionsAside}>
              <i class="bi bi-collection"></i> Feed ( Global )
            </p>
            <p className={styles.optionsAside}>
              <i class="bi bi-collection"></i> Feed ( Adiministrado )
            </p>
          </div>

          <div>
            <p className={styles.subTitleAside}>
              <i class="bi bi-people-fill"></i> Chat Amigo
            </p>
            
            <p className={styles.optionsAside}><i class="bi bi-chat-square-dots-fill"></i> Adiministrador</p>
          </div>
        </div>







        <div className={styles.mainComunidade}>
          <div className={styles.headUserOnline}>
            <p>Feed ( Global )</p>

            <button className={styles.newPublication}>Nova publicação</button>
          </div>


          <div className={styles.containerChat}>
            <div className={styles.publicationFeed}>
              <p className={styles.nomePublicador}>Ramon Rodrigues</p>
              <h3>LoRa tecnologia de comunicação a radio</h3>
              <p className={styles.nomePublicador}>10 pontos . 1 comentario . 1 mes atras</p>
            </div>

            <div className={styles.publicationFeed}>
              <p className={styles.nomePublicador}>Professor Arthur</p>
              <h3>[HELP] Gateway de pagamento que seja possivel enviar metadata</h3>
              <p className={styles.nomePublicador}>1 pontos . 0 comentario . 1 mes atras</p>
            </div>

            <div className={styles.publicationFeed}>
              <p className={styles.nomePublicador}>Zaqueu655</p>
              <h3>📝 Documentação de APIs com Scalar!</h3>
              <p className={styles.nomePublicador}>1 pontos . 0 comentario . 1 mes atras</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Noticias
