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
              <i class="bi bi-people-fill"></i>
            Chat Amigo
            </p>
            
            <p className={styles.optionsAside}><i class="bi bi-chat-square-dots-fill"></i> Ramon Rodrigues</p>
          </div>
        </div>







        <div className={styles.mainComunidade}>
          <div className={styles.headUserOnline}>Feed ( Global )</div>
          <div className={styles.containerChat}>
            EM BREVE!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Noticias
