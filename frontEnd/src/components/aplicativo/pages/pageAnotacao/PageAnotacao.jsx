import { useParams, useNavigate } from 'react-router-dom';
import styles from './pageAnotacao.module.scss';
import { useEffect, useState } from 'react';

function PageAnotacao() {
    const [anotacaoEncontrada, setAnotacaoEncontrada] = useState(null);
    const [loding, setLoding] = useState(true);
    const { idAnotacao } = useParams();
    const idUser = localStorage.getItem('userID');
    const navigate = useNavigate(); // Para redirecionamento

    // Pegar anotação selecionada
    const fetchAnotacaoCompleta = async () => {
        try {
            const response = await fetch(`https://plataformaead-2.onrender.com/api/pegaranotacao/${idUser}/${idAnotacao}`, {
                method: 'GET',
            });

            if (!response.ok) {
                console.log('Erro ao buscar a anotação');
            } else {
                const data = await response.json();
                setAnotacaoEncontrada(data);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
        setLoding(false);
    };

    useEffect(() => {
        fetchAnotacaoCompleta();
    }, []);

    // Apagar anotação
    const deleteAnotacao = async () => {
        try {
            const response = await fetch(`https://plataformaead-2.onrender.com/api/apagarnota/${idUser}/${idAnotacao}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Redireciona para a página inicial após apagar
                navigate('/');
            } else {
                console.error('Erro ao deletar anotação');
            }
        } catch (error) {
            console.error('Erro ao deletar anotação:', error);
        }
    };

    if (loding) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.containerAnotacaoCompleta}>
            <div className={styles.headerAnotacao}>
                <h2>{anotacaoEncontrada?.tituloAnotation || 'Anotação não encontrada'}</h2>
                <h3 onClick={deleteAnotacao}>
                    <i className="bi bi-trash3-fill"></i>
                </h3>
            </div>
            <p>{anotacaoEncontrada?.descritionAnotation || 'Descrição indisponível'}</p>
        </div>
    );
}

export default PageAnotacao;
