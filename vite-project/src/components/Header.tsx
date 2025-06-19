import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import { authService } from '../services/authServices';

interface HeaderProps {
  onAuthChange?: (isAuthenticated: boolean, user?: any) => void;
}

export default function Header({ onAuthChange }: HeaderProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'register'>('login');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Verificar se o usuário está logado ao carregar o componente
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = authService.isAuthenticated();
      setIsLoggedIn(isAuthenticated);
      
      if (isAuthenticated) {
        const userData = authService.getUserFromToken();
        setCurrentUser(userData);
        
        // Notificar o componente pai sobre o estado de autenticação
        if (onAuthChange) {
          onAuthChange(true, userData);
        }
      } else {
        setCurrentUser(null);
        if (onAuthChange) {
          onAuthChange(false);
        }
      }
    };

    checkAuth();
  }, [onAuthChange]);

  const openModal = (mode: 'login' | 'register') => {
    setModalMode(mode);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Função chamada quando o login/cadastro é bem-sucedido
  const handleAuthSuccess = (user: any) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    
    // Notificar o componente pai
    if (onAuthChange) {
      onAuthChange(true, user);
    }
    
    console.log('Usuário autenticado:', user);
  };

  // Função de logout
  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
      setCurrentUser(null);
      setShowDropdown(false);
      
      // Notificar o componente pai
      if (onAuthChange) {
        onAuthChange(false);
      }
      
      console.log('Usuário deslogado com sucesso');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showDropdown && !target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-yellow-50 text-gray-700 font-semibold">
        <h1 className="text-2xl font-bold text-gray-900">pedagog.ia</h1>
                  
        <nav className="flex items-center space-x-6">
          {/* Link Sobre nos dois headers */}
          <a href="#" className="px-3 py-2 rounded-md hover:bg-yellow-200 transition-colors duration-200">
            Sobre
          </a>
           
          {isLoggedIn ? (
            // Navbar para usuário LOGADO
            <>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-yellow-200 transition-colors duration-200">
                Meus Recursos
              </a>
                
              <div className="relative dropdown-container">
                <button
                  onClick={() => setShowDropdown(prev => !prev)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-yellow-200 transition-colors duration-200"
                  title={`Perfil de ${currentUser?.name || 'Usuário'}`}
                >
                  <User className="text-gray-900" size={24} />
                  {currentUser?.name && (
                    <span className="text-sm font-medium text-gray-700">
                      {currentUser.name}
                    </span>
                  )}
                </button>
                 
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <div className="py-1">
                      {currentUser && (
                        <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                          {currentUser.email}
                        </div>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Navbar para usuário DESLOGADO 
            <>
              <button 
                onClick={() => openModal('register')}
                className="px-3 py-2 rounded-md hover:bg-yellow-200 transition-colors duration-200"
              >
                Cadastro
              </button>
              <button 
                onClick={() => openModal('login')}
                className="px-3 py-2 rounded-md hover:bg-yellow-200 transition-colors duration-200"
              >
                Login
              </button>
            </>
          )}
        </nav>
      </header>
       
      {/* Modal de Autenticação */}
      <AuthModal 
        isOpen={showModal}
        onClose={closeModal}
        initialMode={modalMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}