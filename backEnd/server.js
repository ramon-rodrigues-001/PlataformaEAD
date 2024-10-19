const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user.js')


const registerRouter = require('./routers/register.js');
const loginRouter = require('./routers/login.js');
const anotacaoRouter = require('./routers/anotacao.js')
const cursosRouter = require('./routers/cursos.js')
const trilhasRouter = require('./routers/trilhaRouter.js')


 
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
app.use('/', trilhasRouter)

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
    const hmToken = 'OD0pggZi2iaOgOZIPHAFtADHnQ3mMU57408110'; // Token correto da Hotmart
    const hmReceivedToken = req.headers['x-hotmart-hottok']; // Cabeçalho correto
    console.log("Webhook received, checking token...");

    // Validar o token recebido
    if (hmReceivedToken === hmToken) {
        const data = req.body;
        
        const buyer = data.data.buyer;
        console.log(`Compra aprovada! Cliente: ${buyer.name}, Email: ${buyer.email}`);
            
        
        res.status(200).send('Recebido');
    } else {
        console.log('Token inválido. Webhook não autorizado.');
        res.status(401).send('Não autorizado...');
    }
});




// app.post('/webhook', (req, res) => {
//     const hmToken = 'OD0pggZi2iaOgOZIPHAFtADHnQ3mMU57408110';
//     const hmReceivedToken = req.headers['x-hotmart-hottok'];

//     if (hmReceivedToken === hmToken) {
//         const data = req.body;
        
//         if (data.event === "PURCHASE_APPROVED") {
//             const buyerEmail = data.data.transaction.buyer.email;

//             // Encontrar o usuário e liberar o curso
//             User.findOneAndUpdate({ email: buyerEmail }, { courseAccess: true }, (err, user) => {
//                 if (err || !user) {
//                     console.log("Usuário não encontrado ou erro ao liberar o curso.");
//                     return res.status(500).send("Erro interno.");
//                 }
//                 console.log("Acesso ao curso liberado para:", buyerEmail);
//                 res.status(200).send('Acesso liberado.');
//             });
//         } else {
//             res.status(200).send('Evento não tratado.');
//         }
//     } else {
//         res.status(401).send('Não autorizado...');
//     }
// });