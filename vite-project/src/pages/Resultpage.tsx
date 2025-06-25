import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

import ResultsDisplay from "../components/ResultsDisplay";
import SkeletonCard from '../components/SkeletonCard';
import { loadingMessages } from '../constants/index';

export default function Resultpage() {
  const location = useLocation();
  const { results, isLoading, error } = location.state || { results: [], isLoading: false, error: null };

  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  // Efeito para trocar a mensagem de carregamento a cada 2 segundos
  useEffect(() => {
    if (isLoading) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setCurrentMessage(loadingMessages[messageIndex]);
      }, 2500); // Muda a cada 2.5 segundos

      return () => clearInterval(interval); // Limpa o intervalo quando o componente desmontar
    }
  }, [isLoading]);

  // Se estiver carregando, mostramos a UI de carregamento
  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-center mb-8">
          <p className="text-xl font-semibold text-gray-700">{currentMessage}</p>
        </div>
        <div className="space-y-6">
          {/* Mostramos 3 esqueletos para dar a sensação de volume */}
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  // Se não estiver carregando, mostramos o ResultsDisplay
  return (
    <div className="p-8">
      <ResultsDisplay 
        results={results}
        isLoading={false}
        error={error}
      />
    </div>
  );
}