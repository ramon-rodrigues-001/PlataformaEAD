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
    aulas: [
        {
            nameAula: {
                type: String,
                required: true
            },
            capaAula: {
                type: String
            },
            linkAula: {
                type: String,
                required: true
            },
            lembrete: {
                type: String
            },
            descritionAula: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('Curso', cursoSchema);




// Definindo o schema da aula
const aulaSchema = new mongoose.Schema({
    nameAula: {
        type: String,
        required: true
    },
    capaAula: {
        type: String
    },
    linkAula: {
        type: String,
        required: true
    },
    lembrete: {
        type: String
    },
    descritionAula: {
        type: String
    },
});



// Criando os modelos
const Curso = mongoose.model('Curso', cursoSchema);
const Aula = mongoose.model('Aula', aulaSchema);

// Exportando os modelos
module.exports = {
    Curso,
    Aula
};
