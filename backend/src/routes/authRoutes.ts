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

// ---- Rotas Públicas (não exigem token) ----
router.post('/register', register);
router.post('/login', login);
router.get('/health', healthCheck); // Rota de verificação de status

// ---- Rotas Protegidas (exigem um token JWT válido) ----
router.get('/me', authenticateToken, getCurrentUser);
router.put('/profile', authenticateToken, updateProfile);
router.post('/logout', authenticateToken, logout);

export default router;