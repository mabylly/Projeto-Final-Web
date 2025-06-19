import React, { useEffect, useState } from 'react';
import { Modal } from "../components/Modal";
import { AuthForm } from "../components/AuthForm";
import { authService } from '../services/authServices'; 

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  title?: string;
  subtitle?: {
    login: string;
    register: string;
  };
  onSuccess?: (user: any) => void; 
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = 'login',
  title = "pedagog.ia",
  subtitle = {
    login: "Entre na sua conta",
    register: "Crie sua conta gratuita"
  },
  onSuccess
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setError(null); 
  }, [initialMode]);

  const handleSubmit = async (formData: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (mode === 'login') {
        response = await authService.login({ 
          email: formData.email, 
          password: formData.password 
        });
        console.log('Usuário logado:', response.user);
      } else {
        response = await authService.register(formData);
        console.log('Usuário cadastrado:', response.user);
      }
      
      // Chamar callback de sucesso se fornecido
      if (onSuccess) {
        onSuccess(response.user);
      }
      
      onClose(); 
    } catch (err: any) {
      console.error('Erro na autenticação:', err);
      setError(err.message || 'Erro na autenticação');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError(null); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">
          {mode === 'login' ? subtitle.login : subtitle.register}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        onSwitchMode={switchMode}
      />
    </Modal>
  );
}