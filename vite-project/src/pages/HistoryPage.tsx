// src/pages/HistoryPage.tsx

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HistoryItemCard from '../components/HistoryItemCard';
import { historyService } from '../services/historyService';
import type { HistoryItem } from '../types/history';
import { authService } from '../services/authServices'; // Para verificar se está logado

export default function HistoryPage() {
  const location = useLocation();
  const currentSearchTerm = location.state?.searchTermFromHistory;

  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    // Apenas busca o histórico se o usuário estiver autenticado
    if (isAuthenticated) {
      historyService.fetchHistory()
        .then(data => {
          // Formata a data para ficar igual ao seu mock
          const formattedData = data.map(item => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })
          }));
          setHistoryItems(formattedData);
        })
        .catch(err => {
          console.error("Erro ao buscar histórico:", err);
          setError("Não foi possível carregar seu histórico. Tente novamente mais tarde.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false); // Se não está logado, para de carregar
    }
  }, [isAuthenticated]); // Roda o efeito quando o status de autenticação mudar

  if (isLoading) {
    return <div className="text-center p-10">Carregando seu histórico...</div>;
  }
  
  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Meu Histórico de Recursos
      </h1>
      {currentSearchTerm && (
        <p className="text-md text-gray-600 mb-8">
          Você acabou de pesquisar por: <span className="font-semibold">"{currentSearchTerm}"</span>
        </p>
      )}

      {/* A lógica de renderização agora depende do estado `isAuthenticated` */}
      {!isAuthenticated ? (
        <p className="text-center text-gray-500 mt-10">
          Você precisa <a href="/login" className="text-blue-600 hover:underline">fazer login</a> para ver seu histórico.
        </p>
      ) : historyItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyItems.map((item) => (
            <HistoryItemCard 
              key={item.id} 
              item={item} 
              isCurrent={item.topic === currentSearchTerm}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          Você ainda não gerou nenhum recurso. Suas buscas aparecerão aqui!
        </p>
      )}
    </div>
  );
}