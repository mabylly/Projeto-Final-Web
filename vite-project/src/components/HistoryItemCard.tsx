// src/components/HistoryItemCard.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Calendar, GraduationCap, FileCode2, CheckCircle } from 'lucide-react';
import type { HistoryItem } from '../types/history';
import { historyService } from '../services/historyService'; // <-- Importe o serviço

interface HistoryItemCardProps {
  item: HistoryItem;
  isCurrent?: boolean;
}

export default function HistoryItemCard({ item, isCurrent = false }: HistoryItemCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const cardClasses = `block bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
    isCurrent ? 'border-blue-500 border-2' : 'border-gray-200'
  } ${
    isLoading ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  // LÓGICA DE CLIQUE TOTALMENTE NOVA
  const handleHistoryClick = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // 1. Mostra um estado de carregamento na página de resultados
    navigate('/results', { state: { isLoading: true, results: [], error: null } });

    try {
      // 2. Chama o serviço para buscar os resultados SALVOS, usando o ID do item
      const savedResults = await historyService.fetchHistoryDetails(item.id);

      // 3. Navega para a página de resultados com os dados do banco de dados
      navigate('/results', { 
        state: { 
          isLoading: false, 
          results: savedResults, 
          error: null,
          searchTermFromHistory: item.topic // Mantém o destaque
        } 
      });

    } catch (err: any) {
      // 4. Em caso de erro, exibe a mensagem
      navigate('/results', { 
        state: { 
          isLoading: false, 
          results: [], 
          error: err.message || 'Ocorreu um erro ao carregar o histórico.',
          searchTermFromHistory: item.topic
        } 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // O restante do componente permanece o mesmo...
  return (
    <div 
      onClick={handleHistoryClick}
      className={cardClasses}
      role="button"
      tabIndex={0} 
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleHistoryClick()}
    >
      <div className="p-5 relative">
        {isCurrent && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            <CheckCircle size={14} />
            <span>Atual</span>
          </div>
        )}

        <div className="flex items-center gap-3 mb-4 pr-12">
          <History className="text-blue-500" />
          <h3 className="font-semibold text-lg text-gray-800 truncate" title={item.topic}>
            {isLoading ? 'Carregando...' : item.topic}
          </h3>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <GraduationCap size={16} />
            <span>Nível: {item.grade}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Data: {item.createdAt}</span>
          </div>
          
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
    </div>
  );
}