const { Curso } = require('../models/cursos')
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
    } catch(eer) {
        console.log("erro ao tentar salvar o curso : " + eer)
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