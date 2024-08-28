import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./login/Login"
import Register from "./register/Register"
import styles from "./Perfil.module.scss"

function Perfil() {
    const situacao_de_localStorage = localStorage.getItem('login')
    const [situacao, setSituacao] = useState(situacao_de_localStorage)

    setTimeout(function() {
        if (situacao == null) {
            localStorage.setItem('login', 'Deslogado')
            const situacao_de_localStorage = localStorage.getItem('login')
            setSituacao(situacao_de_localStorage)
        }
    }, 0);


    return (
        situacao === 'Deslogado' ? (
            <Navigate to="login/" />
        ) : (
            <section className={styles.container_perfil}>
                <div className={styles.profile_container}>
                    <div className={styles.profile_header}>
                        <img src='https://cdn.areademembros.com/cache/8hWmgaIKnKiHTmZ8bqU9HdxuA636C00D5WoZUmIQ-200x200-resized.jpg' alt='ss' className={styles.profile_avatar} />
                        <h1 className={styles.profile_name}>Ramon Rodrigues</h1>
                    </div>
                    <div className={styles.profile_body}>
                        <p className={styles.profile_email}>lramonrodrihgues.@gmail.com</p>
                        <p className={styles.profile_telefone}>(33) 99263-2273</p>
                        <p className={styles.profile_bio}>Lorem ipsum, dolor sit amet.</p>
                    </div>
                </div>

                <div className={styles.cntainer_buttons_perfil}>
                    <button>Alterar Dados</button>
                    <button>Sair Desta Conta</button>
                </div>
            </section>
        )
    )
}

export default Perfil
