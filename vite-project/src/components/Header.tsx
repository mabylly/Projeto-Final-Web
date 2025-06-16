import React, { useState } from 'react';
import { User } from 'lucide-react';
import AuthModal from '../components/AuthModal'; 

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'register'>('login');
  const [showDropdown, setShowDropdown] = useState(false); 

  const openModal = (mode: 'login' | 'register') => {
    setModalMode(mode);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // função de logout (por enquanto, só loga no console)
  const handleLogout = () => {
    console.log('Usuário deslogado');
    setShowDropdown(false);
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-yellow-50 text-gray-700 font-semibold">
        <h1 className="text-2xl font-bold text-gray-900">pedagog.ia</h1>
         
        <nav className="flex items-center space-x-6">
          {/* link Sobre nos dois headers */}
          <a href="#" className="px-3 py-2 rounded-md hover:bg-yellow-200 transition-colors duration-200">
            Sobre
          </a>

          {isLoggedIn ? (
            // Navbar para usuário LOGADO
            <>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-yellow-200 transition-colors duration-200">
                Meus Recursos
              </a>


              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(prev => !prev)}
                  className="p-2 rounded-full hover:bg-yellow-200 transition-colors duration-200" 
                  title="Meu Perfil"
                >
                  <User className="text-gray-900" size={24} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-yellow-100"
                    >
                      Sair
                    </button>
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
      />
    </>
  );
}
