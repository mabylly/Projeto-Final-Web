// routes/authRoutes.ts
import express from 'express';
import { 
  register, 
  login, 
  getCurrentUser, 
  updateProfile, 
  logout, 
  healthCheck 
} from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rotas protegidas
router.get('/me', authenticateToken, getCurrentUser);
router.put('/profile', authenticateToken, updateProfile);
router.post('/logout', authenticateToken, logout);

// Rota de health check 
router.get('/health', healthCheck);

export default router;