// src/components/HistoryItemCard.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Calendar, GraduationCap, FileCode2, CheckCircle } from 'lucide-react';
import type { HistoryItem } from '../types/history';

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
    isLoading ? 'opacity-50 cursor-not-allowed' : '' // Estilo de feedback visual para carregamento
  }`;

  const handleHistoryClick = async () => {
    if (isLoading) return; // Previne múltiplos cliques
    
    setIsLoading(true);
    
    // 1. Navega para a página de resultados em estado de carregamento (igual a HomePage)
    navigate('/results', { 
      state: { 
        isLoading: true,
        results: [],
        error: null 
      } 
    });

    // 2. Replica a chamada de API da HomePage usando os dados do item do histórico
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: item.topic, grade: item.grade }),
      });

      if (!response.ok) throw new Error('Falha ao buscar os dados da API.');
      
      const data = await response.json();

      // 3. Navega novamente para a página de resultados com os dados recebidos
      navigate('/results', { 
        state: { 
          isLoading: false, 
          results: data, 
          error: null,
          
          searchTermFromHistory: item.topic 
        } 
      });

    } catch (err: any) {
      // 4. Em caso de erro, navega para a página de resultados com a mensagem de erro
      navigate('/results', { 
        state: { 
          isLoading: false, 
          results: [], 
          error: err.message || 'Ocorreu um erro.',
          searchTermFromHistory: item.topic
        } 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Trocamos <Link> por uma <div> com onClick
    <div 
      onClick={handleHistoryClick}
      className={cardClasses}
      role="button" // Melhora a acessibilidade
      tabIndex={0} 
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleHistoryClick()} // Permite "clicar" com teclado
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
            {/* Texto de carregamento no título */}
            {isLoading ? 'Recriando busca...' : item.topic}
          </h3>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <GraduationCap size={16} />
            {/* Usando item.grade */}
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