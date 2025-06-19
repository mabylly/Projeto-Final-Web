import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);

// Rota de health check geral
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Servidor está funcionando',
    timestamp: new Date().toISOString()
  });
});

// --- Rota 404 Catch-all ---
// Esta rota DEVE ser a penúltima definida, ANTES do middleware de tratamento de erros
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Recurso não encontrado. A página ou API que você está tentando acessar não existe.'
  });
});

// Middleware de tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});