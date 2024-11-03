const mongoose = require('mongoose')

const trilhaSchema = new mongoose.Schema({
    nomeTrilha: {
        type: String,
        required: true
    },
    descritionTrilha: {
        type: String,
        required: true
    },
    precoAntigo: {
        type: Number || String,
        required: false
    },
    desconto: {
        type: Number || String,
        required: false
    },
    precoAtual: {
        type: Number || String,
        required: true
    },
    cursosIDs: [{
        type: String
    }]
})


const TrilhaCurso = mongoose.model('Trilha', trilhaSchema);

module.exports = TrilhaCurso