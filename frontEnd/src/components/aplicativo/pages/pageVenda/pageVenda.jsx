import { useParams } from 'react-router-dom'
import styles from './pageVenda.module.scss'
import { useEffect, useState } from 'react'


function PageVenda() {
    const { id } = useParams();
    const [idTrilha, setIdTrilha] = useState(null);
    const [trilha, setTrilha] = useState(null);




    // Primeiro useEffect: Carregar idTrilha associado ao id e idUser
    useEffect(() => {
        const idUser = localStorage.getItem('userID');

        if (!id || !idUser) {
            console.log("ID ou ID do usuário está indefinido.");
            return;
        }

        async function pegarIdTrilha() {
            try {
                const response = await fetch(`http://localhost:4000/api/getcurso/${id}/${idUser}`, { method: 'GET' });
                
                if (response !== null) {
                    const data = await response.json();
                    setIdTrilha(data.idTrila);
                }
            } catch (erro) {
                console.log('Erro ao executar fetch, pegar _ID da trilha: ' + erro);
            }
        }

        pegarIdTrilha();
    }, [id]);





    // Segundo useEffect: Carregar dados da trilha somente quando idTrilha estiver definido
    useEffect(() => {
        async function pegarTrilha() {
            try {
                const response = await fetch(`http://localhost:4000/api/gettrilha/${idTrilha}`, { method: 'GET' });

                if (response.ok) {
                    const data = await response.json();
                    setTrilha(data);
                    console.log(data);
                }
            } catch (erro) {
                console.log('Erro ao executar fetch, pegar trilha: ' + erro);
            }
        }

        pegarTrilha();
    }, [idTrilha]);




    return (


        <div>
            {trilha ? (
                <div className={styles.salesPage}>

                    <p className={styles.cursoPrivado}><i class="bi bi-lock"></i>  Curso Privado</p>


                    {/* Agora eu quro uma section de intodução ao curso uma home na div abaixo */}
                    <div className={styles.apresentarCurso}>
                        <h1>{trilha.nomeTrilha}</h1>
                        <p className={styles.destricaoCurso}>{trilha.descritionTrilha}</p>
                        <button className={styles.buttonConhecerCurso}>Conhecer Curso</button>
                    </div>


                    <h2 className={styles.sectionTitle}>Planos Disponíveis</h2>

                    <div className={styles.cardsContainer}>
                        <div className={styles.courseCard}>
                            <h3 className={styles.courseTitle}>Plano Vitalicio</h3>
                            <p className={styles.courseDescription}>Tenha o curso para sempre, com apenas um pagamento.</p>
                            <p className={styles.courseDescription}>+ 6 CachCoins</p>
                            <p className={styles.valor}>
                                {trilha.precoAntigo ? (
                                    <s>R${trilha.precoAntigo.toFixed(2).replace('.', ',')}</s>
                                ) : (null)} R${trilha.precoAtual.toFixed(2).replace('.', ',')}
                            </p>
                            <a href='https://pay.hotmart.com/J95838219S?bid=1730658345518' target='_blank' className={styles.buyButton}>Comprar</a>
                        </div>


                        <div className={styles.courseCard}>
                            <h3 className={styles.courseTitle}>Plano Mensalidade</h3>
                            <p className={styles.courseDescription}>Aproveite oa maximo, e cancele quando quizer.</p>
                            <p className={styles.courseDescription}>+ 3 CachCoins</p>
                            
                            <p className={styles.valor}>
                                R${(trilha.precoAtual / 5).toFixed(2).replace('.', ',')} / Mes
                            </p>

                            <button className={styles.buyButton}>Assinar</button>
                        </div>


                        <div className={styles.courseCard}>
                            <h3 className={styles.courseTitle}>CashCoins</h3>
                            <p className={styles.courseDescription}>Comprar com moedas de contribuição.</p>
                            <br /> <br />
                            <p className={styles.valor}>{trilha.precoAntigo} CashCoins</p>
                            <button className={styles.buyButton}>Comprar</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>




    )
}

export default PageVenda