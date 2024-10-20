import "./Cursos.css"
import { useParams } from 'react-router-dom';

function CursosForm() {
    const { id } = useParams();

    const criarCurso = async (event) => {
        event.preventDefault()

        const nomeProfessor = event.target.inputNameProf.value;
        const capaCurso = event.target.inputCapaCurso.value;
        const nomeCurso = event.target.inputNomeCurso.value;
        const detalheCurso = event.target.inputDetalheCurso.value;
        const descritionCurso = event.target.inputDescritionCurso.value;

        const formData = {
            nomeProfessor, capaCurso, nomeCurso, detalheCurso, descritionCurso, idTrilhaPai: id
        }
    
        try {
            const response = await fetch("http://localhost:4000/api/addcursos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json(); // Converte a resposta para JSON
            const cursoId = data._id; // Extrai o ID do curso

            const responseTrilha = await fetch(`http://localhost:4000/api/${id}/adicionarIDCurso`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cursoId }),
            });
            if (responseTrilha.ok) {
                console.log('Curso adicionado à trilha com sucesso!');
            } else {
                console.log('Erro ao adicionar curso à trilha');
            }
        } catch(err) {
            console.log('Erro CursosForm.js : ' + err)
        }
    }

    return (
       <>
       <form class="row g-3" onSubmit={criarCurso}>
            <div class="col-md-9">
                <label for="inputNameProf" class="form-label">Nome Do <strong>Professor</strong></label>
                <input type="text" class="form-control" id="inputNameProf" placeholder="Ramon Rodrigues"/>
            </div>
            <div class="col-md-4">
                <label for="inputCapaCurso" class="form-label">Capa Do <strong>Curso</strong></label>
                <input type="text" class="form-control" id="inputCapaCurso" placeholder="https://" />
            </div>
            <div class="col-md-4">
                <label for="inputNomeCurso" class="form-label">Nome Do <strong>Curso</strong></label>
                <input type="text" class="form-control" id="inputNomeCurso" placeholder="JavaScript Avançado" />
            </div>
            <div class="col-md-3">
                <label for="inputDetalheCurso" class="form-label">Detalhe Do <strong>Curso</strong></label>
                <input type="text" class="form-control" id="inputDetalheCurso" placeholder="Modulo IV"/>
            </div>
            <div class="col-12">
                <label for="inputDescritionCurso" class="form-label">Descrição Do <strong>Curso</strong></label>
                <input type="text" class="form-control" id="inputDescritionCurso" placeholder="Melhor curso de ..." />
            </div>

            <div class="col-12">
                <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck" />
                <label class="form-check-label" for="gridCheck">
                    Check me out
                </label>
                </div>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Criar curso</button>
            </div>
        </form>
       </>
    )
}

export default CursosForm