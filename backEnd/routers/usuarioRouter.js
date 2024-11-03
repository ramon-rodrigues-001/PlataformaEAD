const User = require('../models/user.js')
const express = require('express');
const router = express.Router()



// LOGAR USUARIO VERIFICANDO OS DADOS
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, senha: password })
    console.log(user)
  
    if (user) {
      res.status(200).json({ success: true, message: 'Login bem-sucedido', userID: user._id});
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});




// SALVAR USUARIO NO BANCO DE DADOS
router.post("/api/register", async (req, res) => { 
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(now);

    const {username, email, password, telefone} = req.body;
    let userExiste = false

    await User.find().then(usuarios => {

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
            const newUser = new User({ 
                nome: username,
                email: email, 
                senha: password,
                telefone: telefone,
                data: formattedDate,
                rule: 'Membro',
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



// PEGAR USUARIO
router.get("/api/getUser/:id", async (req, res) => {
    const { id } = req.params

    try {
        const usuario = await User.findById(id)
        res.json(usuario)
    } catch(erro) {
        res.status(500).json({message: 'Não foi possivel encontrar usuário...'})
    }
})

  
module.exports = router