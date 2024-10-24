import { useParams } from 'react-router-dom'
import styles from './pageAnotacao.module.scss'
import { useEffect, useState } from 'react'

function PageAnotacao() {
    const [ anotacaoEncontrada, setAnotacaoEncontrada ] = useState(null)
    const [ loding, setLoding ] = useState(true)
    const { idAnotacao } = useParams()
    const idUser = localStorage.getItem('userID')


    // Pegar anotação selecionada
    const fetchAnotacaoCompleta = async () => {
        try {
            // MUDAR URL ABAIXO
            const response = await fetch(`https://plataformaead-2.onrender.com/api/pegaranotacao/${idUser}/${idAnotacao}`, {
                method: 'GET'
            });
    
            if (!response) {
                console.log('Erro ao buscar a anotação');
            } else {
                const data = await response.json();
                setAnotacaoEncontrada(data)
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }

        setLoding(false)
    };
    
    useEffect(() => {
        fetchAnotacaoCompleta();
    }, []);



    // Apagar anotação
    const deleteAnotacao = async () => {
        try {
            console.log(idUser, idAnotacao)
            // MUDAR URL ABAIXO
            const response = await fetch(`https://plataformaead-2.onrender.com/api/apagarnota/${idUser}/${idAnotacao}`, {
            method: 'DELETE',
            });
            
            const result = await response.json();
            setAnotacaoEncontrada(result.usuario.anotacao[0])
        } catch (error) {
            console.error('Erro ao deletar anotação:', error);
            setAnotacaoEncontrada({tituloAnotation: 'Anotação apagada...'})
        }
    };
    
          
    



    if (loding) {return( <p>Carregando...</p> )}
    return (
        <div className={styles.containerAnotacaoCompleta}>
            <div className={styles.headerAnotacao}>
                <h2>{anotacaoEncontrada.tituloAnotation}</h2>
                <h3 onClick={deleteAnotacao}><i class="bi bi-trash3-fill"></i></h3>
            </div>
            
            <p>{anotacaoEncontrada.descritionAnotation}</p>
        </div>
    )
}

export default PageAnotacao