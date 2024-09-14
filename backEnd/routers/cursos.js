const { Curso, Aula } = require('../models/cursos')
const express = require('express')
const Router = express.Router()

Router.post('/api/addcursos', (req, res) => {
    const {capaCurso, nomeCurso, nomeProfessor, detalheCurso, descritionCurso} = req.body
    
    try {
        const newCurso = new Curso({
            capaCurso, nomeCurso, nomeProfessor, detalheCurso, descritionCurso
        })
        console.log(newCurso)
        newCurso.save()
    } catch(err) {
        console.log("erro ao tentar salvar o curso : " + err)
    }
})

// Pegar cursos
Router.get('/api/getcursos', async (req, res) => {
    try {
        const cursos = await Curso.find();
        res.json(cursos); 
    } catch (err) {
        console.error('Erro ao buscar cursos:', err);
        res.status(500).json({ error: 'Erro ao buscar cursos' });
    }
});



// Adicionar Aulas ao curso X
Router.post('/api/addaulas/:id', async (req, res) => { // Corrigido a rota
    const { nameAula, capaAula, linkAula, lembrete, descritionAula } = req.body;
    const { id } = req.params;

    try {
        const curso = await Curso.findById(id);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }

        // Cria a nova aula
        const newAula = {
            nameAula, capaAula, linkAula, lembrete, descritionAula
        };

        curso.aulas.push(newAula);
        await curso.save();

        res.status(200).json({ message: 'Aula adicionada com sucesso', curso });
    } catch (err) {
        console.error("Erro ao tentar salvar a aula: " + err);
        res.status(500).json({ error: 'Erro ao salvar a aula' });
    }
});


// Pegar Aulas do curso X
Router.get('/api/getaulas/:id', async (req, res) => {
    const { id } = req.params; // Pega o ID da URL

    try {
        const curso = await Curso.findById(id); // Busca o curso pelo ID
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado' }); // Retorna erro se o curso não for encontrado
        }
        res.json(curso.aulas); // Retorna as aulas do curso
    } catch (err) {
        console.error('Erro ao buscar aulas:', err);
        res.status(500).json({ error: 'Erro ao buscar aulas' });
    }
});


module.exports = Router