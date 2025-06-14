import { User } from 'lucide-react';

// 1. Criamos uma interface para definir o "contrato" das props do Header.
// O '?' torna a propriedade 'isLoggedIn' opcional.
interface HeaderProps {
  isLoggedIn?: boolean;
}

// 2. Usamos a interface e definimos um valor padrão para 'isLoggedIn'.
// Se a prop não for passada, ela automaticamente será 'false'.
export default function Header({ isLoggedIn = false }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-yellow-50 text-gray-700 font-semibold">
      <h1 className="text-2xl font-bold text-gray-900">pedagog.ia</h1>

      {isLoggedIn ? (
        // Navbar para usuário LOGADO
        <nav className="flex items-center space-x-6">
          <a href="#" className="hover:underline">
            Gerar Recursos
          </a>
          <a href="#" className="hover:underline">
            Sobre
          </a>
          <button className="p-2 rounded-full hover:bg-yellow-100" title="Meu Perfil">
            <User className="text-gray-900" size={24} />
          </button>
        </nav>
      ) : (
        // Navbar para usuário DESLOGADO (padrão)
        <nav className="space-x-6">
          <a href="#" className="hover:underline">
            Cadastro
          </a>
          <a href="#" className="hover:underline">
            Login
          </a>
        </nav>
      )}
    </header>
  );
}