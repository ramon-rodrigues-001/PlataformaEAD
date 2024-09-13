const { curso } = require('../models/cursos')
const express = require('express')
const Router = express.Router()

Router.post('/api/addcursos', (req, res) => {
    const {capaCurso, nomeCurso, nomeProfessor, descritionCurso} = req.body

    try {
        const newCurso = new curso({
            capaCurso, nomeCurso, nomeProfessor, descritionCurso
        })
        console.log(newCurso)
        newCurso.save()
    } catch(eer) {
        console.log("erro ao tentar salvar o curso : " + eer)
    }
})