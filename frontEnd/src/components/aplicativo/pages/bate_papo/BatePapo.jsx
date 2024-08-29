import styles from "./BatePapo.module.scss"

function BatePapo() {
  return (
    <section className={styles.SectionBatePapo}>
      <div className={styles.navbar}>
          <div className={styles.nav_item}>
            <i class="bi bi-plus-square-dotted"></i>
            Criar Gropo
          </div>

          <div className={styles.center_button}>
            <a href='#'>Amigos</a>  
          </div>

          <div className={styles.nav_item} id={styles.direita}>
            <i class="bi bi-plus-lg"></i>
            Descobrir
          </div>
      </div>

      <div className={styles.containerDeCardsDeGrupos}>
        <div className={styles.cardDeGrupos}>
          <img src="https://i.pinimg.com/originals/e4/01/27/e40127c71b4a07bb4eb02cd62f711dbb.jpg" alt="" />

          <div className={styles.textCard}>
              <h2>JAVASCRIPT</h2>
              <p>[ Fundamentos I ]</p>
          </div>
        </div>
        <div className={styles.cardDeGrupos}>
          <img src="https://i.pinimg.com/originals/ab/5d/55/ab5d5545f0f0ae703a77c023074edc34.jpg" alt="" />
          
          <div className={styles.textCard}>
              <h2>JAVASCRIPT</h2>
              <p>[ Fundamentos II ]</p>
          </div>
        </div>
        <div className={styles.cardDeGrupos}>Vazio</div>
        <div className={styles.cardDeGrupos}>Vazio</div>
      </div>
    </section>
  )
}

export default BatePapo