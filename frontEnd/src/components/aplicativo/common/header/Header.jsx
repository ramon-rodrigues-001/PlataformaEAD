// import { Link } from "react-router-dom"
import styles from "./Header.module.scss"
import { useEffect, useState } from "react"
import Menu from "./menu/Menu"

function Header(props) {
  const [menuActive, setMenuActive] = useState(false)
  const {mudarTema, tema, ocultarAside} = props
  const [logado, setLogado] = useState(false)
  const [escolheuCurso, setEscolheuCurso] = useState(false)


  // Testando de esta logado para desbloquear novas paginas
  // Tambem verifica se já escolheu um curso pra assistir
  useEffect(() => {
    const verificarLogin = () => {
      const estadoDoLogin = localStorage.getItem('login');
      setLogado(estadoDoLogin === 'Logado');
    };
  
    const verificarUltimoCurso = () => {
      const idUltimoCurso = localStorage.getItem('idUltimoCurso');
      setEscolheuCurso(!!idUltimoCurso);
    };
  
    verificarLogin();
    verificarUltimoCurso();
  }, []);
  





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
          {/* Verificar de o usuario esta logado para liberar as paginas */}
          {logado ? (
            <>
            <li id={styles.discontrair}> 
              <a href="/" ><i class="bi bi-cup-hot-fill"></i></a>
            </li>

            {/* Verificar se o usuario já escolheu um curso pra assistir */}
            {escolheuCurso ? (
              <li id={styles.batePapo}>
              <a href="/assistir"><i class="bi bi-collection-play-fill"></i></a>
            </li>
            ): (
              <li id={styles.batePapo}>
                <a href="/assistir" style={{ color: "gray", pointerEvents: "none" }}><i class="bi bi-collection-play-fill"></i></a>
              </li>
            )}
            
            <li id={styles.noticias}>
              <a href="/noticias"><i class="bi bi-chat-dots-fill"></i></a>
            </li>
            </>
          )
          : 
          (
            <>
            <li id={styles.discontrair}> 
              <a href="/" style={{ color: "gray", pointerEvents: "none" }}><i class="bi bi-cup-hot-fill"></i></a>
            </li>

            <li id={styles.batePapo}>
              <a href="/assistir" style={{ color: "gray", pointerEvents: "none" }}><i class="bi bi-collection-play-fill"></i></a>
            </li>
            
            <li id={styles.noticias}>
              <a href="/noticias" style={{ color: "gray", pointerEvents: "none" }}><i class="bi bi-chat-dots-fill"></i></a>
            </li>
            </>
            
          )}
          
          
          
          
          
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
