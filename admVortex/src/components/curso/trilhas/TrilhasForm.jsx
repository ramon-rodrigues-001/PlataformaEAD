import React, { useState, useEffect } from 'react';
import './Trilhas.css';

function TrilhasForm() {
    const [precoAntigo, setPrecoAntigo] = useState(100);
    const [desconto, setDesconto] = useState(10);
    const precoAtual = precoAntigo - (precoAntigo * (desconto / 100));

    const criarTrilha = async (event) => {
        event.preventDefault()
        const nomeTrilha = event.target.nomeTrilha.value;
        const descritionTrilha = event.target.descritionTrilha.value;
        const precoAntigo = event.target.precoAntigo.value;
        const desconto = event.target.desconto.value;
        const precoAtual = event.target.precoAtual.value;

        const data = { 
            nomeTrilha, descritionTrilha, precoAntigo, desconto, precoAtual 
        }

        try {
            const response = await fetch('http://localhost:4000/api/addtrilha', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

        } catch(erro) {
            console.log('erro ao tentar criar uma nova trilha: ' + erro)
        }
    }

    return (
        <div>
            <form className="row g-3" onSubmit={criarTrilha}>
                <div className="col-md-12">
                    <label for="nomeTrilha" className="form-label">Nome Da trilha de estudo</label>
                    <input type="text" className="form-control" id="nomeTrilha" placeholder="TRILHA (FULL-STACK)"/>
                </div>

                <div className="col-md-12">
                    <label for="descritionTrilha" className="form-label">Descriçao Da Trilha</label>
                    <input type="text" className="form-control" id="descritionTrilha" placeholder="Encinamos você as melhores habilidades do mercado financeiro...."/>
                </div>

                <div className="col-md-3">
                    <label for="precoAntigo" className="form-label">Preço com Promoção</label>
                    <input type="number" className="form-control" id="precoAntigo" placeholder="100" 
                    onChange={(e) => setPrecoAntigo(Number(e.target.value))}/> 
                </div>

                <div className="col-md-3">
                    <label for="desconto" className="form-label">Desconto %</label>
                    <input type="text" className="form-control" id="desconto" placeholder="10%" 
                    onChange={(e) => setDesconto(Number(e.target.value))}/>
                </div>

                <div className="col-md-3">
                    <label for="precoAtual" className="form-label">Preço Atual</label>
                    <input type="text" className="form-control" id="precoAtual" value={precoAtual.toFixed(2)} // Formata para duas casas decimais
                    readOnly/>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Criar trilha</button>
                </div>
            </form>
        </div>
  )
}

export default TrilhasForm;
