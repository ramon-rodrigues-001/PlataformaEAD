const user = require('../models/user.js');
const express = require('express');
const router = express.Router();

// Pegar todas as anotaçoes do usuario
router.post('/api/nota/:id', async (req, res) => {
    const userId = req.params.id;
    const { tituloAnotation, descritionAnotation } = req.body;


    try {
        // Encontrar o usuário pelo ID
        const usuario = await user.findById(userId);
        
        if (!tituloAnotation) { 
            return res.status(200).json({ message: 'Sem novas anotações', usuario });
        } else if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Adicionar a nova anotação ao array de anotações
        usuario.anotacoes.push({ tituloAnotation, descritionAnotation });

        // Salvar as mudanças
        await usuario.save();

        res.status(200).json({ message: 'Anotação adicionada com sucesso', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar anotação', error });
    }
});




// Pegar apenas uma anotação
router.get('/api/pegaranotacao/:idUser/:idAnotacao', async (req, res) => {
    const { idUser, idAnotacao } = req.params; 

    try {
        const usuario = await user.findById(idUser); 
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const anotacaoEncontrada = await usuario.anotacoes.id(idAnotacao)
        if (!anotacaoEncontrada) {
            return res.status(404).json({ message: 'Anotação não encontrada' });
        }

        res.json(anotacaoEncontrada)
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});




// Rota para deletar uma anotação de um usuário
router.delete('/api/apagarnota/:idUser/:idAnotacao', async (req, res) => {
    const { idUser, idAnotacao } = req.params;

    try {
        // Usar $pull para remover a anotação do array pelo ID
        const usuario = await user.findByIdAndUpdate(
            idUser,
            { $pull: { anotacoes: { _id: idAnotacao } } },
            { new: true } // Para retornar o documento atualizado
        );

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Anotação deletada com sucesso', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar anotação', error });
    }
});

  



module.exports = router;
