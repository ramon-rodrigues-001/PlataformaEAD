const User = require('../models/user.js')
const express = require('express');
const router = express.Router()



// LOGAR USUARIO VERIFICANDO OS DADOS
const bcrypt = require('bcrypt');

router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuário pelo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }

        // Comparar a senha fornecida com o hash armazenado
        const isPasswordValid = await bcrypt.compare(password, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }

        // Login bem-sucedido
        res.status(200).json({ success: true, message: 'Login bem-sucedido', userID: user._id });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
});


// Numeros de rodadas (isso define o nevel de complexidade da criptografia, quanto maior o numero mais lento)
const SALT_ROUNDS = 8;


// SALVAR USUARIO NO BANCO DE DADOS
router.post("/api/register", async (req, res) => {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(now);

    const { username, email, password } = req.body;

    // Validação de senha
    if (password.length < 8) {
        return res.status(400).json({ message: "A senha deve ter pelo menos 8 caracteres" });
    }

    try {
        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "O email do usuário já existe" });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Criar novo usuário
        const newUser = new User({
            nome: username,
            email,
            senha: hashedPassword,
            data: formattedDate,
            rule: 'Membro',
        });

        // Salvar usuário no banco de dados
        await newUser.save();
        res.status(201).json({ userID: newUser._id });
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        res.status(500).json({ message: "Erro ao salvar usuário" });
    }
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