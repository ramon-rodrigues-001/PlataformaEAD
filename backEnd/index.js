const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');


const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const anotacaoRouter = require('./routers/anotacao')

 
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
