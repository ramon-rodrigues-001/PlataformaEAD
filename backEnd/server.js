const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user.js')


const anotacaoRouter = require('./routers/anotacao.js')
const cursosRouter = require('./routers/cursos.js')
const trilhasRouter = require('./routers/trilhaRouter.js')
const usuarioRouter = require('./routers/usuarioRouter.js')


const app = express();
const server = http.createServer(app);


// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
 

// Configuração das rotas após a conexão com o banco de dados
app.use('/', anotacaoRouter)
app.use('/', cursosRouter)
app.use('/', trilhasRouter) 
app.use('/', trilhasRouter)
app.use('/', usuarioRouter)






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







// Donectando a API do hotmart
// De alguma forma eu vou fazer uma integração lá com a hotmart, mesmo não consequindo imahginar como isso é feito
app.post('/webhook', (req, res) => {
    const hmToken = 'OD0pggZi2iaOgOZIPHAFtADHnQ3mMU57408110'; // Token correto da Hotmart
    const hmReceivedToken = req.headers['x-hotmart-hottok']; // Cabeçalho correto
    console.log("Webhook received, checking token...");

    // Validar o token recebido
    if (hmReceivedToken === hmToken) {
        const data = req.body;
        
        const buyer = data.data.buyer;
        console.log(`Compra aprovada! Cliente: ${JSON.stringify(buyer, null, 2)}`);
            
        
        res.status(200).send('Recebido');
    } else {
        console.log('Token inválido. Webhook não autorizado.');
        res.status(401).send('Não autorizado...');
    }
});
