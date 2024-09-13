const { Curso } = require('../models/cursos')
const express = require('express')
const Router = express.Router()

Router.post('/api/addcursos', (req, res) => {
    const {capaCurso, nomeCurso, nomeProfessor, descritionCurso} = req.body

    try {
        const newCurso = new Curso({
            capaCurso, nomeCurso, nomeProfessor, descritionCurso
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

module.exports = Router