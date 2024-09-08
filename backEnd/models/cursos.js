const mongoose = require('mongoose')

const cursoSchema = new mongoose.Schema({
    capaCurso: {
        type: String,
        required: true
    },
    nomeCurso: {
        type: String,
        required: true
    },
    nomeProfessor: {
        type: String,
        required: true
    },
    discricaoProfessor: {
        type: String
    }
})


const aulaSchema = new mongoose.Schema({
    capaAula: String,
    nomeAula: String,
    urlAula: String,
    descricaoAula: String,
    destaque: String,
    cursoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }
});