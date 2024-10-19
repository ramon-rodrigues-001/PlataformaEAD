const mongoose = require('mongoose')

const trilhaSchema = new mongoose.Schema({
    nomeTrilha: {
        type: String,
        required: true
    },
    cursosIDs: [{
        type: String
    }]
})


const TrilhaCurso = mongoose.model('Trilha', trilhaSchema);

module.exports = TrilhaCurso