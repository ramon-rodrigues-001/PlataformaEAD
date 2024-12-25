const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true,
        validate: {
            validator: function (senha) {
                return senha.length >= 8;
            },
            message: 'A senha deve ter no mínimo 8 caracteres.'
        }
    },
    data: {
        type: String,
        required: true
    },
    rule: {
        type: String,
        required: true
    },

    listaCursos: [
        String
    ],

    anotacoes: [
        {
            tituloAnotation: {
                required: true,
                type: String
            },
            descritionAnotation: {
                type: String
            }
        }
    ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;