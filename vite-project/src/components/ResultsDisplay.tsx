import { useState } from 'react';

import CardContent from './CardContent';
import CardResult from "../components/CardResult";
import ToggleSwitch from '../components/ToggleSwitch';
import { iconMap } from '../constants/index';
import { formatContentForCopy } from '../utils/formatContentForCopy';
import { handleCopy } from '../utils/handleCopy';
import type  { Result } from '../types/result';

interface ResultsDisplayProps {
  results: Result[];
  isLoading: boolean;
  error: string | null;
}

export default function ResultsDisplay({ results, isLoading, error }: ResultsDisplayProps) {

  const [copiedId, setCopiedId] = useState<string | null>(null); // Estado para armazenar o ID do card copiado
  const [showAnswers, setShowAnswers] = useState(false); // Estado para controlar a exibição das respostas

  // LÓGICA PARA EXIBIR ESTADOS DE CARREGAMENTO E ERRO
  if (isLoading) {
    return <div className="text-center p-8">Carregando recursos...</div>;
  }
  if (error) {
    return <div className="text-center p-8 text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-end mb-6">
        <ToggleSwitch 
          label="Mostrar Respostas"
          enabled={showAnswers}
          onChange={setShowAnswers}
        />
      </div>

      <div className='space-y-6'>      
        
        {/* .map para interar sobre todos os elementos retornados */}
        {results.map((result) => (
          <CardResult 
            key={result.id}
            title={result.title}
            icon={iconMap[result.type]}
            onCopy={() => handleCopy(formatContentForCopy(result), result.id, setCopiedId)}
            isCopied={copiedId === result.id}
          >
            {/* Cards separados (definição, questoes, etc...) */}
            <CardContent result={result} showAnswers={showAnswers} />
          </CardResult>
        ))}
      </div>

    </div>
      
  );
} 

