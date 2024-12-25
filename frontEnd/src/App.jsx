import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './styles/App.module.scss'

import Header from './components/aplicativo/common/header/Header'
import Aside from './components/aplicativo/common/aside/Aside'
import PlayAula from './components/aplicativo/pages/playAula/PlayAula'
import VitrineCursos from './components/aplicativo/pages/vitrine/VitrineCursos';
import Noticias from './components/aplicativo/pages/noticias/Noticias';
import Perfil from './components/aplicativo/pages/perfil/Perfil';
import Login from './components/aplicativo/pages/perfil/login/Login';
import Register from './components/aplicativo/pages/perfil/register/Register';
import PageAnotacao from './components/aplicativo/pages/pageAnotacao/pageAnotacao';
import PageVenda from './components/aplicativo/pages/pageVenda/pageVenda';


export default function App() {
    let temaSalvo = localStorage.getItem('temaAtual');
    const [tema, setTema] = useState(temaSalvo)


    // SISTEMA DE MUDAR TEMA ESCURO/CLARO
    const mudarTema = () => {
        temaSalvo === 'Escuro' 
            ? localStorage.setItem('temaAtual', 'Claro') 
            : localStorage.setItem('temaAtual', 'Escuro')
        temaSalvo = localStorage.getItem('temaAtual');
        setTema(temaSalvo)
    }

    useEffect(() => {
        if (temaSalvo === null) {
            localStorage.setItem('temaAtual', 'Escuro');
            setTema('Escuro');
        }
    }, [])

    // Ocultar ou exibir aside
    const ocultarAside = () => {
        const asideElement = document.querySelector(`.${styles.containerAsideDaEsquerda}`);

        if ( asideElement.style.display === 'none') {
            asideElement.style.display = 'block'
        }
        else {
            asideElement.style.display = 'none'
        }
    }

    return (
        <>
        <div className={styles.container} id={tema === 'Escuro' ? styles.containerDark : null}>
                < Header mudarTema={mudarTema} tema={tema} ocultarAside={ocultarAside}/>

                <main className={styles.main} >
                    {
                        !window.location.href.includes("noticias") && 
                        !window.location.href.includes("login") && 
                        !window.location.href.includes("register") && 
                        (
                            <div className={styles.containerAsideDaEsquerda}>
                                < Aside /> 
                            </div>
                        )
                    }
                    

                    <div className={styles.containerVitrineDaDireita}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={
                                    < VitrineCursos />
                                }/>
                                
                                <Route path="/assistir/:id?" element={
                                    < PlayAula tema={tema}/>
                                }/>

                                <Route path="/noticias" element={
                                    < Noticias tema={tema} />
                                }/>

                                <Route path="/pagevenda/:id?" element={
                                    <PageVenda/>
                                }/>

                                <Route path="/perfil" element={
                                    < Perfil />
                                }/>

                                <Route path="/perfil/login" element={
                                    < Login tema={tema} />
                                } />

                                <Route path="/perfil/register" element={
                                    < Register tema={tema} />
                                } />


                                <Route path="/pageanotacao/:idAnotacao" element={
                                    < PageAnotacao />
                                } />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </main>


            </div>
        
    </>
    )
}
