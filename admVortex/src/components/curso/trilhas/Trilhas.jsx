import React, { useState, useEffect } from 'react';
import './Trilhas.css';

function Trilhas() {
    const [loading, setLoading] = useState(true); 
    const [trilhas, setTrilhas] = useState(null)

    const fetchTrilha = async () => {
        
        try {
            const response = await fetch('http://localhost:4000/api/gettrilha', {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json();
                setTrilhas(data);
                setLoading(false);
                console.log(trilhas)
            }
        } catch(erro) {
            console.log('Erro ao tentar pegar as trilhas existentes: ' + erro)
        }
        
    }
    
    useEffect(() => {
        fetchTrilha()
    }, [])


    if (loading) return (<p>loading ...</p>)
    return (
        <div>
            <a href='/trilha/criartrilha' className='cardTrilha'>
                <p>Criar nova trilha</p>
            </a>

            {trilhas && (
                trilhas.map(element => (
                    <a href={`/trilha/${element._id}/cursos`} className='cardTrilha'>
                        <p>{element.nomeTrilha}</p>
                        <p>2 modulos</p>
                    </a>
                ))
            )}
        </div>
    )
}

export default Trilhas;
