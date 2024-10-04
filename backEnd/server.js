const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user.js')


const registerRouter = require('./routers/register.js');
const loginRouter = require('./routers/login.js');
const anotacaoRouter = require('./routers/anotacao.js')
const cursosRouter = require('./routers/cursos.js')


 
const app = express();
const server = http.createServer(app);

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
 

// Configuração das rotas após a conexão com o banco de dados
app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/', anotacaoRouter)
app.use('/', cursosRouter)

// pegar dados do usuario atraves do ID (ligado ao arquivo perfil)
app.post('/getUserDate', async (req, res) => {
    const userID = req.body
    
    try {
        const usuario = await User.findOne({_id: userID.userID})
        // console.log(usuario)
        res.status(200).json({usuario})
    } catch (error) {
        res.status(401).json({message: 'erro ao tentar buscar dados do usuario'})
    }
})

// Conexão com o MongoDB
const mongoURI = 'mongodb+srv://ramon:13153080552@cluster0.cij4gvt.mongodb.net/';
mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}) 
.then(() => {
    console.log('Conectado ao MongoDB');

    // Iniciando o servidor
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})
.catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
});



// conectando a API do hotmart
// de alguma forma eu vou fazer uma integração lá com a hotmart, mesmo não consequindo imaginar como isso é feito
app.post('/webhook', (req, res) => {
    const hmTokem = 'OD0pggZi2iaOgOZIPHAFtADHnQ3mMU57408110'
    const hmReceivedTokem = req.headers('x-hotmart-hottok')
    console.log("check")

    if (hmReceivedTokem === hmTokem) {
        const data = req.body
        console.log('Dados recebidos...', data)
        res.status(200).send('Recebido')
    }
    else {
        res.status(401).send('Não altorizado...')
    }
})