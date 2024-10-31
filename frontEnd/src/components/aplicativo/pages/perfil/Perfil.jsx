import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styles from "./Perfil.module.scss"

function Perfil() {
    const situacao_de_localStorage = localStorage.getItem('login')
    const [situacao, setSituacao] = useState(situacao_de_localStorage)
    const [dadosDoUsuario, setDadosDoUsuario] = useState(null)
    const [nomesTrilhasCompradas, setNomesTrilhasCompradas] = useState([])


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


    // Pegar as trilhas que o usuario possue no registro
    useEffect(() => {
        async function pegarNomeTrilhas() {
            const idsTrilhasDoUsuario = dadosDoUsuario.listaCursos
 
            try {
                const response = await fetch(`http://localhost:4000/api/pegarTrilhasDoUsuario?ids=${idsTrilhasDoUsuario.join(',')}` , {
                    method: 'GET'
                }) 
                 
                const data = await response.json()
    
                if (response.ok) {
                    setNomesTrilhasCompradas(data)
                }
                else {
                    console.log('Erro 500; Erro ao buscar trilhas...')
                }
            } catch (erro) {
                console.log('Erro ao buscar por trilhas compradas, Para o perfil')
            }
        }

        pegarNomeTrilhas()
    }, [dadosDoUsuario]) 


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



                    <div>
                        <img src='https://cdn.areademembros.com/cache/8hWmgaIKnKiHTmZ8bqU9HdxuA636C00D5WoZUmIQ-200x200-resized.jpg' alt='ss' className={styles.profile_avatar} />
                    </div>


                    <div className={styles.descricaoDoUsuario}>
                        <p className={styles.nome}>{dadosDoUsuario.nome}</p>
                        <p className={styles.data}><i class="bi bi-calendar"></i> Membro desde {dadosDoUsuario.data}</p>

                        
                        <span className={styles.spanClasse} id={styles.membro}>
                        <i class="bi bi-person-check-fill"></i> {dadosDoUsuario.rule === 'admin' ? ('Adiministrador'): ('Membro')}
                        </span>

                        
                        {nomesTrilhasCompradas.map(nome => (
                            <span className={styles.spanTeg}>
                                <i class="bi bi-star-fill"></i> {nome.nomeTrilha}
                            </span >
                        ))}
                    </div>

                    
                    <span className={styles.coin}>0💎</span>












                    {/* <div className={styles.profile_header}>
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
                    </div> */}
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
