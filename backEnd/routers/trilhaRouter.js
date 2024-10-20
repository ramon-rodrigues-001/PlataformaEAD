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



// ADICIONAR O (ID DO CURSO) AO BANCO DE DADOS (TRILHA)
Router.post('/api/:id/adicionarIDCurso', async (req, res) => {
    const { id } = req.params; // ID da trilha
    const { cursoId } = req.body; // ID do curso passado pelo fetch

    try {
        // Usando $push para adicionar o curso ao array 'cursos'
        const trilhaAtualizada = await Trilha.findByIdAndUpdate(
          id,
          { $push: { cursosIDs: cursoId } }, // Adiciona o curso ao array 'cursos'
          { new: true } // Retorna a trilha atualizada
        );
    
        if (!trilhaAtualizada) {
          return res.status(404).send('Trilha não encontrada'); 
        } 
    
        res.json(trilhaAtualizada);
      } catch (error) {
        res.status(500).send('Erro ao adicionar curso: ' + error.message);
    }
})





module.exports = Router