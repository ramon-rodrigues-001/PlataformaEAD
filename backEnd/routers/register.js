const user = require('../models/user.js')
const express = require('express')
const router = express.Router()


router.post("/api/register", async (req, res) => { 
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(now);

    const {username, email, password, telefone} = req.body;
    let userExiste = false

    await user.find().then(usuarios => {

        usuarios.forEach(usuario => {
            if (email === usuario.email) {
                userExiste = true
                res.status(409).json({ message: "o email do usuário já existe" });
            }
            else if (password.length < 8) {
                userExiste = true
                res.status(400).json({ message: "requisito minimo de caracteres" });
            }
        })

        if (userExiste === false) {
            const newUser = new user({ 
                nome: username,
                email: email, 
                senha: password,
                telefone: telefone,
                data: formattedDate
            })
            try {
                newUser.save()
                res.status(200).json({userID: newUser._id});
            }
            catch {
                console.log('===== Erro ao salvar usuario =====')
            }
        }
    })
});

module.exports = router