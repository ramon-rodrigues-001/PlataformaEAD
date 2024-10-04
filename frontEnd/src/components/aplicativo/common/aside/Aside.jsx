import { useEffect } from "react";
import styles from "./Aside.module.scss";

function Aside(props) {
  const taDentroDoMenu = props.taDentroDoMenu;
  
  // Pegando o id do usuario
  const userId = localStorage.getItem('userID')

  const newNota = async () => {
    const nota = prompt('Título da nota:');

    if (nota) {
      try {
        const response = await fetch(`https://plataformaead-2.onrender.com/api/nota/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nota })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.usuario.anotacoes)
        creatNota(data.usuario.anotacoes);
      } catch (error) {
        console.error('Erro ao adicionar anotação:', error);
      }
    }
  };


  // Chamar a função creatNota pela prmeira vez.
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch(`https://plataformaead-2.onrender.com/api/nota/${userId}`, {
          method: 'POST'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        creatNota(data.usuario.anotacoes);
      } catch (error) {
        console.error('Erro ao carregar anotações:', error);
      }
    };

    fetchNotas();
  }, [userId]);
  
  // Crear elemento no html
  const creatNota = (allNotas) => {
    const containerDeAnotacao = document.querySelector('.containerDeAnotacao');
    containerDeAnotacao.innerHTML = ''

    allNotas.forEach(nota => {
      const cardsAnotacoe = document.createElement('div');
      cardsAnotacoe.className = styles.cardsAnotacao;

      const nome = document.createElement('p');
      nome.innerHTML = nota;

      const informationsAmigo = document.createElement('div');
      informationsAmigo.className = styles.informationsAnotacao;

      const iconeLapis = document.createElement('i');
      iconeLapis.className = "bi bi-pencil-fill";
      iconeLapis.addEventListener('click', mudarNome);

      informationsAmigo.appendChild(iconeLapis);
      cardsAnotacoe.appendChild(nome);
      cardsAnotacoe.appendChild(informationsAmigo);

      containerDeAnotacao.appendChild(cardsAnotacoe);
    });
  };


  const mudarNome = (event) => {
    const elemento = event.target.parentNode.parentNode.firstElementChild;
    const newNome = prompt('Nome:');

    if (newNome) {
      elemento.innerHTML = newNome;
    }
    console.log(elemento);
  };


  return (
    <div className={styles.aside} id={taDentroDoMenu && styles.dentroDoMenu} onLoad={creatNota}>
      <h2>Anotações</h2>

      <div className={styles.containerInputPrucurarPorAnotacao}>
        <i className="bi bi-search" id={styles.iconeLupa}></i>
        <input type="text" className={styles.inputPrucurarPorAnotacao} />
      </div>

      <button className={styles.buttonAdicionarNovaAnotacao} onClick={newNota}>
        <i className="bi bi-plus-lg"></i> Criar nota
      </button>

      <div className='containerDeAnotacao'>
        {/* <a href="/chatpv" className={styles.cardsAnotacao}>
          <p>Arry Function</p>
          <div className={styles.informationsAmigo}>
            <i className="bi bi-pencil-fill" onClick={mudarNome}></i>
            <i className="bi bi-trash3-fill"></i>
          </div>
        </a> */}
        <p className={styles.avisoDeAnotacao}>Faça login para ter acesso as anotações</p>
      </div>
    </div>
  );
}

export default Aside;
