// import { Link } from "react-router-dom"
import styles from "./Header.module.scss"
import { useState } from "react"
import Menu from "./menu/Menu"

function Header(props) {
  const [menuActive, setMenuActive] = useState(false)
  const {mudarTema, tema, ocultarAside} = props

  const setMenu = () => {
    setMenuActive(!menuActive)
  }

  return (
    <header id={tema === 'Escuro' ? styles.temaDark : null}>
        <div className={styles.div_logo_icone}>
          <i className="bi bi-arrows" id={styles.iconeAside} onClick={ocultarAside}></i>
          {tema === 'Escuro' ? (
            <img src="/logoVortexBranco.png" alt="logoVortex"  className={styles.logoVortex}/>
          ): (
            <img src="/logoVortex.png" alt="logoVortex"  className={styles.logoVortex}/>
          )}
        </div>

        <ul>
          <li id={styles.discontrair}>
            <a href="/"><i class="bi bi-cup-hot-fill"></i></a>
          </li>
          <li id={styles.batePapo}>
            <a href="/assistir"><i class="bi bi-collection-play-fill"></i></a>
          </li>
          <li id={styles.noticias}>
            <a href="/noticias"><i class="bi bi-newspaper"></i></a>
          </li>
          
          <li id={styles.mudarTema} onClick={mudarTema}>
            {tema == 'Escuro' ? (
              <i class="bi bi-moon-stars-fill"></i>
            ): (
              <i class="bi bi-brightness-high-fill"></i>
            )}
          </li>
        </ul>

        <div>
          <ul>
            <li id={styles.bell}>
              <i class="bi bi-bell-fill"></i>
            </li>
            <li id={styles.perfil}>
              <a href="/perfil"><i class="bi bi-person-fill"></i></a>
            </li>
          </ul>
        </div>


        <div className={styles.containerMenu}>
          <button className={styles.btnOpenMenu} onClick={setMenu}>
            <i class="bi bi-three-dots"></i>
          </button>

          {menuActive && (
            < Menu setMenu={setMenu} mudarTema={mudarTema} />
          )}
        </div>
    </header>
  )
}

export default Header
