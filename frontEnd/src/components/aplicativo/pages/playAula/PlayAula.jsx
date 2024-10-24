import { useParams } from "react-router-dom";
import styles from "./PlayAula.module.scss";
import { useEffect, useState } from "react";

function PlayAula(props) {
  const tema = props.tema;
  const [loading, setLoading] = useState(true);
  const [curso, setCurso] = useState({});
  const [aula, setAula] = useState(null); // Aula começa como null
  const { id } = useParams();
  const [cursoId, setCursoId] = useState(
    id || localStorage.getItem('idUltimoCurso')
  );



  useEffect(() => {
    if (id) {
      // Se um novo ID de curso foi passado, salvamos ele no localStorage
      localStorage.setItem('idUltimoCurso', id);
      setCursoId(id); // Atualizamos o estado com o ID recebido pela URL
    }
  }, [id]);




  // Função para pegar a aula que o usuário escolheu assistir
  const escolherAula = async (event) => {
    const aulaid = event.currentTarget.dataset.idAula;

    try {
      const response = await fetch(`https://plataformaead-2.onrender.com/api/getaula/${cursoId}/${aulaid}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setAula(data); // Definimos a aula que o usuário escolheu
      } else {
        console.error("Erro ao buscar aula:");
      }
    } catch (erro) {
      console.error("Erro no fetch:", erro);
    }
  };




  // Função para pegar o curso que foi escolhido
  const fetchCurso = async () => {
    try {
      const response = await fetch(`https://plataformaead-2.onrender.com/api/getcurso/${cursoId}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setCurso(data);

        // Se há aulas e nenhuma aula foi definida, carregamos a primeira aula
        if (data.aulas && data.aulas.length > 0) {
          setAula(data.aulas[0]); // Definimos a primeira aula do curso
        }
      } else {
        console.error("Erro ao buscar cursos:", response.statusText);
      }
    } catch (err) {
      console.error("Erro no fetch:", err);
    } finally {
      setLoading(false); // Parar o loading
    }
  };

  // Usa useEffect para buscar os cursos assim que o componente for montado
  useEffect(() => {
    fetchCurso();
  }, [cursoId]);






  

  if (loading) return <div>Carregando...</div>; // Esperar o código compilar

  return (
    <div className={styles.sectionPlayAula} id={tema === "Escuro" ? styles.temaDark : null}>
      <div className={styles.background}>
        {/* Welcome */}
        <div className={styles.welcome}>
          <h2>{curso.nomeCurso}</h2>
        </div>
        <br />

        {/* Container de assistir Aula */}
        <div className={styles.container_De_Aula}>
          <div>
            {aula ? (
              <>
                <div className={styles.aula}>
                  <p className={styles.tipoDePublication}>{aula.lembrete}</p>
                  <div className={styles.perfilDoProfessor}>
                    <div className={styles.imgDoProfessor}></div>
                    <div>
                      <p className={styles.nomeDoProfessor}>Professor:</p>
                      <p className={styles.nomeDoProfessor}>Ramon Rodrigues</p>
                    </div>
                  </div>
                  <div style={{ padding: "0 0 56.25% 0" }}>
                    <iframe
                      src={`https://player.vimeo.com/video/${aula.linkAula}?badge=0&autopause=0&player_id=0&app_id=58479`}
                      style={{ position: "absolute", top: 40, left: "50%", width: "91%", height: "100%", transform: "translateX(-50%)" }}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                      title="Vimeo Video"
                      id={styles.videoAula}
                    ></iframe>
                  </div>
                </div>

                {/* Descrição */}
                <div className={styles.aula}>
                  <div id={styles.descrition}>
                    <div className={styles.d}>
                      Você está assistindo à aula: <span className={styles.destaqueTexto}>{aula.nameAula}</span>, criada pelo professor{" "}
                      <span className={styles.destaqueTexto}>{curso.nomeProfessor}</span> da Vortex, sua escola EAD dedicada ao desenvolvimento da sua carreira. <br /> <br />
                      {aula.descritionAula}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>Você precisa escolher um curso primeiro.</p>
            )}
          </div>

          {/* Próximas aulas */}
          <div className={styles.container_proxima_aula}>
            <div className={styles.proximasAulas}>
              <p className={styles.tipoDePublication}>Próximos</p>
              {/* <p>Proxiamas aulas</p> */}

              {curso.aulas && curso.aulas.length > 0 ? (
                curso.aulas.map((aula) => (
                  <div
                    className={styles.cardProximasAulas}
                    data-id-aula={aula._id}
                    onClick={escolherAula}
                    key={aula._id}
                  >
                    {aula.capaAula ? (
                      <img src={aula.capaAula} alt="Capa da aula" className={styles.imgProximaAula} />
                    ) : (
                      <img src="/iconeDeCursoIA2.webp" alt="Capa da aula" className={styles.imgProximaAula} />
                    )}
                    <div>
                      <p>{aula.nameAula}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nenhuma aula disponível</p> // Exibe mensagem se não houver aulas
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayAula;
