import styles from "./Noticias.module.scss"

function Noticias(props) {
  const tema = props.tema

  return (
    <div className={styles.divNoticias} id={tema === 'Escuro' ? styles.temaDark : null}>
      <h1>Noticias</h1>

      <div className={styles.containerDeNoticias}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkiENcfzewm0pudNUc6Dza8a2sXr3YXzrAMQ&s" alt="em contrução" />
        <div>
          <h3>Em breve!</h3>
          <p>Esta página trará as últimas novidades educacionais e curiosidades do mundo, mantendo você sempre bem informado.</p>
        </div>
      </div>
    </div>
  )
}

export default Noticias
