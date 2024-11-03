import React, { useState, useEffect } from 'react';
import './Trilhas.css';

function TrilhasForm() {

    const criarTrilha = async (event) => {
        event.preventDefault()
        const nomeTrilha = event.target.nomeTrilha.value;

        try {
            const response = await fetch('http://localhost:4000/api/addtrilha', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nomeTrilha }),
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
                    <label for="nomeTrilha" className="form-label">Nome Da trilha de estudo</label>
                    <input type="text" className="form-control" id="nomeTrilha" placeholder="TRILHA (FULL-STACK)"/>
                </div>

                <div className="col-md-3">
                    <label for="precoAntigo" className="form-label">Preço com Promoção</label>
                    <input type="number" className="form-control" id="precoAntigo" placeholder="100"/>
                </div>

                <div className="col-md-3">
                    <label for="desconto" className="form-label">Desconto %</label>
                    <input type="text" className="form-control" id="desconto" placeholder="10%"/>
                </div>

                <div className="col-md-3">
                    <label for="nomeTrilha" className="form-label">Preço Atual</label>
                    <input type="text" className="form-control" id="nomeTrilha" value={
                        document.querySelector('#nomeTrilha').value - Number(document.querySelector('#desconto').value)
                    }/>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Criar trilha</button>
                </div>
            </form>
        </div>
  )
}

export default TrilhasForm;
