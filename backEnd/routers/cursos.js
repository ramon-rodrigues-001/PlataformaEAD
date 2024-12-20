const { Curso, Aula } = require('../models/cursos')
const User = require('../models/user')
const express = require('express')
const TrilhaCurso = require('../models/trilhas')
const Router = express.Router()

// CRIAR CURSO
Router.post('/api/addcursos', (req, res) => {
    const {capaCurso, nomeCurso, nomeProfessor, detalheCurso, descritionCurso, idTrilhaPai} = req.body
    
    try {
        const newCurso = new Curso({
            capaCurso, nomeCurso, nomeProfessor, detalheCurso, descritionCurso, idTrilhaPai
        })
        console.log(newCurso)
        res.json(newCurso)
        newCurso.save()
    } catch(err) {
        console.log("erro ao tentar salvar o curso : " + err)
    }
})

// PEGAR TODOS OS CURSOS GERAL
Router.get('/api/getcursos', async (req, res) => {
    try {
        const cursos = await Curso.find();
        res.json(cursos); 
    } catch (err) {
        console.error('Erro ao buscar cursos:', err);
        res.status(500).json({ error: 'Erro ao buscar cursos' });
    }
});


// PEGAR OS CURSOS DE ACORDO COM CADA TRILHA DE ENCINO
Router.get('/api/trilhas/getcursos/:id', async (req, res) => {
    const { id } = req.params;

    try {
      // Busca a trilha pelo ID
      const trilha = await TrilhaCurso.findById(id);
      if (!trilha) {
        return res.status(404).send('Trilha não encontrada');
      }
  
      // Busca todos os cursos que correspondem aos IDs da trilha
      const cursos = await Curso.find({ _id: { $in: trilha.cursosIDs } });
  
      res.json(cursos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar os cursos');
    }
});


// PEGAR APENAS UM CURSO
Router.get('/api/getcurso/:idCurso/:idUser', async (req, res) => {
    const { idCurso, idUser } = req.params;

    try {
        const curso = await Curso.findById(idCurso);
        const usuario = await User.findById(idUser)

        if (!usuario.listaCursos.includes(curso.idTrilhaPai)) {
            return res.status(404).json({ error: 'Usuario não possue acesso a esta trilha', idTrila: curso.idTrilhaPai });
        }

        res.json(curso); 
    } catch (err) {
        console.error('Erro ao buscar cursos:', err);
        res.status(500).json({ error: 'Erro ao buscar cursos' });
    }
});







// ADICIONAR AULA AO CURSO X
Router.post('/api/addaulas/:id', async (req, res) => { // Corrigido a rota
    const { nameAula, capaAula, linkAula, lembrete, descritionAula } = req.body;
    const { id } = req.params;

    try {
        const curso = await Curso.findById(id);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }

        // Cria a nova aula
        const newAula = {
            nameAula, capaAula, linkAula, lembrete, descritionAula
        };

        curso.aulas.push(newAula);
        await curso.save();

        res.status(200).json({ message: 'Aula adicionada com sucesso', curso });
    } catch (err) {
        console.error("Erro ao tentar salvar a aula: " + err);
        res.status(500).json({ error: 'Erro ao salvar a aula' });
    }
});


// PEGAR TODAS AS AULAS DO CURSO X
Router.get('/api/getaulas/:id', async (req, res) => {
    const { id } = req.params; // Pega o ID da URL

    try {
        const curso = await Curso.findById(id); // Busca o curso pelo ID
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado' }); // Retorna erro se o curso não for encontrado
        }
        res.json(curso.aulas); // Retorna as aulas do curso
    } catch (err) {
        console.error('Erro ao buscar aulas:', err);
        res.status(500).json({ error: 'Erro ao buscar aulas' });
    }
});


// PEGAR APENAS UMA AULA DO CURSO X
Router.get('/api/getaula/:cursoId/:aulaId/:usuarioId', async (req, res) => {
    const { cursoId, aulaId, usuarioId } = req.params; // Pega o ID da URL
    

    try {
        const curso = await Curso.findById(cursoId); // Busca o curso pelo ID
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado' }); // Retorna erro se o curso não for encontrado
        }

        const aula = await curso.aulas.id(aulaId)
        if (!aula) {
            return res.status(404).json({ error: 'Aula não encontrada' }); // Retorna erro se a aula não for encontrada
        }

        const usuario = await User.findById(usuarioId)
        if (!usuario.listaCursos.includes(curso.idTrilhaPai)) {
            return res.status(404).json({ error: 'Usuario não possue acesso a esta trilha' });
        }

        res.json(aula); 
    } catch (err) {
        console.error('Erro ao buscar aula:', err);
        res.status(500).json({ error: 'Erro ao buscar aula' });
    }
});


module.exports = Router