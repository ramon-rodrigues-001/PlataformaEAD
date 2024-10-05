const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nick: {
        type: String,
        required: true
    },
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
    telefone: {
        type: String,
        required: true
    },

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