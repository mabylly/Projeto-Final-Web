// src/pages/HistoryPage.tsx

import { useLocation } from 'react-router-dom';
import HistoryItemCard from '../components/HistoryItemCard';
import { historyMock } from '../mocks/historyMock'; 

export default function HistoryPage() {
  const location = useLocation();
  // Pega o termo da busca do estado da navegação, se existir
  const currentSearchTerm = location.state?.searchTerm;

  const historyItems = historyMock;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Meu Histórico de Recursos
      </h1>
      {currentSearchTerm && (
        <p className="text-md text-gray-600 mb-8">
          Mostrando o resultado destacado para: <span className="font-semibold">"{currentSearchTerm}"</span>
        </p>
      )}

      {historyItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyItems.map((item) => (
            <HistoryItemCard 
              key={item.id} 
              item={item} 
              // Passa 'true' para o card cujo termo de busca bate com o termo atual
              isCurrent={item.searchTerm === currentSearchTerm}
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