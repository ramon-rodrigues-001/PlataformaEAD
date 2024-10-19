import { useParams } from "react-router-dom";
import "./Aulas.css"

function AulasForm() {
    const { id } = useParams();

    const criarAula = async (event) => {
        event.preventDefault()

        const nameAula = event.target.inputNameAula.value;
        const capaAula = event.target.inputCapaAula.value;
        const linkAula = event.target.inputLinkAula.value;
        const lembrete = event.target.inputLembrete.value;
        const descritionAula = event.target.inputDescritionAula.value;

        const formData = {
            nameAula, capaAula, linkAula, lembrete, descritionAula
        }
    
        try {
            const response = await fetch(`http://localhost:4000/api/addaulas/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
        } catch(err) {
            console.log('Erro AulaForm.js : ' + err)
        }

    }

    return (
       <>
       <h2>Criar aula</h2> <br />
       <form class="row g-3" onSubmit={criarAula}>
            <div class="col-md-9">
                <label for="inputNameAula" class="form-label">Nome Da <strong>Aula</strong></label>
                <input type="text" class="form-control" id="inputNameAula" placeholder="Oque é JavaScript"/>
            </div>
            <div class="col-md-4">
                <label for="inputCapaAula" class="form-label">Capa Da <strong>Aula</strong></label>
                <input type="text" class="form-control" id="inputCapaAula" placeholder="https://" />
            </div>
            <div class="col-md-4">
                <label for="inputLinkAula" class="form-label">link Da <strong>Aula</strong></label>
                <input type="text" class="form-control" id="inputLinkAula" placeholder="https://" />
            </div>
            <div class="col-md-3">
                <label for="inputLembrete" class="form-label">Lembrete</label>
                <input type="text" class="form-control" id="inputLembrete" placeholder="Modulo IV"/>
            </div>
            <div class="col-12">
                <label for="inputDescritionAula" class="form-label">Descrição Da <strong>Aula</strong></label>
                <input type="text" class="form-control" id="inputDescritionAula" placeholder="Já pensou em aprender javaScript ...." />
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
                <button type="submit" class="btn btn-primary">Criar aula</button>
            </div>
        </form>
       </>
    )
}

export default AulasForm