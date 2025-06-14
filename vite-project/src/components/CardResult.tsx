import React from 'react';
import { Copy, Check } from 'lucide-react';

// 1. A interface que define as props do nosso componente.

interface CardResultProps {
  /** O título que aparecerá no cabeçalho do card. */
  title: string;

  /** Um ícone opcional para ser exibido ao lado do título. */
  icon?: React.ReactNode;

  /** O conteúdo principal do card, passado como filho do componente. */
  children: React.ReactNode;

  /** função a ser chamada quando o botão for clicado. */
  onCopy: () => void; 

  /** Indica se o conteúdo foi copiado com sucesso. */
  isCopied?: boolean;
}

export default function CardResult({ title, icon, children, onCopy, isCopied = false }: CardResultProps) {
  return (
    // O container principal do card, com estilos de fundo, borda e sombra.
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      
      {/* O cabeçalho do card, agora com layout flex para alinhar o botão à direita */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        
        {/* Agrupamos o ícone e o título para mantê-los juntos à esquerda */}
        <div className="flex items-center gap-3">
          {/* 2. O ícone só é renderizado se ele for passado como prop. */}
          {icon && <span className="flex-shrink-0">{icon}</span>}
          
          <h3 className="font-semibold text-lg text-gray-800">
            {title}
          </h3>
        </div>

        {/* --- Botão de Copiar --- */}
        <button 
          onClick={onCopy} // Chama a função passada pela prop onCopy
          className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
          title="Copiar conteúdo"
        >
          {/* Lógica para mostrar o ícone de 'check' ou de 'copiar' */}
          {isCopied ? (
            <Check className="text-green-500" size={18} />
          ) : (
            <Copy size={18} />
          )}
        </button>
        
      </div>
      
      {/* A área de conteúdo principal do card */}
      <div className="p-4">
        {/* 3. 'children' é renderizado aqui. É aqui que toda a flexibilidade acontece. */}
        {children}
      </div>
    </div>
  );
}