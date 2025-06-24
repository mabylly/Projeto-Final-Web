// src/components/HistoryItemCard.tsx

import { Link } from 'react-router-dom';
import { History, Calendar, GraduationCap, Languages, FileCode2, CheckCircle } from 'lucide-react';
import type { HistoryItem } from '../types/history';

interface HistoryItemCardProps {
  item: HistoryItem;
  isCurrent?: boolean; // <-- Nova propriedade opcional
}

export default function HistoryItemCard({ item, isCurrent = false }: HistoryItemCardProps) {
  // Condicionalmente adicionamos classes de estilo se o card for o "atual"
  const cardClasses = `block bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${
    isCurrent ? 'border-blue-500 border-2' : 'border-gray-200'
  }`;

  return (
    <Link 
      to={`/results`}
      state={{ searchTerm: item.searchTerm }}
      className={cardClasses} // <-- Usamos as classes dinâmicas aqui
    >
      <div className="p-5 relative">
        {/* Adiciona um selo/ícone se for o item atual */}
        {isCurrent && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            <CheckCircle size={14} />
            <span>Atual</span>
          </div>
        )}

        {/* Título Principal */}
        <div className="flex items-center gap-3 mb-4 pr-12"> {/* Adicionado padding à direita para não sobrepor o selo */}
          <History className="text-blue-500" />
          <h3 className="font-semibold text-lg text-gray-800 truncate" title={item.searchTerm}>
            {item.searchTerm}
          </h3>
        </div>

        {/* Metadados */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <GraduationCap size={16} />
            <span>Nível: {item.readingLevel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Data: {item.createdAt}</span>
          </div>
          
          {/* Tag de Padrão (Opcional) */}
          {item.standard && (
            <div className="flex items-center gap-2 pt-2">
              <FileCode2 size={16} className="text-purple-600"/>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {item.standard}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}