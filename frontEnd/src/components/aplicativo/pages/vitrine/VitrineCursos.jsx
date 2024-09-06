import styles from "./VitrineCursos.module.scss"

function VitrineCursos() {
  return (
    <section className={styles.SectionVitrineCursos}>
      <div className={styles.navbar}>
          <div className={styles.nav_item}>
            <i class="bi bi-plus-square-dotted"></i>
            Seus Cursos
          </div>

          <div className={styles.center_button}>
            <a href='#'>
              <img src="https://images.freeimages.com/fic/images/icons/2711/free_icons_for_windows8_metro/512/play.png" alt="" />
            </a>  
          </div>

          <div className={styles.nav_item} id={styles.direita}>
            <i class="bi bi-plus-lg"></i>
            Descobrir
          </div>
      </div>

      <div className={styles.containerDeCardsDeCursos}>
        <div className={styles.cardDeCurso}>
          <img src="https://i.pinimg.com/originals/e4/01/27/e40127c71b4a07bb4eb02cd62f711dbb.jpg" alt="" />

          <div className={styles.textCard}>
              <h2>JAVASCRIPT</h2>
              <p>[ Fundamentos I ]</p>
              <p className={styles.discritionCurso}>"Curioso você. Divirta-se com este curso grátis de JavaScript. Conheça a plataforma e os professores."</p>
          </div>
        </div>
        <div className={styles.cardDeCurso}>
          <img src="https://i.pinimg.com/originals/ab/5d/55/ab5d5545f0f0ae703a77c023074edc34.jpg" alt="" />
          
          <div className={styles.textCard}>
              <h2>JAVASCRIPT</h2>
              <p>[ Fundamentos II ]</p>
              <p className={styles.discritionCurso}>"Este não é para os fracos; espero que tenha praticado com o módulo anterior."</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VitrineCursos