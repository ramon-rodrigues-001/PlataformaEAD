const mongoose = require('mongoose');

// Definindo o schema do curso
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
    detalheCurso: {
        type: String,
        required: true
    },
    descritionCurso: {
        type: String,
        required: true
    },
    aulas: []
});

// Definindo o schema da aula
const aulaSchema = new mongoose.Schema({
    capaAula: String,
    nomeAula: String,
    urlAula: String,
    descricaoAula: String,
    destaque: String,
    cursoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }
});

// Criando os modelos
const Curso = mongoose.model('Curso', cursoSchema);
const Aula = mongoose.model('Aula', aulaSchema);

// Exportando os modelos
module.exports = {
    Curso,
    Aula
};
