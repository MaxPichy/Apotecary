import { IngredientRoutes } from './routes/IngredientRoutes';
import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Integrando prefixo /ingredients para todas as rotas de ingredientes
app.use('/ingredients', IngredientRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Servidor rodando com sucesso.',
  });
});

export { app };
