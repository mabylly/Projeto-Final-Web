// src/pages/Resultpage.tsx

import { useLocation, Link } from 'react-router-dom';
import { History } from 'lucide-react';
import ResultsDisplay from "../components/ResultsDisplay";

export default function Resultpage() {
  const location = useLocation();

  // Agora também pegamos o 'searchTerm' do estado
  const { results, searchTerm } = location.state || { results: [], searchTerm: '' };

  // Verificação para caso o usuário acesse a página diretamente
  if (!results || results.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Nenhum resultado para exibir.</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Voltar para a página de busca
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* --- NOVO CABEÇALHO DA PÁGINA DE RESULTADOS --- */}
      <div className="max-w-full mx-auto mb-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Resultados para:</p>
          <h1 className="text-2xl font-bold text-gray-900">{searchTerm}</h1>
        </div>
        
        {/* Este é o link que conecta com a página de histórico */}
        <Link 
          to="/history"
          state={{ searchTerm: searchTerm }} // Passa o termo atual para o histórico
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          <History size={18} />
          Ver no Histórico
        </Link>
      </div>
      
      {/* O componente que já existia continua aqui, mostrando os resultados */}
      <ResultsDisplay 
        results={results}
        isLoading={false}
        error={null}
      />
    </div>
  );
}