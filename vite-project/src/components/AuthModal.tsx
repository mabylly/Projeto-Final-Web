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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0); // Força re-renderização do formulário

  useEffect(() => {
    setMode(initialMode);
    setError(null);
    setSuccessMessage(null);
    setFormKey(prev => prev + 1); // Reseta o formulário quando muda o modo inicial
  }, [initialMode]);

  const handleSubmit = async (formData: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      let response;
      
      if (mode === 'login') {
        response = await authService.login({
          email: formData.email,
          password: formData.password
        });
        
        // Só chama onSuccess e fecha o modal no LOGIN
        if (onSuccess) {
          onSuccess(response.user);
        }
        onClose();
        
      } else {
        // CADASTRO
        response = await authService.register(formData);
        
        // Exibe mensagem de sucesso e muda para o modo login
        setSuccessMessage('Cadastro realizado com sucesso! Agora faça login com suas credenciais.');
        setMode('login');
        setFormKey(prev => prev + 1); // Força re-renderização para limpar os campos
        
        // NÃO chama onSuccess nem fecha o modal no cadastro
      }
      
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
    setSuccessMessage(null);
    setFormKey(prev => prev + 1); // Limpa os campos ao trocar de modo manualmente
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

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <AuthForm
        key={formKey} // Força re-renderização para limpar campos
        mode={mode}
        onSubmit={handleSubmit}
        onSwitchMode={switchMode}
      />
    </Modal>
  );
}