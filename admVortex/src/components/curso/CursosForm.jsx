import "./Curso.css"

function CursosForm() {

    const criarCurso = async (event) => {
        event.preventDefault()

        const nomeProfessor = event.target.inputNameProf.value;
        const capaCurso = event.target.inputCapaCurso.value;
        const nomeCurso = event.target.inputNomeCurso.value;
        const detalheCurso = event.target.inputDetalheCurso.value;
        const descritionCurso = event.target.inputDescritionCurso.value;

        const formData = {
            nomeProfessor, capaCurso, nomeCurso, detalheCurso, descritionCurso
        }
    
        try {
            const response = await fetch("http://localhost:4000/api/addcursos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
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