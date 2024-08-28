const user = require('../models/user.js');
const express = require('express');
const router = express.Router();

router.post('/api/nota/:id', async (req, res) => {
    const userId = req.params.id;
    const { nota } = req.body;


    try {
        // Encontrar o usuário pelo ID
        const usuario = await user.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        else if (!nota) { 
            return res.status(200).json({ message: 'Sem novas anotações', usuario });
        }

        // Adicionar a nova anotação ao array de anotações
        usuario.anotacoes.push(nota);

        // Salvar as mudanças
        await usuario.save();

        res.status(200).json({ message: 'Anotação adicionada com sucesso', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar anotação', error });
    }
});

module.exports = router;
