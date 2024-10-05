import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./login/Login"
import Register from "./register/Register"
import styles from "./Perfil.module.scss"

function Perfil() {
    const situacao_de_localStorage = localStorage.getItem('login')
    const [situacao, setSituacao] = useState(situacao_de_localStorage)
    const [dadosDoUsuario, setDadosDoUsuario] = useState(null)


    const sairDaCorta = () => {
        if (confirm('Deseja sair desta conta? ')) {
            localStorage.setItem('login', 'Deslogado');
            localStorage.setItem('userID', '');
    
            //   Redirecionando para a rota de perfil
            let currentURL = window.location.href;
            let newURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
            window.location.href = newURL;
        }
    }


    useEffect(() => {
        async function fetchUserData() {
            const userID = localStorage.getItem('userID');
        
            if (situacao == null) {
                localStorage.setItem('login', 'Deslogado');
                const situacao_de_localStorage = localStorage.getItem('login');
                setSituacao(situacao_de_localStorage);
            }
        
            try {
                const response = await fetch(`http://localhost:4000/getUserDate`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userID })
                });
        
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.status);
                }
        
                const data = await response.json();
                setDadosDoUsuario(data.usuario);
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }
        }

        fetchUserData(); 
    }, [situacao]);


    if (!dadosDoUsuario && situacao !== 'Deslogado') {
        return <p>Carregando...</p>;
    }
    

    return (
        situacao === 'Deslogado' ? (
            < Navigate to="login/" />
        ) : (

            
            <section className={styles.container_perfil}>
                <div className={styles.profile_container}>
                    <div className={styles.profile_header}>
                        <img src='https://cdn.areademembros.com/cache/8hWmgaIKnKiHTmZ8bqU9HdxuA636C00D5WoZUmIQ-200x200-resized.jpg' alt='ss' className={styles.profile_avatar} />
                        <h1 className={styles.profile_name}>
                            {dadosDoUsuario.nome}
                        </h1>
                    </div>
                    <div className={styles.profile_body}>
                        <p className={styles.profile_nick}>
                            @{dadosDoUsuario.nick}
                        </p>
                        <p className={styles.profile_email}>
                            {dadosDoUsuario.email}
                        </p>
                        <p className={styles.profile_telefone}>
                            {dadosDoUsuario.telefone}
                        </p>
                        <p className={styles.profile_bio}>Lorem ipsum, dolor sit amet Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde assumenda fugiat maiores autem, tempore, doloribus.</p>

                        {dadosDoUsuario.rule === 'Admin' && (
                            <a href="admin/">
                                <button>
                                    ADMIN
                                </button>
                            </a>
                        )}
                    </div>
                </div>

                <div className={styles.cntainer_buttons_perfil}>
                    <button>Alterar Dados</button>
                    <button onClick={sairDaCorta}>Sair Desta Conta</button>
                </div>
            </section>
        )
    )
}

export default Perfil
