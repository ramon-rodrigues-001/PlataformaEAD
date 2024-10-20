const Trilha = require ('../models/trilhas')
const express = require('express')
const Router = express.Router()


// CRIAR TRILHA
Router.post('/api/addtrilha', (req, res) => { 
    const nomeTrilha = req.body

    try {
        const newTrilha = new Trilha( nomeTrilha )
        console.log(nomeTrilha)
        newTrilha.save()
        // res.status(200)
    } catch(erro) {
        console.log('erro ao criar a trilha de curso: ' + erro)
    }
 })

 
// PEGAR TRILHAS
Router.get('/api/gettrilhas', async (req, res) => { 
    try {
        const trilhas = await Trilha.find();
        res.json(trilhas); 
    } catch (err) {
        console.error('Erro ao buscar trilhas:', err);
        res.status(500).json({ error: 'Erro ao buscar trilhas' });
    }
})


// PEGAR UMA TRILHA
Router.get('/api/gettrilha/:id', async (req, res) => { 
    try {
        const trilhas = await Trilha.find();
        res.json(trilhas); 
    } catch (err) {
        console.error('Erro ao buscar trilhas:', err);
        res.status(500).json({ error: 'Erro ao buscar trilhas' });
    }
})






module.exports = Router