import express from 'express';
import produtoRoutes from './routes/produtoRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware para JSON
app.use(express.json());


// Rota raiz
app.get('/', (req, res) => {
res.send('Bem-vindo à API do Catálogo!');
});


// Rotas de produto com prefixo
app.use('/produtos', produtoRoutes);


app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});