const user = require('../models/user.js')
const express = require('express')
const router = express.Router()


router.post("/api/register", async (req, res) => { 
    const {nickname, username, email, password, telefone} = req.body;
    let nicknameExist = false

    await user.find().then(usuarios => {

        usuarios.forEach(usuario => {
            if (username === usuario.nome) {
                nicknameExist = true
                res.status(409).json({ message: "o apelido do usuário já existe" });
            }
            else if (email === usuario.email) {
                nicknameExist = true
                res.status(409).json({ message: "o email do usuário já existe" });
            }
            else if (password.length < 8) {
                nicknameExist = true
                res.status(400).json({ message: "requisito minimo de caracteres" });
            }
        })

        if (nicknameExist === false) {
            const newUser = new user({ 
                nick: nickname,
                nome: username,
                email: email, 
                senha: password,
                telefone: telefone
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