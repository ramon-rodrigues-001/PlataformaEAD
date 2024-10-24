import { useEffect, useState } from "react";
import styles from "./Aside.module.scss";

function Aside(props) {
  const taDentroDoMenu = props.taDentroDoMenu;
  const [ anotacao, setAnotacao ] = useState(null)
  
  // Pegando o id do usuario
  const userId = localStorage.getItem('userID')

  
  // Criar nova anotação
  const newNota = async () => {
    const tituloAnotation = prompt('Título da nota:');
    const descritionAnotation = prompt('Discrição da nota:');

    if (tituloAnotation) {
      try {
        // MUDAR URL ABAIXO
        const response = await fetch(`https://plataformaead-2.onrender.com/api/nota/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tituloAnotation, descritionAnotation })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.usuario.anotacoes)
        setAnotacao(data.usuario.anotacoes)

        // creatNota(data.usuario.anotacoes);
      } catch (error) {
        console.error('Erro ao adicionar anotação:', error);
      }
    }
  };


  // Chamar a função creatNota pela prmeira vez.
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        // MUDAR URL ABAIXO
        const response = await fetch(`https://plataformaead-2.onrender.com/api/nota/${userId}`, {
          method: 'POST'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAnotacao(data.usuario.anotacoes)
        // creatNota(data.usuario.anotacoes);
      } catch (error) {
        console.error('Erro ao carregar anotações:', error);
      }
    };

    fetchNotas();
  }, [userId]);
  




  const mudarNome = (event) => {
    const elemento = event.target.parentNode.parentNode.firstElementChild;
    const newNome = prompt('Nome:');

    if (newNome) {
      elemento.innerHTML = newNome;
    }
    console.log(elemento);
  };



  return (
    <div className={styles.aside} id={taDentroDoMenu && styles.dentroDoMenu} >
      {/* onLoad={creatNota} */}
      <h3>Anotações</h3>

      <div className={styles.containerInputPrucurarPorAnotacao}>
        <i className="bi bi-search" id={styles.iconeLupa}></i>
        <input type="text" className={styles.inputPrucurarPorAnotacao} />
      </div>

      <button className={styles.buttonAdicionarNovaAnotacao} onClick={newNota}>
        <i className="bi bi-plus-lg"></i> Criar anotação
      </button>

      <div className='containerDeAnotacao'>
        {anotacao && anotacao.length > 0 ? (
          anotacao.map((element, index) => (
            <a href={`/pageanotacao/${element._id}`} className={styles.cardsAnotacao} key={index}>
              <p>{element.tituloAnotation}</p>
              <div className={styles.informationsAnotacao}>
                <i className="bi bi-pencil-fill" onClick={mudarNome}></i>
              </div>
            </a>
          ))
        ) : (
          <p className={styles.avisoDeAnotacao}>Você ainda não possui anotações.</p>
        )}
      </div>
    </div>
  );
}

export default Aside;
